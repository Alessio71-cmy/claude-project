import type { ServiceKey } from '@/lib/site'
import type { ComparisonRow } from '@/components/ui/comparison-table'

export interface ServiceContent {
  key: ServiceKey
  slug: string
  /** Etichetta piccola sopra l'H1 (es. "Connettività Avanzata"). */
  eyebrow: string
  h1: string
  subtitle: string
  seo: { title: string; description: string }

  /** Caratteristiche/benefici principali (sezione 5.3.2). */
  features: {
    heading: string
    description: string
    items: { title: string; text: string }[]
  }

  /** Varianti/specifiche tecniche (es. tagli di banda), opzionale. */
  tech?: {
    heading: string
    description: string
    specs: { name: string; value: string; text: string }[]
  }

  /** Tabella comparativa obbligatoria (sezione 5.3.3). */
  comparison: {
    heading: string
    description: string
    rows: ComparisonRow[]
    caption: string
  }

  /** Sezione "potenzialità" (sezione 5.3.4): capacità tecniche di livello
   *  enterprise suggerite dai contenuti, mai dichiarate. */
  potential: {
    heading: string
    statement: string
    points: { title: string; text: string }[]
  }

  cta: { title: string; description: string }

  /** Fatti rapidi per l'esploratore comparativo nell'overview (5.2). */
  quickFacts: {
    ideale: string
    tecnologia: string
    puntoForte: string
    finoA: string
  }
}
