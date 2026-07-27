#!/usr/bin/env node
/**
 * Raccolto delle fonti da Crossref, OpenAlex e arXiv.
 *
 * È il pezzo su cui poggia la sostenibilità dell'app: le fonti non le cerca un
 * modello, le pesca questo script dalle API bibliografiche aperte. Costo zero,
 * nessuna chiave, e — soprattutto — nessun URL o DOI inventato, perché i
 * metadati arrivano dalla fonte canonica.
 *
 * Uso:
 *   node scripts/harvest-catalog.mjs                 raccolto completo
 *   node scripts/harvest-catalog.mjs --dry-run       non scrive niente
 *   node scripts/harvest-catalog.mjs --limit 5       solo le prime 5 query
 *   node scripts/harvest-catalog.mjs --cluster bias-euristiche
 *
 * Nota sulla rete: gli ambienti Claude Code hanno una policy che può bloccare
 * api.openalex.org e api.crossref.org. Questo script è pensato per girare nei
 * runner GitHub Actions, che hanno egress libero.
 */
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  dedupe,
  mapCrossrefItem,
  mapOpenAlexWork,
  normaliseDoi,
  normaliseTitle,
  parseArxivEntries,
} from './harvest-lib.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const catalogDir = join(root, 'content', 'catalog')
const pendingPath = join(catalogDir, '_pending.json')

/** Il polite pool di Crossref e OpenAlex chiede solo un contatto. */
const CONTACT = process.env.HARVEST_CONTACT || 'alessioruggera2@gmail.com'
const UA = `lettura-quotidiana/1.0 (+https://github.com/Alessio71-cmy/claude-project; mailto:${CONTACT})`

/** I 13 cluster ammessi. Un typo in queries.json deve fermare la corsa, non
 *  entrare silenziosamente nel catalogo come cluster fantasma. */
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

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const LIMIT = intArg('--limit')
const ONLY_CLUSTER = strArg('--cluster')
const PER_QUERY = intArg('--per-query') ?? 25

function intArg(flag) {
  const i = args.indexOf(flag)
  return i >= 0 && args[i + 1] ? Number.parseInt(args[i + 1], 10) : null
}
function strArg(flag) {
  const i = args.indexOf(flag)
  return i >= 0 && args[i + 1] ? args[i + 1] : null
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchWith(url, parse) {
  const retries = 2
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(30_000),
      })
      if (res.status === 429 || res.status >= 500) {
        // Backoff: siamo ospiti di un servizio gratuito, non insistiamo.
        await sleep(2000 * (attempt + 1))
        continue
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await parse(res)
    } catch (err) {
      if (attempt === retries) throw err
      await sleep(1500 * (attempt + 1))
    }
  }
  throw new Error('irraggiungibile dopo i tentativi')
}

const fetchJson = (url) => fetchWith(url, (r) => r.json())
const fetchText = (url) => fetchWith(url, (r) => r.text())

/* ── Sorgenti ─────────────────────────────────────────────────────────── */

async function fromOpenAlex({ query, minCitations, since, cluster }) {
  const filters = [`title_and_abstract.search:${query}`]
  if (minCitations > 0) filters.push(`cited_by_count:>${minCitations}`)
  if (since) filters.push(`from_publication_date:${since}-01-01`)

  const url =
    `https://api.openalex.org/works?filter=${encodeURIComponent(filters.join(','))}` +
    `&sort=cited_by_count:desc&per-page=${PER_QUERY}` +
    `&select=id,doi,display_name,publication_year,cited_by_count,authorships,open_access,primary_location,type,abstract_inverted_index` +
    `&mailto=${encodeURIComponent(CONTACT)}`

  const data = await fetchJson(url)
  return (data.results || []).map((w) => mapOpenAlexWork(w, cluster)).filter(Boolean)
}

async function fromCrossref({ query, minCitations, since, cluster }) {
  const params = new URLSearchParams({
    'query.bibliographic': query,
    rows: String(PER_QUERY),
    sort: 'is-referenced-by-count',
    order: 'desc',
    select: 'DOI,title,author,issued,is-referenced-by-count,URL,abstract,container-title,type',
    mailto: CONTACT,
  })
  if (since) params.set('filter', `from-pub-date:${since}-01-01`)

  const data = await fetchJson(`https://api.crossref.org/works?${params}`)
  return (data.message?.items || [])
    .map((it) => mapCrossrefItem(it, cluster, minCitations))
    .filter(Boolean)
}

/**
 * arXiv non espone citazioni: serve per la novità in cs.HC, dove i lavori su
 * dark pattern e ACDP compaiono mesi prima che qualcuno li citi.
 */
async function fromArxiv({ query, cluster }) {
  const params = new URLSearchParams({
    search_query: `cat:cs.HC AND all:"${query}"`,
    sortBy: 'submittedDate',
    sortOrder: 'descending',
    max_results: String(Math.min(PER_QUERY, 20)),
  })
  const xml = await fetchText(`https://export.arxiv.org/api/query?${params}`)
  return parseArxivEntries(xml, cluster)
}

