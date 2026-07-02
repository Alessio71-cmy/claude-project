import type { Metadata } from 'next'
import { Section } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { TitleRow } from '@/components/ui/title-row'
import { ServiceCard } from '@/components/ui/card'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { ServiceExplorer } from '@/components/services/service-explorer'
import { SolutionFinder } from '@/components/contact/solution-finder'
import { serviceIcons } from '@/components/icons'
import { serviceMeta } from '@/lib/site'
import { allServices, overview } from '@/lib/content/it/services'

export const metadata: Metadata = {
  title: 'Servizi — Connettività, VoIP, IoT, Core Network e Wireless',
  description:
    'Tutti i servizi KonnectAlps per aziende e PA in Trentino-Alto Adige: connettività avanzata, VoIP e fonia, IoT, core network e soluzioni wireless. Confrontali in trenta secondi.',
}

export default function ServiziOverviewPage() {
  return (
    <>
      {/* Hero overview */}
      <Section className="pt-36 md:pt-44">
        <Reveal>
          <p className="text-small font-medium uppercase tracking-[0.25em] text-primary">
            {overview.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="h1-main mt-6 max-w-4xl">{overview.h1}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-base mt-8 max-w-2xl opacity-80">{overview.subtitle}</p>
        </Reveal>
      </Section>

      {/* Grid di card grandi cliccabili */}
      <Section className="pt-4">
        <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
          {allServices.map((service, i) => {
            const meta = serviceMeta[service.key]
            const Icon = serviceIcons[service.key]
            const spans = ['xl:col-span-7', 'xl:col-span-5', 'xl:col-span-4', 'xl:col-span-4', 'xl:col-span-4']
            return (
              <RevealItem key={service.key} className={spans[i]}>
                <ServiceCard
                  title={meta.label}
                  description={service.subtitle}
                  href={meta.href}
                  background={meta.colorSoft}
                  icon={<Icon />}
                  className="h-full"
                />
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Section>

      {/* Esploratore comparativo */}
      <Section className="pt-8">
        <TitleRow title={overview.explorer.heading} text={overview.explorer.description} />
        <div className="mt-12">
          <ServiceExplorer services={allServices} />
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24 md:py-32">
        <Reveal className="mb-20">
          <SolutionFinder />
        </Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="h2-main">{overview.cta.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base mt-6 opacity-75">{overview.cta.description}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex justify-center">
              <Button href="/contatti">Richiedi una consulenza</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
