#!/usr/bin/env node
/**
 * Valida il catalogo.
 *
 * Due schemi diversi nella stessa cartella:
 *   _pending.json  candidate appena raccolte — hanno i metadati ma non ancora
 *                  il giudizio (rilevanza, profondità, keyFindings)
 *   *.json         voci promosse — devono essere complete
 *
 * Il controllo degli URL è dietro `--check-links` perché richiede rete: la
 * validazione di struttura deve poter girare in CI e in locale senza uscire.
 *
 * Uso:
 *   node scripts/validate-catalog.mjs
 *   node scripts/validate-catalog.mjs --check-links   verifica gli URL
 *   node scripts/validate-catalog.mjs --fix-verified  scrive linkVerified
 */
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const catalogDir = join(root, 'content', 'catalog')

const args = process.argv.slice(2)
const CHECK_LINKS = args.includes('--check-links')
const FIX_VERIFIED = args.includes('--fix-verified')

const CLUSTERS = new Set([
  'persuasione-compliance',
  'bias-euristiche',
  'attenzione-economia-attenzione',
  'abitudini-retention',
  'onboarding-attivazione',
  'pricing-paywall',
  'dark-pattern-etica',
  'choice-architecture-nudge',
  'emozione-fiducia',
  'metodo-ricerca',
  'case-study-prodotto',
  'accessibilita-cognitiva',
  'classici-fondativi',
])
const TYPES = new Set(['studio', 'paper', 'libro', 'case-study', 'articolo', 'report'])
const RELEVANCES = new Set(['applicabile-subito', 'fondamentale', 'contesto'])
const DEPTHS = new Set(['breve', 'standard', 'approfondito', 'dossier'])
const CONFIDENCES = new Set(['primaria', 'secondaria', 'da-verificare'])

const errors = []
const warnings = []

function err(file, id, msg) {
  errors.push(`${file} → ${id}: ${msg}`)
}
function warn(file, id, msg) {
  warnings.push(`${file} → ${id}: ${msg}`)
}

/** I campi che servono a chiunque, candidata o promossa. */
function checkCommon(e, file) {
  const id = e.id || '(senza id)'
  if (!e.id || typeof e.id !== 'string') err(file, id, 'id mancante o non stringa')
  if (!e.titleOriginal) err(file, id, 'titleOriginal mancante')
  if (!Array.isArray(e.authors) || e.authors.length === 0) err(file, id, 'authors vuoto')
  if (!Number.isInteger(e.year)) err(file, id, `year non è un intero (${e.year})`)
  else if (e.year < 1850 || e.year > new Date().getFullYear() + 1)
    warn(file, id, `year sospetto: ${e.year}`)
  if (!TYPES.has(e.type)) err(file, id, `type non valido: ${e.type}`)
  if (!e.sourceUrl || !/^https?:\/\//.test(e.sourceUrl))
    err(file, id, `sourceUrl assente o non http(s): ${e.sourceUrl}`)
  if (!Array.isArray(e.topics) || e.topics.length === 0) err(file, id, 'topics vuoto')
  else
    for (const t of e.topics) {
      if (!CLUSTERS.has(t)) err(file, id, `cluster inesistente: ${t}`)
    }
  if (e.doi && !/^10\.\d{4,9}\//.test(e.doi)) warn(file, id, `doi di forma inattesa: ${e.doi}`)
}

/** Quello che serve in più a una voce promossa, pronta per generare l'articolo. */
function checkPromoted(e, file) {
  const id = e.id || '(senza id)'
  if (!RELEVANCES.has(e.relevance)) err(file, id, `relevance non valida: ${e.relevance}`)
  if (!DEPTHS.has(e.depth)) err(file, id, `depth non valida: ${e.depth}`)
  if (!CONFIDENCES.has(e.citationConfidence))
    err(file, id, `citationConfidence non valida: ${e.citationConfidence}`)

  if (!Array.isArray(e.keyFindings) || e.keyFindings.length === 0) {
    err(file, id, 'keyFindings vuoto — senza numeri verificati il generatore non ha appigli')
    return
  }
  for (const [i, k] of e.keyFindings.entries()) {
    if (!k || typeof k !== 'object') {
      err(file, id, `keyFindings[${i}] non è un oggetto`)
      continue
    }
    if (!k.claim) err(file, id, `keyFindings[${i}].claim mancante`)
    if (!k.value) err(file, id, `keyFindings[${i}].value mancante`)
    if (!CONFIDENCES.has(k.verified))
      err(file, id, `keyFindings[${i}].verified non valido: ${k.verified}`)
  }

  // Una voce curata a mano senza fallback è un link rotto in attesa di
  // accadere: chi l'ha scritta non ha potuto verificare l'URL.
  if (e.harvestedFrom === 'curato' && !e.fallbackUrl)
    warn(file, id, 'voce curata senza fallbackUrl')
}

async function checkUrl(url) {
  try {
    // HEAD prima: molti editori rispondono 405, allora si riprova con GET.
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
    })
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(20_000),
      })
    }
    return { ok: res.ok, status: res.status }
  } catch (e) {
    return { ok: false, status: String(e.message || e) }
  }
}

