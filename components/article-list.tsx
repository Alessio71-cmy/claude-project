'use client'

import { useMemo, useState } from 'react'
import type { ArticleSummary } from '@/lib/content'
import { CLUSTER_LABELS, RELEVANCE_LABELS, type Cluster, type Relevance } from '@/lib/schema'
import { dayKey, daysBetween, formatDayShort } from '@/lib/reading'
import { useAppState, useHydrated } from '@/hooks/use-app-state'
import { ArticleCard } from './article-card'
import { cn } from '@/lib/utils'

/** Oltre questi giorni un arretrato scivola in fondo, senza essere contato. */
const GIORNI_PRIMA_DI_ARRETRATO = 21

type Mode = 'da-leggere' | 'letti'

export function ArticleList({
  summaries,
  mode,
}: {
  summaries: ArticleSummary[]
  mode: Mode
}) {
  const state = useAppState()
  const hydrated = useHydrated()
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState<Cluster | null>(null)
  const [relevance, setRelevance] = useState<Relevance | null>(null)

  const byId = useMemo(() => new Map(summaries.map((s) => [s.id, s])), [summaries])
  const readMap = useMemo(() => new Map(state.read.map((r) => [r.id, r])), [state.read])

  /** Il giorno in cui un articolo è stato assegnato, per etichettarlo. */
  const assignedOn = useMemo(() => {
    const m = new Map<string, string>()
    for (const [day, a] of Object.entries(state.assignments)) {
      for (const id of [...a.fresh, ...a.review]) if (!m.has(id)) m.set(id, day)
    }
    return m
  }, [state.assignments])

  const items = useMemo(() => {
    if (!hydrated) return []
    const today = dayKey()

    let list: ArticleSummary[]
    if (mode === 'letti') {
      list = state.read
        .slice()
        .sort((a, b) => (a.lastAt < b.lastAt ? 1 : -1))
        .map((r) => byId.get(r.id))
        .filter((a): a is ArticleSummary => !!a)
    } else {
      // Da leggere: assegnati in un giorno passato e non ancora letti.
      list = [...assignedOn.entries()]
        .filter(([id, day]) => day !== today && !readMap.has(id))
        .sort((a, b) => (a[1] < b[1] ? 1 : -1))
        .map(([id]) => byId.get(id))
        .filter((a): a is ArticleSummary => !!a)
    }

    const q = query.trim().toLowerCase()
    return list.filter((a) => {
      if (topic && !a.topics.includes(topic)) return false
      if (relevance && a.relevance !== relevance) return false
      if (q && !`${a.titleIt} ${a.hook}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [hydrated, mode, state.read, assignedOn, readMap, byId, query, topic, relevance])

  const { recenti, arretrati } = useMemo(() => {
    if (mode !== 'da-leggere') return { recenti: items, arretrati: [] as ArticleSummary[] }
    const today = dayKey()
    const recenti: ArticleSummary[] = []
    const arretrati: ArticleSummary[] = []
    for (const a of items) {
      const day = assignedOn.get(a.id)
      const eta = day ? daysBetween(day, today) : 0
      ;(eta > GIORNI_PRIMA_DI_ARRETRATO ? arretrati : recenti).push(a)
    }
    return { recenti, arretrati }
  }, [items, mode, assignedOn])

  const topics = useMemo(
    () => [...new Set(summaries.flatMap((s) => s.topics))].sort(),
    [summaries],
  )

  return (
    <div className="px-5 pad-top-safe">
      <header>
        <p className="label">{mode === 'letti' ? 'Archivio' : 'Arretrati'}</p>
        <hr className="rule mt-3" />
        <h1 className="mt-4 text-h2">{mode === 'letti' ? 'Letti' : 'Da leggere'}</h1>
        <p className="label mt-2">
          {hydrated ? `${items.length} ${items.length === 1 ? 'articolo' : 'articoli'}` : ' '}
        </p>
      </header>

      {/* Ricerca e filtri: compaiono solo quando c'è abbastanza da filtrare,
          altrimenti sono rumore su una lista di tre voci. */}
      {hydrated && (items.length > 3 || query || topic || relevance) && (
        <div className="mt-5 space-y-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca nel titolo"
            aria-label="Cerca fra gli articoli"
            className="w-full border-b border-rule bg-transparent pb-2 text-base placeholder:text-ink-muted focus:border-accent focus:outline-none"
          />
          <div className="flex flex-wrap gap-1.5">
            <Chip active={!relevance && !topic} onClick={() => { setRelevance(null); setTopic(null) }}>
              tutti
            </Chip>
            {(['applicabile-subito', 'fondamentale', 'contesto'] as Relevance[]).map((r) => (
              <Chip key={r} active={relevance === r} onClick={() => setRelevance(relevance === r ? null : r)}>
                {RELEVANCE_LABELS[r].toLowerCase()}
              </Chip>
            ))}
            {topics.map((t) => (
              <Chip key={t} active={topic === t} onClick={() => setTopic(topic === t ? null : t)}>
                {CLUSTER_LABELS[t].toLowerCase()}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {!hydrated ? null : items.length === 0 ? (
        <Vuoto mode={mode} filtrato={Boolean(query || topic || relevance)} />
      ) : (
        <>
          <ol className="mt-2 divide-y divide-rule">
            {recenti.map((a) => (
              <li key={a.id}>
                <ArticleCard
                  article={a}
                  read={mode === 'letti'}
                  meta={
                    mode === 'da-leggere' && assignedOn.get(a.id)
                      ? `numero del ${formatDayShort(assignedOn.get(a.id)!)}`
                      : undefined
                  }
                />
              </li>
            ))}
          </ol>

          {arretrati.length > 0 && (
            <details className="mt-8">
              <summary className="label cursor-pointer py-2">
                arretrati oltre {GIORNI_PRIMA_DI_ARRETRATO} giorni ({arretrati.length})
              </summary>
              <ol className="divide-y divide-rule">
                {arretrati.map((a) => (
                  <li key={a.id}>
                    <ArticleCard
                      article={a}
                      meta={
                        assignedOn.get(a.id)
                          ? `numero del ${formatDayShort(assignedOn.get(a.id)!)}`
                          : undefined
                      }
                    />
                  </li>
                ))}
              </ol>
            </details>
          )}
        </>
      )}
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'label border px-2 py-1 transition-colors',
        active ? 'border-ink text-ink' : 'border-rule',
      )}
    >
      {children}
    </button>
  )
}

function Vuoto({ mode, filtrato }: { mode: Mode; filtrato: boolean }) {
  if (filtrato) {
    return <p className="mt-10 text-small text-ink-muted">Nessun articolo con questi filtri.</p>
  }
  return (
    <div className="mt-12">
      <p className="text-lead text-ink-soft">
        {mode === 'letti' ? 'Non hai ancora archiviato niente.' : 'Nessun arretrato.'}
      </p>
      <p className="mt-3 text-small text-ink-muted">
        {mode === 'letti'
          ? 'Gli articoli finiscono qui quando li segni come letti, e restano cercabili.'
          : 'Sei in pari: tutto quello che è arrivato l’hai letto.'}
      </p>
    </div>
  )
}
