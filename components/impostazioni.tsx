'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PACES, type PaceKey } from '@/lib/reading'
import {
  exportState,
  importState,
  resetState,
  setPace,
  setTheme,
  type ThemeChoice,
} from '@/lib/storage'
import { useAppState, useHydrated } from '@/hooks/use-app-state'
import { cn } from '@/lib/utils'
import { PushSetup } from './push-setup'

export function Impostazioni() {
  const state = useAppState()
  const hydrated = useHydrated()
  const [messaggio, setMessaggio] = useState<string | null>(null)

  // Il tema scelto a mano vive su <html data-theme>, così il CSS lo applica
  // senza che nessun componente debba conoscere i colori.
  useEffect(() => {
    const root = document.documentElement
    if (state.theme === 'auto') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', state.theme)
  }, [state.theme])

  async function copiaEsportazione() {
    const dump = exportState()
    try {
      await navigator.clipboard.writeText(dump)
      setMessaggio('Stato copiato negli appunti.')
    } catch {
      setMessaggio('Copia non consentita: seleziona il testo qui sotto a mano.')
    }
  }

  function incollaImportazione() {
    const json = window.prompt('Incolla il JSON esportato:')
    if (!json) return
    setMessaggio(importState(json).message)
  }

  return (
    <div className="px-5 pad-top-safe pb-10">
      <nav className="mb-6">
        <Link href="/" className="label">
          ← indice
        </Link>
      </nav>

      <h1 className="text-h2">Impostazioni</h1>
      <hr className="rule mt-4" />

      {/* ── Ritmo ── */}
      <section className="mt-8">
        <h2 className="label">Ritmo di lettura</h2>
        <p className="mt-2 text-small text-ink-soft">
          Quanti minuti di lettura vuoi ogni giorno. Il numero di articoli si adatta alla loro
          lunghezza: due pezzi lunghi o quattro brevi, per arrivare allo stesso tempo.
        </p>
        <div className="mt-3 flex gap-2">
          {(Object.keys(PACES) as PaceKey[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setPace(k)}
              aria-pressed={hydrated && state.pace === k}
              className={cn(
                'flex-1 border px-3 py-2.5 text-small transition-colors',
                hydrated && state.pace === k ? 'border-ink text-ink' : 'border-rule text-ink-muted',
              )}
            >
              {PACES[k].label}
              <span className="label mt-0.5 block">{PACES[k].budget} min</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-micro text-ink-muted">
          Il cambio vale dal numero di domani: quello di oggi è già stato composto.
        </p>
      </section>

      {/* ── Tema ── */}
      <section className="mt-10">
        <h2 className="label">Aspetto</h2>
        <div className="mt-3 flex gap-2">
          {(['auto', 'light', 'dark'] as ThemeChoice[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              aria-pressed={hydrated && state.theme === t}
              className={cn(
                'flex-1 border px-3 py-2.5 text-small transition-colors',
                hydrated && state.theme === t ? 'border-ink text-ink' : 'border-rule text-ink-muted',
              )}
            >
              {t === 'auto' ? 'Sistema' : t === 'light' ? 'Carta' : 'Notte'}
            </button>
          ))}
        </div>
      </section>

      {/* ── Notifiche ── */}
      <PushSetup />

      {/* ── Stato ── */}
      <section className="mt-10">
        <h2 className="label">I tuoi dati</h2>
        <p className="mt-2 text-small text-ink-soft">
          Letti, arretrati e posizione in coda vivono solo su questo telefono: non c&apos;è un
          account e nessuno può leggerli. Il rovescio è che cancellando i dati di Safari si
          azzerano, e cambiando telefono non ti seguono. L&apos;esportazione è la via di recupero.
        </p>
        {hydrated && (
          <p className="label mt-3">
            {state.read.length} letti · {Object.keys(state.assignments).length} giornate ·
            posizione {state.cursor}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={copiaEsportazione} className="border border-rule px-3 py-2 text-small">
            Copia esportazione
          </button>
          <button type="button" onClick={incollaImportazione} className="border border-rule px-3 py-2 text-small">
            Importa
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Azzerare letti, arretrati e posizione in coda?')) {
                resetState()
                setMessaggio('Stato azzerato.')
              }
            }}
            className="border border-rule px-3 py-2 text-small text-ink-muted"
          >
            Azzera
          </button>
        </div>
        {messaggio && <p className="mt-3 text-small text-accent">{messaggio}</p>}
      </section>
    </div>
  )
}