async function main() {
  if (!existsSync(catalogDir)) {
    console.log('Nessuna cartella content/catalog: niente da validare.')
    return
  }

  const files = (await readdir(catalogDir)).filter((f) => f.endsWith('.json'))
  if (files.length === 0) {
    console.log('Catalogo vuoto: niente da validare.')
    return
  }

  const ids = new Map()
  const dois = new Map()
  const all = []

  for (const file of files) {
    const isPending = file.startsWith('_pending')
    let parsed
    try {
      parsed = JSON.parse(await readFile(join(catalogDir, file), 'utf8'))
    } catch (e) {
      errors.push(`${file}: JSON non valido — ${e.message}`)
      continue
    }
    const entries = Array.isArray(parsed) ? parsed : parsed.entries || parsed.candidates || []
    if (!Array.isArray(entries)) {
      errors.push(`${file}: non contiene un array di voci`)
      continue
    }

    for (const e of entries) {
      checkCommon(e, file)
      if (!isPending) checkPromoted(e, file)

      if (e.id) {
        if (ids.has(e.id)) err(file, e.id, `id duplicato (già in ${ids.get(e.id)})`)
        else ids.set(e.id, file)
      }
      if (e.doi) {
        const d = e.doi.toLowerCase()
        if (dois.has(d)) warn(file, e.id, `stesso DOI di ${dois.get(d)}`)
        else dois.set(d, e.id)
      }
      all.push({ file, entry: e, isPending })
    }

    console.log(`  ${file.padEnd(24)} ${entries.length} voci${isPending ? ' (candidate)' : ''}`)
  }

  console.log(`\nTotale: ${all.length} voci, ${ids.size} id univoci, ${dois.size} DOI\n`)

  if (CHECK_LINKS) {
    console.log('Controllo degli URL (richiede rete)…')
    let ok = 0
    let ko = 0
    for (const { entry } of all) {
      const res = await checkUrl(entry.sourceUrl)
      if (res.ok) {
        ok += 1
        if (FIX_VERIFIED) entry.linkVerified = true
      } else {
        ko += 1
        const alt = entry.fallbackUrl ? ` (fallback: ${entry.fallbackUrl})` : ' (senza fallback!)'
        warn('link', entry.id, `sourceUrl risponde ${res.status}${alt}`)
        if (FIX_VERIFIED) entry.linkVerified = false
      }
      await new Promise((r) => setTimeout(r, 150))
    }
    console.log(`  raggiungibili: ${ok}   irraggiungibili: ${ko}\n`)

    if (FIX_VERIFIED) {
      const byFile = new Map()
      for (const { file, entry } of all) {
        if (!byFile.has(file)) byFile.set(file, [])
        byFile.get(file).push(entry)
      }
      for (const [file, entries] of byFile) {
        await writeFile(join(catalogDir, file), `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
      }
      console.log('  linkVerified aggiornato nei file.\n')
    }
  }

  if (warnings.length) {
    console.log(`Avvisi (${warnings.length}):`)
    for (const w of warnings) console.log(`  ~ ${w}`)
    console.log()
  }

  if (errors.length) {
    console.error(`Errori (${errors.length}):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    process.exit(1)
  }

  console.log('✓ Catalogo valido.')
}

main().catch((e) => {
  console.error('Validazione interrotta:', e)
  process.exit(1)
})
