'use client'

import { useEffect, useMemo } from 'react'
import type { ArticleSummary } from '@/lib/content'
import type { QueueItem } from '@/lib/schema'
import {
  dayKey,
  formatDayLong,
  formatMinutes,
  isRevealed,
  PACES,
  planDay,
  dueReviews,
  REVEAL_HOUR,
} from '@/lib/reading'
import { assignDay } from '@/lib/storage'
import { useAppState, useHydrated } from '@/hooks/use-app-state'
import { ArticleCard } from './article-card'

export function DailyIndex({
  summaries,
  queue,
}: {
  summaries: ArticleSummary[]
  queue: QueueItem[]
}) {
  const state = useAppState()
  const hydrated = useHydrated()
  const byId = useMemo(() => new Map(summaries.map((s) => [s.id, s])), [summaries])

  // L'ora locale del telefono non è conoscibile durante la build: finché non
  // siamo idratati non si può decidere se il numero di oggi è già svelato.
  const today = hydrated ? dayKey() : null
  const revealed = hydrated ? isRevealed() : false
  const budget = PACES[state.pace].budget

  const existing = today ? state.assignments[today] : undefined

  const plan = useMemo(() => {
    if (!today || !revealed || existing) return null
    const readIds = new Set(state.read.map((r) => r.id))
    return planDay({
      items: queue,
      startIndex: state.cursor,
      budget,
      reviewCandidates: dueReviews(
        state.read,
        today,
        (id) => byId.get(id)?.relevance === 'fondamentale',
      ).filter((id) => readIds.has(id)),
      minutesOf: (id) => byId.get(id)?.readingMinutes ?? 8,
    })
  }, [today, revealed, existing, queue, state.cursor, state.read, budget, byId])

  // Registra l'assegnazione una volta sola: da qui in poi il numero di oggi
  // non cambia più, nemmeno ricaricando la pagina a metà giornata.
  useEffect(() => {
    if (!today || !plan) return
    if (plan.ids.length === 0 && plan.review.length === 0) return
    assignDay(today, { fresh: plan.ids, review: plan.review }, plan.nextIndex)
  }, [today, plan])

  const assignment = existing ?? (plan ? { fresh: plan.ids, review: plan.review } : null)
  const ids = assignment ? [...assignment.fresh, ...assignment.review] : []
  const articles = ids.map((id) => byId.get(id)).filter((a): a is ArticleSummary => !!a)
  const minutes = articles.reduce((s, a) => s + a.readingMinutes, 0)
  const readIds = new Set(state.read.map((r) => r.id))
  const lettiOggi = articles.filter((a) => readIds.has(a.id)).length

  return (
    <div className="px-5 pad-top-safe">
      {/* Testata del periodico: identità, data, e la consistenza del numero */}
      <header>
        <p className="label">Lettura quotidiana</p>
        <hr className="rule mt-3" />
        <p className="label mt-3">
          {hydrated && today ? (
            <>
              {formatDayLong(today)}
              {articles.length > 0 && (
                <>
                  {' · '}
                  {articles.length} {articles.length === 1 ? 'articolo' : 'articoli'}
                  {' · '}
                  {formatMinutes(minutes)}
                </>
              )}
            </>
          ) : (
            ' '
          )}
        </p>
      </header>

      {!hydrated ? (
        <p className="mt-10 text-small text-ink-muted">Apertura del numero…</p>
      ) : !revealed ? (
        <PrimaDelle />
      ) : articles.length === 0 ? (
        <CodaVuota />
      ) : (
        <>
          {/* Progresso della giornata: un filetto che si riempie, non una
              barra colorata — sta nel linguaggio del resto. */}
          <div className="mt-6" aria-hidden>
            <div className="h-px w-full bg-rule">
              <div
                className="h-px bg-accent transition-[width] duration-500"
                style={{ width: `${(lettiOggi / articles.length) * 100}%` }}
              />
            </div>
          </div>
          <p className="label mt-2">
            {lettiOggi === articles.length
              ? 'numero completato'
              : `${lettiOggi} di ${articles.length} letti`}
          </p>

          <ol className="mt-2 divide-y divide-rule">
            {articles.map((a, i) => (
              <li key={a.id}>
                <ArticleCard
                  article={a}
                  ordinal={i + 1}
                  read={readIds.has(a.id)}
                  className="entry-rise"
                  style={{ animationDelay: `${i * 60}ms` }}
                  meta={
                    assignment?.review.includes(a.id)
                      ? 'ripasso — l’avevi già letto'
                      : undefined
                  }
                />
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  )
}

function PrimaDelle() {
  return (
    <div className="mt-12">
      <p className="text-lead text-ink-soft">
        Il numero di oggi arriva alle {REVEAL_HOUR}:00.
      </p>
      <p className="mt-3 text-small text-ink-muted">
        Nel frattempo puoi recuperare quello che hai lasciato indietro in «Da leggere».
      </p>
    </div>
  )
}

function CodaVuota() {
  return (
    <div className="mt-12">
      <p className="text-lead text-ink-soft">La coda è finita.</p>
      <p className="mt-3 text-small text-ink-muted">
        Il generatore aggiunge articoli nuovi ogni notte. Se non arrivano da qualche giorno,
        controlla che la Routine stia girando: le istruzioni sono nel README.
      </p>
    </div>
  )
}
