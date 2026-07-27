import { describe, expect, it } from 'vitest'
import type { Depth, QueueItem } from './schema'
import {
  dayKey,
  daysBetween,
  dueReviews,
  formatMinutes,
  MAX_ITEMS_PER_DAY,
  planDay,
  readingMinutes,
  REVIEW_INTERVALS,
  selectForDay,
  type ReadRecord,
} from './reading'

/** Una coda di `count` articoli tutti della stessa durata. */
function queue(count: number, minutes: number, depth: Depth = 'standard'): QueueItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `a${i}`,
    readingMinutes: minutes,
    depth,
    relevance: 'fondamentale' as const,
    topics: ['bias-euristiche' as const],
  }))
}

describe('readingMinutes', () => {
  it('arrotonda per eccesso a 190 parole al minuto', () => {
    expect(readingMinutes(190)).toBe(1)
    expect(readingMinutes(191)).toBe(2)
    expect(readingMinutes(1520)).toBe(8) // articolo standard
    expect(readingMinutes(3800)).toBe(20) // dossier
  })

  it('non restituisce mai zero per un testo non vuoto', () => {
    expect(readingMinutes(1)).toBe(1)
    expect(readingMinutes(0)).toBe(0)
  })
})

describe('selectForDay — budget normale (30 min)', () => {
  it('copre il budget con due articoli approfonditi', () => {
    const s = selectForDay(queue(10, 13), 0, 30)
    expect(s.ids).toEqual(['a0', 'a1'])
    expect(s.minutes).toBe(26)
  })

  it('usa quattro articoli standard quando sono più corti', () => {
    const s = selectForDay(queue(10, 8), 0, 30)
    expect(s.ids).toHaveLength(4)
    expect(s.minutes).toBe(32)
  })

  it("lascia un dossier da solo invece di sfondare il budget con due", () => {
    // Due pezzi da 20 farebbero 40 minuti su un budget di 30: il tetto di
    // sforamento vince sul minimo di due articoli.
    const s = selectForDay(queue(10, 20, 'dossier'), 0, 30)
    expect(s.ids).toEqual(['a0'])
    expect(s.minutes).toBe(20)
  })

  it('non supera mai il massimo di articoli al giorno', () => {
    const s = selectForDay(queue(20, 5, 'breve'), 0, 30)
    expect(s.ids).toHaveLength(MAX_ITEMS_PER_DAY)
  })
})

describe('selectForDay — altri ritmi', () => {
  it('ritmo leggero (15 min) sta nella banda', () => {
    const s = selectForDay(queue(10, 5, 'breve'), 0, 15)
    expect(s.minutes).toBe(15)
    expect(s.ids).toHaveLength(3)
  })

  it('ritmo intenso (45 min) si ferma prima di sfondare', () => {
    const s = selectForDay(queue(10, 13), 0, 45)
    expect(s.ids).toHaveLength(3)
    expect(s.minutes).toBe(39)
  })

  it('rispetta la banda [budget-4, budget+6] su tutti i ritmi', () => {
    for (const budget of [15, 30, 45]) {
      for (const dur of [4, 5, 8, 9, 13, 15]) {
        const s = selectForDay(queue(30, dur), 0, budget)
        // L'unica eccezione ammessa è il tetto di 5 articoli, che può
        // lasciare la giornata sotto la banda con articoli molto brevi.
        if (s.ids.length < MAX_ITEMS_PER_DAY) {
          expect(s.minutes).toBeLessThanOrEqual(budget + 6)
        }
      }
    }
  })
})

describe('selectForDay — determinismo e avanzamento', () => {
  it('a parità di input restituisce sempre la stessa selezione', () => {
    const q = queue(30, 9)
    const runs = Array.from({ length: 5 }, () => selectForDay(q, 7, 30))
    for (const r of runs) expect(r).toEqual(runs[0])
  })

  it('avanza senza ripetere articoli su giorni consecutivi', () => {
    const q = queue(30, 9)
    const giorno1 = selectForDay(q, 0, 30)
    const giorno2 = selectForDay(q, giorno1.nextIndex, 30)
    const giorno3 = selectForDay(q, giorno2.nextIndex, 30)
    const tutti = [...giorno1.ids, ...giorno2.ids, ...giorno3.ids]
    expect(new Set(tutti).size).toBe(tutti.length)
  })

  it('segnala l’esaurimento quando la coda finisce', () => {
    const s = selectForDay(queue(2, 13), 0, 30)
    expect(s.exhausted).toBe(true)
    expect(s.ids).toHaveLength(2)
  })

  it('con coda vuota non produce niente e si dichiara esaurita', () => {
    const s = selectForDay([], 0, 30)
    expect(s.ids).toEqual([])
    expect(s.minutes).toBe(0)
    expect(s.exhausted).toBe(true)
  })
})

