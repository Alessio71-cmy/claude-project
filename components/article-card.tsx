import Link from 'next/link'
import type { ArticleSummary } from '@/lib/content'
import { CLUSTER_LABELS, RELEVANCE_LABELS, SOURCE_TYPE_LABELS, type Relevance } from '@/lib/schema'
import { cn } from '@/lib/utils'

/**
 * Il marcatore di rilevanza. Non una pillola colorata: un segno tipografico.
 * Tre forme diverse, così si distinguono anche senza percepire il colore —
 * che è anche il motivo per cui la forma cambia e non solo la tinta.
 */
function RelevanceMark({ relevance }: { relevance: Relevance }) {
  const shape =
    relevance === 'applicabile-subito' ? (
      // quadrato pieno, in accento: da usare adesso
      <span aria-hidden className="inline-block size-[7px] bg-accent" />
    ) : relevance === 'fondamentale' ? (
      // cerchio pieno, in inchiostro: sapere di base
      <span aria-hidden className="inline-block size-[7px] rounded-full bg-ink" />
    ) : (
      // anello vuoto, smorzato: contesto
      <span aria-hidden className="inline-block size-[7px] rounded-full border border-ink-muted" />
    )

  return (
    <span className="inline-flex items-center gap-1.5">
      {shape}
      <span className={cn('label', relevance !== 'contesto' && 'text-ink-soft')}>
        {RELEVANCE_LABELS[relevance]}
      </span>
    </span>
  )
}

export function ArticleCard({
  article,
  ordinal,
  read = false,
  meta,
  style,
  className,
}: {
  article: ArticleSummary
  /** Il numero d'ordine nell'indice del giorno, come in un sommario. */
  ordinal?: number
  read?: boolean
  /** Riga extra sotto il titolo: la data per gli arretrati, per esempio. */
  meta?: string
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <article className={className} style={style}>
      <Link
        href={`/articolo/${article.id}`}
        className={cn(
          'group block py-6 transition-opacity',
          read && 'opacity-55',
        )}
      >
        <header className="flex items-baseline justify-between gap-4">
          <RelevanceMark relevance={article.relevance} />
          {ordinal !== undefined && (
            <span className="ordinal" aria-hidden>
              {String(ordinal).padStart(2, '0')}
            </span>
          )}
        </header>

        <h2 className="mt-2.5 text-h3 group-active:text-accent">{article.titleIt}</h2>

        <p className="mt-2 text-small leading-[1.62] text-ink-soft">{article.hook}</p>

        <footer className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="label">{article.readingMinutes} min</span>
          <Sep />
          <span className="label">{SOURCE_TYPE_LABELS[article.type]}</span>
          <Sep />
          <span className="label">{article.year}</span>
          {article.topics[0] && (
            <>
              <Sep />
              <span className="label">{CLUSTER_LABELS[article.topics[0]]}</span>
            </>
          )}
          {article.citable && (
            <>
              <Sep />
              <span className="label text-accent" title="I numeri vengono da fonte primaria">
                citabile
              </span>
            </>
          )}
          {read && (
            <>
              <Sep />
              <span className="label">letto</span>
            </>
          )}
        </footer>

        {meta && <p className="label mt-2">{meta}</p>}
      </Link>
    </article>
  )
}

function Sep() {
  return (
    <span aria-hidden className="text-ink-muted/60 text-micro">
      ·
    </span>
  )
}
