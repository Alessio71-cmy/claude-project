import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Article, CatalogEntry, Queue } from './schema'

/**
 * Caricamento dei contenuti dal filesystem, a build time.
 *
 * Con `output: 'export'` questo codice gira una volta sola durante la build e
 * finisce nel bundle statico: nessuna lettura di file a runtime, nessun
 * backend. È il motivo per cui l'app funziona offline.
 */

const contentDir = join(process.cwd(), 'content')

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T
  } catch {
    return fallback
  }
}

let articlesCache: Article[] | null = null

export function getArticles(): Article[] {
  if (articlesCache) return articlesCache
  const dir = join(contentDir, 'articles')
  if (!existsSync(dir)) return (articlesCache = [])
  articlesCache = readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => readJson<Article | null>(join(dir, f), null))
    .filter((a): a is Article => a !== null)
  return articlesCache
}

export function getArticle(id: string): Article | undefined {
  return getArticles().find((a) => a.id === id)
}

export function getQueue(): Queue {
  const q = readJson<Queue>(join(contentDir, 'queue.json'), { generatedAt: '', items: [] })
  // Se la coda è vuota ma ci sono articoli, si costruisce dagli articoli: così
  // un errore nel generatore non produce un'app vuota.
  if (q.items.length === 0) {
    const items = getArticles().map((a) => ({
      id: a.id,
      readingMinutes: a.readingMinutes,
      depth: a.depth,
      relevance: a.relevance,
      topics: a.topics,
    }))
    return { generatedAt: q.generatedAt, items }
  }
  return q
}

export function getCatalog(): CatalogEntry[] {
  const dir = join(contentDir, 'catalog')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .flatMap((f) => readJson<CatalogEntry[]>(join(dir, f), []))
}

export function getCatalogEntry(id: string): CatalogEntry | undefined {
  return getCatalog().find((e) => e.id === id)
}

/**
 * La forma leggera che serve alle liste: senza i paragrafi, che sono il 95%
 * del peso. Le tre schermate a elenco caricano solo questo.
 */
export interface ArticleSummary {
  id: string
  titleIt: string
  hook: string
  readingMinutes: number
  relevance: Article['relevance']
  topics: Article['topics']
  type: Article['type']
  year: number
  citable: boolean
  depth: Article['depth']
}

export function toSummary(a: Article): ArticleSummary {
  return {
    id: a.id,
    titleIt: a.titleIt,
    hook: a.preview.hook,
    readingMinutes: a.readingMinutes,
    relevance: a.relevance,
    topics: a.topics,
    type: a.type,
    year: a.year,
    citable: a.citable,
    depth: a.depth,
  }
}

export function getSummaries(): ArticleSummary[] {
  return getArticles().map(toSummary)
}
