/**
 * I tipi condivisi fra app, generatore e script di validazione.
 * Questo file è la fonte unica della forma dei dati: se cambia qui, cambiano
 * la UI, la skill di scrittura e i validatori.
 */

/** I 13 cluster tematici. L'ordine è quello dell'indice, non alfabetico. */
export const CLUSTERS = [
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
] as const

export type Cluster = (typeof CLUSTERS)[number]

/** Etichette leggibili per la UI. */
export const CLUSTER_LABELS: Record<Cluster, string> = {
  'persuasione-compliance': 'Persuasione',
  'bias-euristiche': 'Bias cognitivi',
  'attenzione-economia-attenzione': 'Attenzione',
  'abitudini-retention': 'Abitudini',
  'onboarding-attivazione': 'Onboarding',
  'pricing-paywall': 'Pricing',
  'dark-pattern-etica': 'Dark pattern',
  'choice-architecture-nudge': 'Choice architecture',
  'emozione-fiducia': 'Emozione e fiducia',
  'metodo-ricerca': 'Metodo',
  'case-study-prodotto': 'Case study',
  'accessibilita-cognitiva': 'Carico cognitivo',
  'classici-fondativi': 'Classici',
}

/** Profondità: determina il range di parole richiesto al generatore. */
export const DEPTHS = ['breve', 'standard', 'approfondito', 'dossier'] as const
export type Depth = (typeof DEPTHS)[number]

/**
 * Il range di parole per profondità. Il generatore riceve questi numeri;
 * `readingMinutes` viene poi calcolato dal conteggio reale, non da qui.
 */
export const DEPTH_WORDS: Record<Depth, { min: number; max: number }> = {
  breve: { min: 700, max: 950 },
  standard: { min: 1400, max: 1700 },
  approfondito: { min: 2300, max: 2800 },
  dossier: { min: 3400, max: 4200 },
}

/** Rilevanza per il lavoro: esattamente una per articolo. */
export const RELEVANCES = ['applicabile-subito', 'fondamentale', 'contesto'] as const
export type Relevance = (typeof RELEVANCES)[number]

export const RELEVANCE_LABELS: Record<Relevance, string> = {
  'applicabile-subito': 'Applicabile subito',
  fondamentale: 'Fondamentale',
  contesto: 'Contesto',
}

export const SOURCE_TYPES = [
  'studio',
  'paper',
  'libro',
  'case-study',
  'articolo',
  'report',
] as const
export type SourceType = (typeof SOURCE_TYPES)[number]

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  studio: 'Studio',
  paper: 'Paper',
  libro: 'Libro',
  'case-study': 'Case study',
  articolo: 'Articolo',
  report: 'Report',
}

/** Da dove vengono i numeri citati. Guida il badge "citabile". */
export const CONFIDENCES = ['primaria', 'secondaria', 'da-verificare'] as const
export type Confidence = (typeof CONFIDENCES)[number]

/**
 * Un risultato numerico verificato. È il presidio anti-allucinazione: il
 * generatore non può citare cifre che non compaiano qui o nel testo della
 * fonte effettivamente recuperato.
 */
export interface KeyFinding {
  claim: string
  value: string
  verified: Confidence
}

/** Una voce di catalogo: la fonte, con i suoi metadati verificati. */
export interface CatalogEntry {
  id: string
  titleOriginal: string
  authors: string[]
  year: number
  type: SourceType
  venue?: string
  sourceUrl: string
  doi?: string
  openAccess: boolean
  /** Conteggio citazioni al momento del raccolto: è il filtro "influente". */
  citedBy?: number
  /** Abstract della fonte, quando disponibile: testo di fonte primaria. */
  abstract?: string
  topics: Cluster[]
  relevance: Relevance
  depth: Depth
  keyFindings: KeyFinding[]
  citationConfidence: Confidence
  notes?: string
  /** Da dove arriva la voce: utile per capire la qualità di una fonte. */
  harvestedFrom?: 'crossref' | 'openalex' | 'arxiv' | 'curato'
}

/** Una sezione dell'articolo. L'ordine delle sezioni è fisso (vedi SECTIONS). */
export interface ArticleSection {
  heading: string
  paragraphs: string[]
}

/**
 * Le 10 sezioni, nell'ordine. Struttura sempre uguale = lettura prevedibile
 * e UI coerente. Il generatore deve produrle tutte, in quest'ordine.
 */
export const SECTIONS = [
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
] as const

export interface Article {
  id: string
  /** L'id della voce di catalogo da cui nasce. */
  catalogId: string
  titleIt: string
  titleOriginal: string
  authors: string[]
  year: number
  type: SourceType
  venue?: string
  sourceUrl: string
  doi?: string
  topics: Cluster[]
  relevance: Relevance
  depth: Depth
  /** Vero quando i numeri vengono da fonte primaria: badge "citabile". */
  citable: boolean
  preview: {
    /** Due righe che invitano a entrare, non un riassunto. */
    hook: string
  }
  sections: ArticleSection[]
  /** Le cifre citate nel testo, per il test anti-allucinazione. */
  keyNumbers: { label: string; value: string }[]
  wordCount: number
  readingMinutes: number
  related: string[]
  generatedAt: string
  model: string
}

/**
 * La forma minima che serve alla selezione del giorno. La coda contiene
 * questi, non gli articoli interi: così il client decide cosa mostrare senza
 * caricare megabyte di prosa.
 */
export interface QueueItem {
  id: string
  readingMinutes: number
  depth: Depth
  relevance: Relevance
  topics: Cluster[]
}

export interface Queue {
  generatedAt: string
  items: QueueItem[]
}
