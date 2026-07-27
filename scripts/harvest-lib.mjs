/**
 * La parte pura del raccolto: normalizzazione, generazione degli id e i mapper
 * che traducono le risposte di OpenAlex, Crossref e arXiv nella forma del
 * nostro catalogo.
 *
 * Sta in un file a parte perché è la logica che può sbagliare in silenzio —
 * un abstract ricostruito male o un DOI normalizzato male non fa fallire
 * niente, produce solo dati scadenti. Qui è testabile senza rete.
 */

export function normaliseTitle(t) {
  return (t || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function normaliseDoi(doi) {
  if (!doi) return null
  const clean = String(doi)
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
    .toLowerCase()
    .trim()
  return clean || null
}

export function slugify(s, maxWords = 5) {
  return normaliseTitle(s).split(' ').filter(Boolean).slice(0, maxWords).join('-')
}

export function makeId(authors, year, title) {
  const first = authors?.[0] || ''
  // "Johnson, Eric" → "johnson"; "Eric Johnson" → "johnson"
  const family = first.includes(',') ? first.split(',')[0] : first.split(' ').pop() || ''
  const base = `${slugify(family, 1) || 'anon'}-${year || 'sd'}-${slugify(title, 4)}`
  return base.replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export function mapType(raw) {
  const t = (raw || '').toLowerCase()
  if (t.includes('book-chapter') || t.includes('book-part')) return 'libro'
  if (t.includes('book') || t.includes('monograph')) return 'libro'
  if (t.includes('proceedings') || t.includes('conference')) return 'paper'
  if (t.includes('report')) return 'report'
  if (t.includes('preprint') || t.includes('posted-content')) return 'paper'
  if (t.includes('journal-article') || t.includes('article')) return 'studio'
  return 'paper'
}

/** Ripulisce un abstract JATS/HTML lasciando testo leggibile. */
export function cleanAbstract(raw) {
  if (!raw) return undefined
  const text = String(raw)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .replace(/^\s*(abstract|summary)[:.\s]*/i, '')
    .trim()
  return text.length > 40 ? text.slice(0, 2400) : undefined
}

/**
 * OpenAlex non dà l'abstract come testo ma come indice invertito
 * ({parola: [posizioni]}). Ricostruirlo è ciò che rende disponibili i numeri
 * di fonte primaria — gli effect size stanno quasi sempre nell'abstract.
 */
export function abstractFromInvertedIndex(index) {
  if (!index || typeof index !== 'object') return undefined
  const slots = []
  for (const [word, positions] of Object.entries(index)) {
    if (!Array.isArray(positions)) continue
    for (const p of positions) {
      if (Number.isInteger(p) && p >= 0) slots[p] = word
    }
  }
  // I buchi (posizioni mai assegnate) vanno scartati, non resi come "undefined".
  const text = slots.filter((w) => typeof w === 'string').join(' ')
  return cleanAbstract(text)
}

/* ── Mapper ───────────────────────────────────────────────────────────── */

export function mapOpenAlexWork(w, cluster) {
  const authors = (w.authorships || [])
    .map((a) => a?.author?.display_name)
    .filter(Boolean)
    .slice(0, 8)
  const doi = normaliseDoi(w.doi)
  const landing = w.primary_location?.landing_page_url
  const sourceUrl = w.open_access?.oa_url || landing || (doi ? `https://doi.org/${doi}` : null)
  if (!sourceUrl || !w.display_name || !w.publication_year) return null

  return {
    id: makeId(authors, w.publication_year, w.display_name),
    titleOriginal: w.display_name,
    authors,
    year: w.publication_year,
    type: mapType(w.type),
    venue: w.primary_location?.source?.display_name,
    sourceUrl,
    doi: doi || undefined,
    openAccess: Boolean(w.open_access?.is_oa),
    citedBy: w.cited_by_count ?? 0,
    abstract: abstractFromInvertedIndex(w.abstract_inverted_index),
    topics: [cluster],
    harvestedFrom: 'openalex',
  }
}

export function mapCrossrefItem(it, cluster, minCitations = 0) {
  const title = it.title?.[0]
  const year = it.issued?.['date-parts']?.[0]?.[0]
  const cited = it['is-referenced-by-count'] ?? 0
  if (!title || !year) return null
  // Crossref non filtra per citazioni lato server: il taglio si fa qui.
  if (cited < minCitations) return null

  const authors = (it.author || [])
    .map((a) => [a.family, a.given].filter(Boolean).join(', '))
    .filter(Boolean)
    .slice(0, 8)
  const doi = normaliseDoi(it.DOI)
  const sourceUrl = it.URL || (doi ? `https://doi.org/${doi}` : null)
  if (!sourceUrl) return null

  return {
    id: makeId(authors, year, title),
    titleOriginal: title,
    authors,
    year,
    type: mapType(it.type),
    venue: it['container-title']?.[0],
    sourceUrl,
    doi: doi || undefined,
    openAccess: false,
    citedBy: cited,
    abstract: cleanAbstract(it.abstract),
    topics: [cluster],
    harvestedFrom: 'crossref',
  }
}

/**
 * arXiv restituisce Atom. Lo parso a mano: è un feed controllato con una forma
 * stabile, non HTML arbitrario, e non vale una dipendenza XML.
 */
export function parseArxivEntries(xml, cluster) {
  return (xml || '')
    .split('<entry>')
    .slice(1)
    .map((raw) => {
      const pick = (tag) => {
        const m = raw.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
        return m ? m[1].replace(/\s+/g, ' ').trim() : null
      }
      const title = pick('title')
      const published = pick('published')
      const idUrl = pick('id')
      if (!title || !published || !idUrl) return null

      const authors = [...raw.matchAll(/<name>([\s\S]*?)<\/name>/g)]
        .map((m) => m[1].trim())
        .filter(Boolean)
        .slice(0, 8)
      const year = Number.parseInt(published.slice(0, 4), 10)
      if (!Number.isInteger(year)) return null
      const doi = normaliseDoi(raw.match(/<arxiv:doi[^>]*>([\s\S]*?)<\/arxiv:doi>/)?.[1])

      return {
        id: makeId(authors, year, title),
        titleOriginal: title,
        authors,
        year,
        type: 'paper',
        venue: 'arXiv cs.HC',
        sourceUrl: idUrl,
        doi: doi || undefined,
        openAccess: true,
        citedBy: 0,
        abstract: cleanAbstract(pick('summary')),
        topics: [cluster],
        harvestedFrom: 'arxiv',
      }
    })
    .filter(Boolean)
}

/**
 * Deduplica una lista di candidate contro quanto già noto, assegnando id
 * univoci. Muta i set `seen` di proposito: il chiamante li accumula fra query.
 */
export function dedupe(candidates, seen) {
  const kept = []
  let duplicates = 0

  for (const c of candidates) {
    const dKey = c.doi ? normaliseDoi(c.doi) : null
    const tKey = normaliseTitle(c.titleOriginal)
    if ((dKey && seen.doi.has(dKey)) || seen.title.has(tKey)) {
      duplicates += 1
      continue
    }
    if (dKey) seen.doi.add(dKey)
    seen.title.add(tKey)

    let id = c.id || 'voce'
    let n = 2
    while (seen.ids.has(id)) id = `${c.id}-${n++}`
    seen.ids.add(id)

    kept.push({ ...c, id })
  }

  return { kept, duplicates }
}
