import { cn } from '@/lib/utils'

export type Verdict = 'migliore' | 'uguale' | 'peggiore'

export interface ComparisonRow {
  /** Criterio di confronto (es. "Banda garantita"). */
  criterion: string
  /** Nota esplicativa, onesta e non promozionale. */
  note?: string
  verdict: Verdict
}

interface ComparisonTableProps {
  /** Righe del confronto. */
  rows: ComparisonRow[]
  /** Intestazione della colonna di confronto (default: soluzioni locali). */
  compareLabel?: string
  caption?: string
  className?: string
}

const verdictLabel: Record<Verdict, string> = {
  migliore: 'Migliore',
  uguale: 'Uguale',
  peggiore: 'Peggiore',
}

function VerdictChip({ verdict }: { verdict: Verdict }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold',
        verdict === 'migliore' && 'text-bg-dark',
        verdict === 'uguale' && 'border border-current text-current opacity-80',
        verdict === 'peggiore' && 'border border-current text-current opacity-50'
      )}
      style={verdict === 'migliore' ? { backgroundColor: 'var(--service-color)' } : undefined}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          verdict === 'migliore' ? 'bg-bg-dark' : 'bg-current'
        )}
      />
      {verdictLabel[verdict]}
    </span>
  )
}

/**
 * Tabella comparativa servizio KonnectAlps vs soluzioni locali (sezione 5.3).
 * Tre livelli di giudizio per criterio; il tono resta onesto: le parità
 * sono mostrate con lo stesso peso visivo delle differenze.
 */
export function ComparisonTable({
  rows,
  compareLabel = 'rispetto alle soluzioni tipiche del territorio',
  caption,
  className,
}: ComparisonTableProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Intestazione */}
      <div className="mb-2 hidden grid-cols-12 gap-x-6 border-b border-current/20 pb-4 md:grid">
        <p className="text-small col-span-4 font-medium uppercase tracking-[0.15em] opacity-60">
          Criterio
        </p>
        <p className="text-small col-span-5 font-medium uppercase tracking-[0.15em] opacity-60">
          Nel concreto
        </p>
        <p className="text-small col-span-3 font-medium uppercase tracking-[0.15em] opacity-60">
          KonnectAlps {compareLabel && <span className="normal-case tracking-normal opacity-80">— {compareLabel}</span>}
        </p>
      </div>

      <ul className="divide-y divide-current/15">
        {rows.map((row) => (
          <li
            key={row.criterion}
            className="grid grid-cols-1 gap-y-3 py-6 md:grid-cols-12 md:items-center md:gap-x-6"
          >
            <div className="flex items-center justify-between gap-4 md:col-span-4 md:block">
              <h4 className="h3-support">{row.criterion}</h4>
              <div className="md:hidden">
                <VerdictChip verdict={row.verdict} />
              </div>
            </div>
            <p className="text-small leading-relaxed opacity-70 md:col-span-5">{row.note}</p>
            <div className="hidden md:col-span-3 md:block">
              <VerdictChip verdict={row.verdict} />
            </div>
          </li>
        ))}
      </ul>

      {caption && <p className="text-small mt-6 max-w-prose opacity-50">{caption}</p>}
    </div>
  )
}
