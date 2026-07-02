import type { Metadata } from 'next'
import { Section } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { TitleRow } from '@/components/ui/title-row'
import { ComparisonTable } from '@/components/ui/comparison-table'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import CybersecurityIcon from '@/components/icons/cybersecurity-icon'
import { cyberalps } from '@/lib/content/it/cyberalps'

export const metadata: Metadata = {
  title: cyberalps.seo.title,
  description: cyberalps.seo.description,
}

/**
 * CyberAlps (5.5): tema chiaro intenzionale — registro "lab/clean"
 * in rottura con il resto del sito scuro. Tono rassicurante.
 */
export default function CyberAlpsPage() {
  return (
    <div data-service="cyberalps" data-theme="light">
      {/* Hero */}
      <Section className="pt-36 md:pt-44">
        <div className="grid items-center gap-10 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <Reveal>
              <p className="text-small font-medium uppercase tracking-[0.25em] text-bg-dark/60">
                {cyberalps.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="h1-main mt-6">{cyberalps.h1}</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-base mt-8 max-w-2xl opacity-80">{cyberalps.subtitle}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/contatti?servizio=cyberalps" variant="solid-dark">
                  Richiedi un assessment
                </Button>
                <Button href="#confronto" variant="ghost-dark">
                  Vedi il confronto
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="xl:col-span-5">
            <div
              className="flex min-h-[16rem] items-center justify-center rounded-3xl p-8 md:min-h-[20rem]"
              style={{ backgroundColor: 'var(--support-blue)' }}
            >
              <div className="w-full max-w-sm">
                <CybersecurityIcon forceInvert={false} />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Approccio */}
      <Section className="pt-4">
        <TitleRow title={cyberalps.approach.heading} text={cyberalps.approach.description} />
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {cyberalps.approach.items.map((item) => (
            <RevealItem key={item.title}>
              <div className="group h-full rounded-3xl border border-bg-dark/10 bg-white/60 p-8 transition-transform duration-300 lg:hover:scale-[1.01]">
                <span
                  aria-hidden="true"
                  className="mb-6 block h-2 w-10 rounded-full bg-bg-dark transition-[width] duration-500 group-hover:w-16"
                />
                <h3 className="h4-main">{item.title}</h3>
                <p className="text-base mt-3 opacity-75">{item.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Percorso in 4 passi */}
      <Section className="pt-4">
        <TitleRow title={cyberalps.path.heading} text={cyberalps.path.description} />
        <RevealGroup className="mt-12 divide-y divide-bg-dark/10">
          {cyberalps.path.steps.map((step) => (
            <RevealItem key={step.label} y={24}>
              <div className="grid gap-x-8 gap-y-2 py-8 md:grid-cols-12 md:items-baseline">
                <p className="h3-main !text-bg-dark/25 md:col-span-2">{step.label}</p>
                <h3 className="h4-main md:col-span-4">{step.title}</h3>
                <p className="text-small leading-relaxed opacity-70 md:col-span-6">{step.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Confronto */}
      <Section id="confronto" className="pt-4">
        <TitleRow title={cyberalps.comparison.heading} text={cyberalps.comparison.description} />
        <Reveal className="mt-10">
          <ComparisonTable rows={cyberalps.comparison.rows} caption={cyberalps.comparison.caption} />
        </Reveal>
      </Section>

      {/* Fiducia */}
      <Section className="py-28 md:py-36">
        <Reveal>
          <p className="h2-main max-w-4xl" style={{ color: 'var(--heading-color)' }}>
            “{cyberalps.trust.statement}”
          </p>
          <p className="text-base mt-8 max-w-2xl opacity-75">{cyberalps.trust.text}</p>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="pb-24 pt-0 md:pb-32">
        <Reveal>
          <div className="rounded-3xl bg-bg-dark p-10 md:p-16">
            <div className="grid items-center gap-8 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <h2 className="h2-main !text-bg-light">{cyberalps.cta.title}</h2>
                <p className="text-base mt-5 max-w-2xl text-text-light">{cyberalps.cta.description}</p>
              </div>
              <div className="flex flex-wrap gap-4 xl:col-span-4 xl:justify-end">
                <Button href="/contatti?servizio=cyberalps">Richiedi un assessment</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}
