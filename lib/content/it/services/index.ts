import { connettivita } from './connettivita'
import { voip } from './voip'
import { iot } from './iot'
import { coreNetwork } from './core-network'
import { wireless } from './wireless'
import type { ServiceContent } from './types'

export type { ServiceContent } from './types'

/** Registro delle 5 pagine servizio, in ordine di navigazione. */
export const allServices: ServiceContent[] = [connettivita, voip, iot, coreNetwork, wireless]

export const servicesBySlug: Record<string, ServiceContent> = Object.fromEntries(
  allServices.map((s) => [s.slug, s])
)

/** Contenuti overview (sezione 5.2). */
export const overview = {
  eyebrow: 'Servizi',
  h1: 'Progettiamo il domani della connettività',
  subtitle:
    'Soluzioni tecniche d’avanguardia per infrastrutture digitali resilienti e scalabili: dall’analisi di rete all’implementazione, con un interlocutore unico sul territorio.',
  explorer: {
    heading: 'Quale servizio fa per te?',
    description:
      'Cinque servizi, un’unica infrastruttura. Esplora le differenze in trenta secondi, senza aprire cinque pagine.',
  },
  cta: {
    title: 'Non sai da dove partire?',
    description:
      'Nessun problema: è il nostro lavoro. Raccontaci l’esigenza e ti proponiamo la combinazione giusta di servizi — anche solo uno, se basta.',
  },
}
