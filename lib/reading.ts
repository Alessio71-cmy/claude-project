import type { QueueItem } from './schema'

/**
 * Velocità di lettura per prosa tecnica italiana su telefono.
 * Più bassa dei 220-250 wpm che si citano per la narrativa: qui si legge un
 * paper spiegato, con numeri e termini da metabolizzare.
 */
export const WORDS_PER_MINUTE = 190

/** L'ora in cui il numero del giorno diventa visibile. */
export const REVEAL_HOUR = 7

export function readingMinutes(words: number): number {
  if (words <= 0) return 0
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

/* ── Ritmo di lettura ──────────────────────────────────────────────────── */

export const PACES = {
  leggero: { budget: 15, label: 'Leggero' },
  normale: { budget: 30, label: 'Normale' },
  intenso: { budget: 45, label: 'Intenso' },
} as const

export type PaceKey = keyof typeof PACES
export const DEFAULT_PACE: PaceKey = 'normale'

/** Massimo di articoli in un giorno, qualunque sia il budget. */
export const MAX_ITEMS_PER_DAY = 5
/** Quanto si può stare sotto il budget prima di aggiungere un altro pezzo. */
export const UNDER_BUDGET_TOLERANCE = 4
/** Quanto si può sforare il budget. Oltre, si preferisce un articolo in meno. */
export const OVER_BUDGET_TOLERANCE = 6

export interface DaySelection {
  ids: string[]
  minutes: number
  /** Da dove ripartire domani. */
  nextIndex: number
  /** Vero se la coda è finita: solo allora entra il ripasso. */
  exhausted: boolean
}

/**
 * Riempimento greedy della coda fino a coprire il budget di minuti.
 *
 * Funzione pura: a parità di (coda, indice di partenza, budget) restituisce
 * sempre la stessa selezione. La data non entra nel calcolo — serve solo come
 * chiave per ricordare l'assegnazione, così il numero di oggi non cambia se
 * ricarichi la pagina a metà giornata.
 *
 * Nota su "almeno due articoli": il piano lo prevedeva come vincolo rigido,
 * ma un vincolo rigido produce giornate da 40 minuti quando in coda ci sono
 * due dossier di fila (budget 30 + due pezzi da 20). Qui il tetto di sforamento
 * vince sul minimo: un dossier lungo può legittimamente essere la giornata da
 * solo. Il minimo di due resta come proprietà del *mescolamento* della coda,
 * che alterna le profondità, non come forzatura del selettore.
 */
export function selectForDay(
  items: QueueItem[],
  startIndex: number,
  budget: number,
): DaySelection {
  const lower = budget - UNDER_BUDGET_TOLERANCE
  const hardMax = budget + OVER_BUDGET_TOLERANCE

  const ids: string[] = []
  let minutes = 0
  let i = Math.max(0, startIndex)

  while (i < items.length && ids.length < MAX_ITEMS_PER_DAY) {
    const next = items[i]

    // Il primo pezzo entra sempre: una giornata senza niente da leggere non
    // è un'opzione accettabile finché la coda ha materiale.
    if (ids.length > 0) {
      const wouldOverflow = minutes + next.readingMinutes > hardMax
      if (minutes >= lower || wouldOverflow) break
    }

    ids.push(next.id)
    minutes += next.readingMinutes
    i += 1
  }

  return { ids, minutes, nextIndex: i, exhausted: i >= items.length }
}

/* ── Ripetizione spaziata ─────────────────────────────────────────────── */

/** Giorni dopo i quali un articolo torna a farsi rileggere. */
export const REVIEW_INTERVALS = [7, 21, 60, 180] as const

export interface ReadRecord {
  id: string
  /** Quando è stato letto la prima volta (ISO date, YYYY-MM-DD). */
  readAt: string
  /** Ultima volta che è passato davanti agli occhi: lettura o ripasso. */
  lastAt: string
  /** Quanti ripassi già fatti. Oltre REVIEW_INTERVALS.length, esce dal giro. */
  reviews: number
}

/**
 * Gli articoli che tornano oggi. Riguarda solo i `fondamentale`: il ripasso
 * serve a far attecchire il sapere di base, non a rimacinare tutto.
 */
export function dueReviews(
  records: ReadRecord[],
  today: string,
  isFondamentale: (id: string) => boolean,
): string[] {
  return records
    .filter((r) => {
      if (r.reviews >= REVIEW_INTERVALS.length) return false
      if (!isFondamentale(r.id)) return false
      const wait = REVIEW_INTERVALS[r.reviews]
      return daysBetween(r.lastAt, today) >= wait
    })
    // I più arretrati per primi: chi aspetta da più tempo ha più bisogno.
    .sort((a, b) => daysBetween(b.lastAt, today) - daysBetween(a.lastAt, today))
    .map((r) => r.id)
}

export interface DayPlan extends DaySelection {
  /** Ripassi aggiunti per completare la giornata. Vuoto finché c'è coda. */
  review: string[]
}

/**
 * Il piano completo del giorno: prima il materiale nuovo, e solo quando la
 * coda è davvero finita si completa col ripasso. Il ripasso non ruba mai
 * spazio ai contenuti nuovi.
 */
export function planDay(args: {
  items: QueueItem[]
  startIndex: number
  budget: number
  reviewCandidates: string[]
  minutesOf: (id: string) => number
}): DayPlan {
  const { items, startIndex, budget, reviewCandidates, minutesOf } = args
  const fresh = selectForDay(items, startIndex, budget)

  if (!fresh.exhausted) return { ...fresh, review: [] }

  const lower = budget - UNDER_BUDGET_TOLERANCE
  const hardMax = budget + OVER_BUDGET_TOLERANCE
  const review: string[] = []
  let minutes = fresh.minutes

  for (const id of reviewCandidates) {
    if (fresh.ids.length + review.length >= MAX_ITEMS_PER_DAY) break
    if (minutes >= lower) break
    const m = minutesOf(id)
    if (review.length + fresh.ids.length > 0 && minutes + m > hardMax) break
    review.push(id)
    minutes += m
  }

  return { ...fresh, minutes, review }
}

/* ── Date, in ora locale ──────────────────────────────────────────────── */

/**
 * La chiave del giorno in ora *locale*. Usare toISOString() qui sarebbe un bug:
 * a Roma dopo mezzanotte l'UTC è ancora il giorno prima, e il numero nuovo
 * comparirebbe con un giorno di ritardo.
 */
export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseDayKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function daysBetween(fromKey: string, toKey: string): number {
  const from = parseDayKey(fromKey)
  const to = parseDayKey(toKey)
  return Math.round((to.getTime() - from.getTime()) / 86_400_000)
}

/** Se il numero di oggi è già stato svelato (dalle 7:00 in poi). */
export function isRevealed(now: Date = new Date()): boolean {
  return now.getHours() >= REVEAL_HOUR
}

const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato']
const MESI = [
  'gennaio',
  'febbraio',
  'marzo',
  'aprile',
  'maggio',
  'giugno',
  'luglio',
  'agosto',
  'settembre',
  'ottobre',
  'novembre',
  'dicembre',
]

/** "mercoledì 27 luglio" — la data come la scriverebbe un periodico. */
export function formatDayLong(key: string): string {
  const d = parseDayKey(key)
  return `${GIORNI[d.getDay()]} ${d.getDate()} ${MESI[d.getMonth()]}`
}

/** "27.07" — forma breve per gli elenchi di arretrati. */
export function formatDayShort(key: string): string {
  const d = parseDayKey(key)
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

/** "28 min" o "1 h 05" — la durata come etichetta. */
export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, '0')}`
}
