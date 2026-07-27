import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  assignDay,
  exportState,
  getState,
  importState,
  isRead,
  markRead,
  markUnread,
  resetState,
  setPace,
  subscribe,
} from './storage'

/** localStorage minimo, quanto basta a esercitare il percorso "browser". */
function installLocalStorage() {
  const store = new Map<string, string>()
  vi.stubGlobal('window', {
    localStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    },
  })
  return store
}

describe('storage', () => {
  beforeEach(() => {
    installLocalStorage()
    resetState()
  })

  it('parte da uno stato vuoto', () => {
    const s = getState()
    expect(s.cursor).toBe(0)
    expect(s.read).toEqual([])
    expect(s.assignments).toEqual({})
  })

  it('segna letto e non letto', () => {
    markRead('a1', '2026-07-27')
    expect(isRead(getState(), 'a1')).toBe(true)
    markUnread('a1')
    expect(isRead(getState(), 'a1')).toBe(false)
  })

  it('una rilettura conta come ripasso e riparte l’intervallo', () => {
    markRead('a1', '2026-07-01')
    markRead('a1', '2026-07-27')
    const r = getState().read.find((x) => x.id === 'a1')!
    expect(r.reviews).toBe(1)
    expect(r.readAt).toBe('2026-07-01') // la prima lettura non si riscrive
    expect(r.lastAt).toBe('2026-07-27')
  })

  it('assegna una giornata una sola volta', () => {
    assignDay('2026-07-27', { fresh: ['a1', 'a2'], review: [] }, 2)
    // Un secondo tentativo sullo stesso giorno non deve cambiare l'indice:
    // altrimenti ricaricando la pagina cambierebbero gli articoli di oggi.
    assignDay('2026-07-27', { fresh: ['a9'], review: [] }, 9)
    const s = getState()
    expect(s.assignments['2026-07-27'].fresh).toEqual(['a1', 'a2'])
    expect(s.cursor).toBe(2)
  })

  it('il cursore non torna mai indietro', () => {
    assignDay('2026-07-27', { fresh: ['a1'] , review: [] }, 5)
    assignDay('2026-07-28', { fresh: ['a2'], review: [] }, 3)
    expect(getState().cursor).toBe(5)
  })

  it('notifica chi è in ascolto a ogni cambiamento', () => {
    let chiamate = 0
    const stop = subscribe(() => (chiamate += 1))
    markRead('a1')
    setPace('intenso')
    stop()
    markRead('a2')
    expect(chiamate).toBe(2)
  })

  it('sopravvive a un localStorage che lancia', () => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: () => {
          throw new Error('SecurityError')
        },
        setItem: () => {
          throw new Error('QuotaExceeded')
        },
      },
    })
    resetState()
    expect(() => markRead('a1')).not.toThrow()
    expect(isRead(getState(), 'a1')).toBe(true)
  })

  describe('export e import', () => {
    it('fa il giro completo senza perdere niente', () => {
      markRead('a1', '2026-07-20')
      assignDay('2026-07-27', { fresh: ['a1', 'a2'], review: ['r1'] }, 2)
      setPace('leggero')
      const dump = exportState()

      resetState()
      expect(getState().read).toEqual([])

      const res = importState(dump)
      expect(res.ok).toBe(true)
      const s = getState()
      expect(s.read.map((r) => r.id)).toEqual(['a1'])
      expect(s.assignments['2026-07-27'].review).toEqual(['r1'])
      expect(s.pace).toBe('leggero')
    })

    it('rifiuta JSON non valido senza distruggere lo stato', () => {
      markRead('a1')
      const res = importState('{ non json')
      expect(res.ok).toBe(false)
      expect(isRead(getState(), 'a1')).toBe(true)
    })

    it('scarta i record malformati invece di crashare', () => {
      const res = importState(
        JSON.stringify({
          version: 1,
          cursor: -5,
          read: [{ id: 'buono', readAt: '2026-01-01', lastAt: '2026-01-01', reviews: 0 }, { spazzatura: true }],
          assignments: 'non un oggetto',
          pace: 'inventato',
        }),
      )
      expect(res.ok).toBe(true)
      const s = getState()
      expect(s.read.map((r) => r.id)).toEqual(['buono'])
      expect(s.cursor).toBe(0) // il -5 viene normalizzato
      expect(s.assignments).toEqual({})
      expect(s.pace).toBe('normale') // ritorna al default
    })
  })
})
