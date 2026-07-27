import { DEFAULT_PACE, dayKey, type PaceKey, type ReadRecord } from './reading'

/**
 * Tutto lo stato dell'app vive nel localStorage del telefono: non c'è backend,
 * non c'è account. Il prezzo è dichiarato nel README: cancellare i dati di
 * Safari azzera i progressi, e l'export JSON è la rete di sicurezza.
 */

const STORAGE_KEY = 'lettura.v1'

export type ThemeChoice = 'auto' | 'light' | 'dark'

export interface DayAssignment {
  fresh: string[]
  review: string[]
}

export interface AppState {
  version: 1
  /** Quanti articoli della coda sono già stati assegnati a una giornata. */
  cursor: number
  /** Le assegnazioni per giorno: una volta fatte non cambiano più. */
  assignments: Record<string, DayAssignment>
  read: ReadRecord[]
  pace: PaceKey
  theme: ThemeChoice
  /** Primo avvio: serve per la storia dell'utente, non per la selezione. */
  launchedAt: string
}

export function defaultState(): AppState {
  return {
    version: 1,
    cursor: 0,
    assignments: {},
    read: [],
    pace: DEFAULT_PACE,
    theme: 'auto',
    launchedAt: dayKey(),
  }
}

/**
 * Uno stato costante per il prerender. Deve essere lo *stesso oggetto* a ogni
 * chiamata, altrimenti useSyncExternalStore entra in loop infinito.
 */
const SERVER_STATE: AppState = Object.freeze({
  ...defaultState(),
  launchedAt: '1970-01-01',
}) as AppState

let cache: AppState | null = null
const listeners = new Set<() => void>()

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function migrate(raw: unknown): AppState {
  const base = defaultState()
  if (typeof raw !== 'object' || raw === null) return base
  const obj = raw as Partial<AppState>

  // Nessuna migrazione da fare finché la versione è 1; la struttura c'è per
  // non doverla inventare di fretta al primo cambio di schema.
  return {
    version: 1,
    cursor: typeof obj.cursor === 'number' && obj.cursor >= 0 ? obj.cursor : 0,
    assignments: isRecordOfAssignments(obj.assignments) ? obj.assignments : {},
    read: Array.isArray(obj.read) ? obj.read.filter(isReadRecord) : [],
    pace: obj.pace === 'leggero' || obj.pace === 'intenso' || obj.pace === 'normale' ? obj.pace : base.pace,
    theme: obj.theme === 'light' || obj.theme === 'dark' || obj.theme === 'auto' ? obj.theme : 'auto',
    launchedAt: typeof obj.launchedAt === 'string' ? obj.launchedAt : base.launchedAt,
  }
}

function isReadRecord(v: unknown): v is ReadRecord {
  if (typeof v !== 'object' || v === null) return false
  const r = v as Partial<ReadRecord>
  return (
    typeof r.id === 'string' &&
    typeof r.readAt === 'string' &&
    typeof r.lastAt === 'string' &&
    typeof r.reviews === 'number'
  )
}

function isRecordOfAssignments(v: unknown): v is Record<string, DayAssignment> {
  if (typeof v !== 'object' || v === null) return false
  return Object.values(v).every(
    (a) =>
      typeof a === 'object' &&
      a !== null &&
      Array.isArray((a as DayAssignment).fresh) &&
      Array.isArray((a as DayAssignment).review),
  )
}

export function getState(): AppState {
  // La cache viene prima del controllo sull'ambiente: durante il prerender non
  // c'è nessuna update() in volo, quindi resta SERVER_STATE, mentre nei test
  // (e in un eventuale ambiente senza localStorage) lo stato resta coerente.
  if (cache) return cache
  if (!isBrowser()) return SERVER_STATE
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    cache = raw ? migrate(JSON.parse(raw)) : defaultState()
  } catch {
    // Safari in navigazione privata può lanciare sull'accesso: si continua in
    // memoria, l'app resta usabile e i progressi si perdono a fine sessione.
    cache = defaultState()
  }
  return cache
}

export function getServerState(): AppState {
  return SERVER_STATE
}

function commit(next: AppState) {
  cache = next
  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* quota piena o storage negato: lo stato resta in memoria */
    }
  }
  for (const l of listeners) l()
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function update(fn: (s: AppState) => AppState): void {
  commit(fn(getState()))
}

/* ── Operazioni ───────────────────────────────────────────────────────── */

/** Registra l'assegnazione del giorno e fa avanzare il cursore della coda. */
export function assignDay(day: string, assignment: DayAssignment, nextCursor: number): void {
  update((s) => {
    if (s.assignments[day]) return s // già assegnato: non si riscrive
    return {
      ...s,
      cursor: Math.max(s.cursor, nextCursor),
      assignments: { ...s.assignments, [day]: assignment },
    }
  })
}

export function markRead(id: string, today: string = dayKey()): void {
  update((s) => {
    const existing = s.read.find((r) => r.id === id)
    if (existing) {
      // Rilettura: conta come ripasso fatto e riparte l'intervallo.
      return {
        ...s,
        read: s.read.map((r) =>
          r.id === id ? { ...r, lastAt: today, reviews: r.reviews + 1 } : r,
        ),
      }
    }
    return { ...s, read: [...s.read, { id, readAt: today, lastAt: today, reviews: 0 }] }
  })
}

export function markUnread(id: string): void {
  update((s) => ({ ...s, read: s.read.filter((r) => r.id !== id) }))
}

export function isRead(s: AppState, id: string): boolean {
  return s.read.some((r) => r.id === id)
}

export function setPace(pace: PaceKey): void {
  update((s) => ({ ...s, pace }))
}

export function setTheme(theme: ThemeChoice): void {
  update((s) => ({ ...s, theme }))
}

/* ── Export e import: l'unica via di recupero fra dispositivi ─────────── */

export function exportState(): string {
  return JSON.stringify(getState(), null, 2)
}

export interface ImportResult {
  ok: boolean
  message: string
}

export function importState(json: string): ImportResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return { ok: false, message: 'Il file non è JSON valido.' }
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return { ok: false, message: 'Il contenuto non ha la forma attesa.' }
  }
  const next = migrate(parsed)
  commit(next)
  return {
    ok: true,
    message: `Ripristinati ${next.read.length} articoli letti e ${Object.keys(next.assignments).length} giornate.`,
  }
}

/** Azzera tutto. Usato solo dietro conferma esplicita in Impostazioni. */
export function resetState(): void {
  commit(defaultState())
}
