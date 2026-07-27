'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { ArticleSummary } from '@/lib/content'
import type { Article } from '@/lib/schema'
import { CLUSTER_LABELS, RELEVANCE_LABELS, SOURCE_TYPE_LABELS } from '@/lib/schema'
import { isRead, markRead, markUnread } from '@/lib/storage'
import { useAppState, useHydrated } from '@/hooks/use-app-state'
import { ArticleCard } from './article-card'
import { cn } from '@/lib/utils'

/** Dove compare il bottone «segna come letto». */
const SOGLIA_BOTTONE = 0.85
/** Dove la lettura si considera conclusa e la marcatura è automatica. */
const SOGLIA_AUTOMATICA = 0.985

/**
 * Rende `*corsivo*` e `**grassetto**` come elementi React, non come HTML:
 * il testo arriva da un generatore, e costruire markup da stringhe sarebbe
 * un'iniezione in attesa di accadere.
 */
function formatInline(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const token = m[0]
    if (token.startsWith('**')) {
      out.push(<strong key={`${keyPrefix}-b${i++}`}>{token.slice(2, -2)}</strong>)
    } else {
      out.push(<em key={`${keyPrefix}-i${i++}`}>{token.slice(1, -1)}</em>)
    }
    last = m.index + token.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function Reader({
  article,
  fallbackUrl,
  linkVerified,
  related,
}: {
  article: Article
  fallbackUrl?: string
  linkVerified: boolean
  related: ArticleSummary[]
}) {
  const state = useAppState()
  const hydrated = useHydrated()
  const [progress, setProgress] = useState(0)
  const autoMarked = useRef(false)
  const letto = hydrated && isRead(state, article.id)

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const p = scrollable <= 0 ? 1 : Math.min(1, window.scrollY / scrollable)
      setProgress(p)
      // Marcatura automatica in fondo: una volta sola, e mai se l'utente ha
      // già deciso di segnarlo come non letto.
      if (p >= SOGLIA_AUTOMATICA && !autoMarked.current) {
        autoMarked.current = true
        if (!isRead(state, article.id)) markRead(article.id)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [article.id, state])

  return (
    <div>
      {/* Il progresso è un filetto che si riempie in cima: sta nel linguaggio
          del resto dell'app, e non ruba spazio alla lettura. */}
      <div
        className="fixed inset-x-0 top-0 z-20 h-px bg-transparent"
        role="progressbar"
        aria-label="Avanzamento della lettura"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-px bg-accent transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <article className="px-5 pad-top-safe">
        <nav className="mb-6">
          <Link href="/" className="label">
            ← indice
          </Link>
        </nav>

        <header>
          <p className="label">
            {RELEVANCE_LABELS[article.relevance]}
            {' · '}
            {article.topics.map((t) => CLUSTER_LABELS[t]).join(' · ')}
          </p>
          <h1 className="mt-3 text-h1">{article.titleIt}</h1>
          <p className="mt-4 text-small italic text-ink-soft">
            {article.authors.join('; ')} ({article.year}).{' '}
            <span className="not-italic">«{article.titleOriginal}»</span>
            {article.venue ? `, ${article.venue}.` : '.'}
          </p>
          <p className="label mt-3">
            {SOURCE_TYPE_LABELS[article.type]} · {article.readingMinutes} min ·{' '}
            {article.wordCount} parole
            {article.citable && <span className="text-accent"> · citabile</span>}
          </p>
        </header>

        <hr className="rule-strong rule mt-6" />

        <div className="prose mt-8 max-w-[var(--measure)]">
          {article.sections.map((s, si) => (
            <section key={s.heading}>
              {/* La prima sezione non ha bisogno dell'etichetta: si vede che
                  è l'apertura, e l'etichetta ruberebbe l'attacco. */}
              {si > 0 && (
                <>
                  <hr className="rule mb-3" />
                  <h2 className="label mb-3">{s.heading}</h2>
                </>
              )}
              {s.paragraphs.map((p, pi) => (
                <p key={pi} className={si === 0 ? 'lead' : undefined}>
                  {formatInline(p, `${si}-${pi}`)}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Fonte: se il link non è stato verificato lo si dice, invece di far
            scoprire all'utente un 404. */}
        <div className="mt-10">
          <hr className="rule-strong rule" />
          <p className="label mt-4">Fonte originale</p>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block break-words text-small text-accent underline decoration-1 underline-offset-2"
          >
            {article.doi ? `doi.org/${article.doi}` : article.sourceUrl.replace(/^https?:\/\//, '')}
          </a>
          {!linkVerified && (
            <p className="mt-2 text-micro leading-relaxed text-ink-muted">
              Link non ancora verificato automaticamente.
              {fallbackUrl && (
                <>
                  {' '}
                  Se non si apre,{' '}
                  <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2"
                  >
                    cerca la fonte
                  </a>
                  .
                </>
              )}
            </p>
          )}
        </div>

        {/* Il bottone compare in fondo, non all'inizio: chiedere «hai letto?»
            a metà pagina è una domanda a cui non si può rispondere. */}
        {hydrated && (progress >= SOGLIA_BOTTONE || letto) && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => (letto ? markUnread(article.id) : markRead(article.id))}
              className={cn(
                'w-full border px-4 py-3 text-small transition-colors',
                letto ? 'border-rule text-ink-muted' : 'border-ink text-ink',
              )}
            >
              {letto ? 'Segna come non letto' : 'Segna come letto'}
            </button>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <hr className="rule-strong rule" />
            <p className="label mt-4">Letture collegate</p>
            <ol className="divide-y divide-rule">
              {related.map((r) => (
                <li key={r.id}>
                  <ArticleCard article={r} read={isRead(state, r.id)} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </article>
    </div>
  )
}
