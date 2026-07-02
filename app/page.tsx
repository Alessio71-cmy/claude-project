import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { ServicesGrid } from '@/components/home/services-grid'
import { Stats } from '@/components/home/stats'
import { Method } from '@/components/home/method'
import { AgentAiBox } from '@/components/home/agent-ai-box'
import { Sustainability } from '@/components/home/sustainability'
import { FinalCta } from '@/components/home/final-cta'

export const metadata: Metadata = {
  title: 'KonnectAlps — Connettività, VoIP e IoT in Trentino-Alto Adige',
  description:
    'Infrastrutture digitali su misura per aziende e pubbliche amministrazioni in Trentino-Alto Adige: connettività fino a 10 Gbps, VoIP, IoT, core network e soluzioni wireless con assistenza locale a Trento e Bolzano.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Stats />
      <Method />
      <AgentAiBox />
      <Sustainability />
      <FinalCta />
    </>
  )
}
