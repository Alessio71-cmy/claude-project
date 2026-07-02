import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { Partners } from '@/components/home/partners'
import { ServicesGrid } from '@/components/home/services-grid'
import { Stats } from '@/components/home/stats'
import { Method } from '@/components/home/method'
import { AgentAiBox } from '@/components/home/agent-ai-box'
import { Sustainability } from '@/components/home/sustainability'
import { FinalCta } from '@/components/home/final-cta'
import { ScrollThemeZone } from '@/components/motion/scroll-theme'

export const metadata: Metadata = {
  title: 'KonnectAlps — Connettività, VoIP e IoT in Trentino-Alto Adige',
  description:
    'Infrastrutture digitali su misura per aziende e pubbliche amministrazioni in Trentino-Alto Adige: connettività fino a 10 Gbps, VoIP, IoT, core network e soluzioni wireless con assistenza locale a Trento e Bolzano.',
}

/**
 * Home (5.1) con transizione di tema allo scroll (firma ashen):
 * hero e partner su fondo scuro → la zona servizi + numeri vira l'intero
 * sfondo al chiaro → dal metodo in poi si torna scuro.
 */
export default function HomePage() {
  return (
    <ScrollThemeZone
      intro={
        <>
          <Hero />
          <Partners />
        </>
      }
      light={
        <>
          <ServicesGrid />
          <Stats />
        </>
      }
      outro={
        <>
          <Method />
          <AgentAiBox />
          <Sustainability />
          <FinalCta />
        </>
      }
    />
  )
}
