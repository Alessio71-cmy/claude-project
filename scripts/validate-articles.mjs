#!/usr/bin/env node
/**
 * Valida gli articoli generati.
 *
 * Il controllo che conta è l'ultimo: ogni cifra pubblicata in `keyNumbers` deve
 * comparire nella voce di catalogo da cui l'articolo nasce. È il test
 * anti-allucinazione, ed è automatico proprio perché un numero inventato non
 * fa fallire niente — si limita a finire in un deck cliente.
 *
 * Uso:
 *   node scripts/validate-articles.mjs
 *   node scripts/validate-articles.mjs --fix   ricalcola wordCount e minuti
 */
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const articlesDir = join(root, 'content', 'articles')
const catalogDir = join(root, 'content', 'catalog')

const FIX = process.argv.includes('--fix')

const WORDS_PER_MINUTE = 190
const SECTIONS = [
  'In due righe',
  'Perché ti serve',
  'Il contesto',
  'Cosa hanno fatto',
  'Cosa è emerso',
  'Il meccanismo',
  'Come si applica nel digitale',
  'Limiti e cautele',
  'Da portarti dietro',
  'Fonte e approfondimenti',
]
const DEPTH_WORDS = {
  breve: [700, 950],
  standard: [1100, 1700],
  approfondito: [2300, 2800],
  dossier: [3400, 4200],
}

const errors = []
const warnings = []

function countWords(article) {
  return article.sections
    .flatMap((s) => s.paragraphs)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
}

/** Normalizza per il confronto: le cifre contano, la punteggiatura no. */
function normaliseForMatch(s) {
  return String(s)
    .toLowerCase()
    .replace(/[‘’“”]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s%.,;:()\-–—<>=/"]/g, '')
    .trim()
}

async function loadCatalog() {
  const byId = new Map()
  if (!existsSync(catalogDir)) return byId
  for (const f of await readdir(catalogDir)) {
    if (!f.endsWith('.json')) continue
    try {
      const raw = JSON.parse(await readFile(join(catalogDir, f), 'utf8'))
      const entries = Array.isArray(raw) ? raw : raw.entries || raw.candidates || []
      for (const e of entries) if (e.id) byId.set(e.id, e)
    } catch {
      /* il validatore del catalogo si occupa dei file illeggibili */
    }
  }
  return byId
}

async function main() {
  if (!existsSync(articlesDir)) {
    console.log('Nessuna cartella content/articles: niente da validare.')
    return
  }
  const files = (await readdir(articlesDir)).filter((f) => f.endsWith('.json'))
  if (files.length === 0) {
    console.log('Nessun articolo: niente da validare.')
    return
  }

  const catalog = await loadCatalog()
  let fixed = 0

  for (const file of files) {
    let a
    try {
      a = JSON.parse(await readFile(join(articlesDir, file), 'utf8'))
    } catch (e) {
      errors.push(`${file}: JSON non valido — ${e.message}`)
      continue
    }
    const id = a.id || file

    for (const campo of ['id', 'catalogId', 'titleIt', 'titleOriginal', 'sourceUrl', 'depth']) {
      if (!a[campo]) errors.push(`${id}: campo "${campo}" mancante`)
    }
    if (a.id && `${a.id}.json` !== file) {
      errors.push(`${id}: il nome del file non combacia con l'id`)
    }
    if (!a.preview?.hook) errors.push(`${id}: preview.hook mancante`)
    else if (a.preview.hook.length > 260) {
      warnings.push(`${id}: hook lungo (${a.preview.hook.length} caratteri, la card ne mostra ~200)`)
    }

    // Sezioni: presenti tutte, nell'ordine, senza paragrafi vuoti.
    if (!Array.isArray(a.sections)) {
      errors.push(`${id}: sections non è un array`)
      continue
    }
    const headings = a.sections.map((s) => s.heading)
    if (headings.length !== SECTIONS.length || headings.some((h, i) => h !== SECTIONS[i])) {
      errors.push(
        `${id}: sezioni fuori ordine o incomplete.\n      attese: ${SECTIONS.join(' | ')}\n      trovate: ${headings.join(' | ')}`,
      )
    }
    for (const s of a.sections) {
      if (!Array.isArray(s.paragraphs) || s.paragraphs.length === 0) {
        errors.push(`${id}: sezione "${s.heading}" senza paragrafi`)
      } else if (s.paragraphs.some((p) => typeof p !== 'string' || p.trim().length < 20)) {
        warnings.push(`${id}: sezione "${s.heading}" ha un paragrafo molto corto`)
      }
    }

    // Conteggio parole: ricalcolato, non creduto.
    const words = countWords(a)
    const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
    if (a.wordCount !== words || a.readingMinutes !== minutes) {
      if (FIX) {
        a.wordCount = words
        a.readingMinutes = minutes
        await writeFile(join(articlesDir, file), `${JSON.stringify(a, null, 2)}\n`, 'utf8')
        fixed += 1
      } else {
        errors.push(
          `${id}: wordCount/readingMinutes non corrispondono al testo (dichiarati ${a.wordCount}/${a.readingMinutes}, reali ${words}/${minutes}). Esegui --fix.`,
        )
      }
    }

    const range = DEPTH_WORDS[a.depth]
    if (!range) errors.push(`${id}: depth non valida (${a.depth})`)
    else if (words < range[0] * 0.9 || words > range[1] * 1.1) {
      warnings.push(
        `${id}: ${words} parole, fuori dal range di "${a.depth}" (${range[0]}-${range[1]})`,
      )
    }

    // ── Il test anti-allucinazione ──
    const entry = catalog.get(a.catalogId)
    if (!entry) {
      errors.push(`${id}: catalogId "${a.catalogId}" non esiste nel catalogo`)
    } else {
      const fonte = normaliseForMatch(
        [
          ...(entry.keyFindings || []).flatMap((k) => [k.claim, k.value]),
          entry.abstract || '',
          entry.notes || '',
        ].join(' | '),
      )
      for (const n of a.keyNumbers || []) {
        if (!fonte.includes(normaliseForMatch(n.value))) {
          errors.push(
            `${id}: la cifra «${n.value}» non compare nella voce di catalogo.\n      Nessun numero può essere pubblicato se non è in keyFindings, abstract o notes.`,
          )
        }
      }
      if (a.citable && entry.citationConfidence !== 'primaria') {
        errors.push(
          `${id}: citable=true ma la fonte è "${entry.citationConfidence}". Il badge promette numeri da presentazione.`,
        )
      }
      if (a.depth !== entry.depth) {
        warnings.push(`${id}: depth "${a.depth}" diversa da quella del catalogo "${entry.depth}"`)
      }
    }
  }

  console.log(`Articoli: ${files.length}`)
  if (fixed) console.log(`  ricalcolati: ${fixed}`)

  if (warnings.length) {
    console.log(`\nAvvisi (${warnings.length}):`)
    for (const w of warnings) console.log(`  ~ ${w}`)
  }
  if (errors.length) {
    console.error(`\nErrori (${errors.length}):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    process.exit(1)
  }
  console.log('\n✓ Articoli validi.')
}

main().catch((e) => {
  console.error('Validazione interrotta:', e)
  process.exit(1)
})