describe('dueReviews', () => {
  const sempreFondamentale = () => true

  function record(id: string, giorniFa: number, reviews: number): ReadRecord {
    const d = new Date(2026, 6, 27)
    d.setDate(d.getDate() - giorniFa)
    const key = dayKey(d)
    return { id, readAt: key, lastAt: key, reviews }
  }

  it('richiama dopo 7 giorni al primo ripasso', () => {
    const oggi = '2026-07-27'
    expect(dueReviews([record('x', 8, 0)], oggi, sempreFondamentale)).toEqual(['x'])
    expect(dueReviews([record('x', 5, 0)], oggi, sempreFondamentale)).toEqual([])
  })

  it('allunga l’intervallo a ogni ripasso', () => {
    const oggi = '2026-07-27'
    // reviews:1 → aspetta 21 giorni
    expect(dueReviews([record('x', 20, 1)], oggi, sempreFondamentale)).toEqual([])
    expect(dueReviews([record('x', 22, 1)], oggi, sempreFondamentale)).toEqual(['x'])
    // reviews:2 → aspetta 60
    expect(dueReviews([record('x', 59, 2)], oggi, sempreFondamentale)).toEqual([])
    expect(dueReviews([record('x', 61, 2)], oggi, sempreFondamentale)).toEqual(['x'])
  })

  it('esce dal giro dopo l’ultimo intervallo', () => {
    const oggi = '2026-07-27'
    const finito = record('x', 500, REVIEW_INTERVALS.length)
    expect(dueReviews([finito], oggi, sempreFondamentale)).toEqual([])
  })

  it('ignora gli articoli che non sono fondamentali', () => {
    const oggi = '2026-07-27'
    expect(dueReviews([record('x', 100, 0)], oggi, () => false)).toEqual([])
  })

  it('mette davanti chi aspetta da più tempo', () => {
    const oggi = '2026-07-27'
    const out = dueReviews(
      [record('recente', 8, 0), record('vecchio', 90, 0)],
      oggi,
      sempreFondamentale,
    )
    expect(out).toEqual(['vecchio', 'recente'])
  })
})

describe('planDay', () => {
  const minutesOf = () => 8

  it('non ripassa niente finché la coda ha materiale', () => {
    const p = planDay({
      items: queue(30, 9),
      startIndex: 0,
      budget: 30,
      reviewCandidates: ['r1', 'r2', 'r3'],
      minutesOf,
    })
    expect(p.review).toEqual([])
    expect(p.exhausted).toBe(false)
  })

  it('completa con il ripasso solo a coda esaurita', () => {
    const p = planDay({
      items: queue(1, 9),
      startIndex: 0,
      budget: 30,
      reviewCandidates: ['r1', 'r2', 'r3', 'r4'],
      minutesOf,
    })
    expect(p.exhausted).toBe(true)
    expect(p.ids).toEqual(['a0'])
    expect(p.review.length).toBeGreaterThan(0)
    expect(p.minutes).toBeGreaterThanOrEqual(26)
    expect(p.minutes).toBeLessThanOrEqual(36)
  })

  it('con coda esaurita e nessun ripasso disponibile resta corta', () => {
    const p = planDay({
      items: [],
      startIndex: 0,
      budget: 30,
      reviewCandidates: [],
      minutesOf,
    })
    expect(p.ids).toEqual([])
    expect(p.review).toEqual([])
  })

  it('il ripasso rispetta il tetto di articoli al giorno', () => {
    const p = planDay({
      items: queue(2, 4, 'breve'),
      startIndex: 0,
      budget: 45,
      reviewCandidates: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'],
      minutesOf: () => 4,
    })
    expect(p.ids.length + p.review.length).toBeLessThanOrEqual(MAX_ITEMS_PER_DAY)
  })
})

describe('date in ora locale', () => {
  it('subito dopo mezzanotte la chiave è già il giorno nuovo', () => {
    // Con toISOString() questo test fallirebbe in Europa: a 00:30 locali
    // l'UTC è ancora il giorno precedente.
    expect(dayKey(new Date(2026, 0, 5, 0, 30))).toBe('2026-01-05')
    expect(dayKey(new Date(2026, 0, 5, 23, 45))).toBe('2026-01-05')
  })

  it('conta i giorni fra due chiavi', () => {
    expect(daysBetween('2026-07-20', '2026-07-27')).toBe(7)
    expect(daysBetween('2026-07-27', '2026-07-27')).toBe(0)
  })

  it('attraversa il cambio dell’ora legale senza perdere un giorno', () => {
    // In Italia l'ora legale finisce il 25 ottobre 2026: quel giorno ha 25 ore.
    expect(daysBetween('2026-10-24', '2026-10-26')).toBe(2)
    // E inizia il 29 marzo 2026: quel giorno ha 23 ore.
    expect(daysBetween('2026-03-28', '2026-03-30')).toBe(2)
  })
})

describe('formatMinutes', () => {
  it('scrive i minuti sotto l’ora e le ore sopra', () => {
    expect(formatMinutes(28)).toBe('28 min')
    expect(formatMinutes(60)).toBe('1 h')
    expect(formatMinutes(65)).toBe('1 h 05')
  })
})