const SOURCES = { openalex: fromOpenAlex, crossref: fromCrossref, arxiv: fromArxiv }

/* ── Corsa ────────────────────────────────────────────────────────────── */

async function loadExisting() {
  const seen = { doi: new Set(), title: new Set(), ids: new Set() }
  if (!existsSync(catalogDir)) return seen

  for (const f of await readdir(catalogDir)) {
    if (!f.endsWith('.json')) continue
    try {
      const raw = JSON.parse(await readFile(join(catalogDir, f), 'utf8'))
      const entries = Array.isArray(raw) ? raw : raw.entries || raw.candidates || []
      for (const e of entries) {
        if (e.doi) seen.doi.add(normaliseDoi(e.doi))
        if (e.titleOriginal) seen.title.add(normaliseTitle(e.titleOriginal))
        if (e.id) seen.ids.add(e.id)
      }
    } catch {
      console.warn(`  ! ${f} non è JSON leggibile, ignorato`)
    }
  }
  return seen
}

async function main() {
  const config = JSON.parse(await readFile(join(root, 'scripts', 'queries.json'), 'utf8'))
  let queries = config.queries

  const bad = queries.filter((q) => !CLUSTERS.has(q.cluster))
  if (bad.length) {
    console.error('Cluster non riconosciuti in queries.json:')
    for (const q of bad) console.error(`  - "${q.cluster}" (query: ${q.query})`)
    process.exit(1)
  }

  if (ONLY_CLUSTER) queries = queries.filter((q) => q.cluster === ONLY_CLUSTER)
  if (LIMIT) queries = queries.slice(0, LIMIT)

  console.log(`Raccolto su ${queries.length} query — contatto: ${CONTACT}`)
  if (DRY_RUN) console.log('(dry run: non scrivo niente)\n')

  const seen = await loadExisting()
  console.log(
    `Catalogo esistente: ${seen.ids.size} voci, ${seen.doi.size} DOI, ${seen.title.size} titoli\n`,
  )

  const candidates = []
  const failures = []
  let attempts = 0
  let duplicates = 0

  for (const q of queries) {
    for (const source of q.sources || ['openalex']) {
      const fn = SOURCES[source]
      attempts += 1
      if (!fn) {
        failures.push({ query: q.query, source, error: 'sorgente sconosciuta' })
        continue
      }
      try {
        const found = await fn({ minCitations: 0, ...q })
        const { kept, duplicates: dup } = dedupe(found, seen)
        duplicates += dup
        for (const c of kept) {
          candidates.push({ ...c, harvestedAt: new Date().toISOString().slice(0, 10) })
        }
        console.log(`  ✓ ${source.padEnd(9)} ${q.cluster.padEnd(34)} +${kept.length}`)
      } catch (err) {
        failures.push({ query: q.query, source, error: String(err.message || err) })
        console.log(`  ✗ ${source.padEnd(9)} ${q.cluster.padEnd(34)} ${err.message || err}`)
      }
      await sleep(400) // cortesia verso servizi gratuiti
    }
  }

  const withAbstract = candidates.filter((c) => c.abstract).length
  console.log('\n── Riepilogo ──')
  console.log(`  candidate nuove   : ${candidates.length}`)
  console.log(`  con abstract      : ${withAbstract} (${pct(withAbstract, candidates.length)})`)
  console.log(`  con DOI           : ${candidates.filter((c) => c.doi).length}`)
  console.log(`  duplicate scartate: ${duplicates}`)
  console.log(`  richieste fallite : ${failures.length}/${attempts}`)
  for (const f of failures) console.log(`    - ${f.source} "${f.query}": ${f.error}`)

  // Tutto fallito è un guasto, non un raccolto magro: il workflow deve
  // diventare rosso invece di committare il nulla e sembrare riuscito.
  if (attempts > 0 && failures.length === attempts) {
    console.error('\nTutte le richieste sono fallite: rete o API inaccessibili.')
    process.exit(1)
  }

  if (DRY_RUN) {
    console.log('\nEsempio di candidata:')
    console.log(JSON.stringify(candidates[0] ?? null, null, 2).slice(0, 1400))
    return
  }

  if (candidates.length === 0) {
    console.log('\nNiente di nuovo da scrivere.')
    return
  }

  await mkdir(catalogDir, { recursive: true })
  let pending = []
  if (existsSync(pendingPath)) {
    try {
      const raw = JSON.parse(await readFile(pendingPath, 'utf8'))
      pending = Array.isArray(raw) ? raw : raw.candidates || []
    } catch {
      console.warn('_pending.json illeggibile, lo ricreo')
    }
  }

  const merged = [...pending, ...candidates]
  await writeFile(pendingPath, `${JSON.stringify(merged, null, 2)}\n`, 'utf8')
  console.log(`\n✓ content/catalog/_pending.json — ${merged.length} candidate in attesa`)
}

function pct(n, tot) {
  return tot === 0 ? '0%' : `${Math.round((n / tot) * 100)}%`
}

main().catch((err) => {
  console.error('\nRaccolto interrotto:', err)
  process.exit(1)
})
