import { Section } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { TitleRow } from '@/components/ui/title-row'
import { ComparisonTable } from '@/components/ui/comparison-table'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { serviceIcons } from '@/components/icons'
import { serviceMeta } from '@/lib/site'
import type { ServiceContent } from '@/lib/content/it/services'

/**
 * Template modulare delle pagine servizio (sezione 5.3):
 * hero col colore dedicato → caratteristiche → specifiche tecniche →
 * tabella comparativa → potenzialità → CTA verso contatti.
 */
export function ServicePage({ content }: { content: ServiceContent }) {
  const meta = serviceMeta[content.key]
  const Icon = serviceIcons[content.key]

  return (
    <div data-service={content.key}>
      {/* Hero di servizio */}
      <Section className="pt-36 md:pt-44">
        <div className="grid items-center gap-10 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <Reveal>
              <p
                className="text-small font-medium uppercase tracking-[0.25em]"
                style={{ color: 'var(--service-color)' }}
              >
                {content.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="h1-main mt-6">{content.h1}</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-base mt-8 max-w-2xl opacity-80">{content.subtitle}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={`/contatti?servizio=${content.key}`}>Richiedi una consulenza</Button>
                <Button href="#confronto" variant="ghost-light">
                  Vedi il confronto
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="xl:col-span-5">
            <div
              className="flex min-h-[16rem] items-center justify-center rounded-3xl p-8 md:min-h-[20rem]"
              style={{ backgroundColor: meta.colorSoft }}
            >
              <div className="w-full max-w-sm">
                <Icon />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Caratteristiche */}
      <Section className="pt-4">
        <TitleRow title={content.features.heading} text={content.features.description} />
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {content.features.items.map((item) => (
            <RevealItem key={item.title}>
              <div className="group h-full rounded-3xl bg-bg-surface p-8 transition-transform duration-300 lg:hover:scale-[1.01]">
                <span
                  aria-hidden="true"
                  className="mb-6 block h-2 w-10 rounded-full transition-[width] duration-500 group-hover:w-16"
                  style={{ backgroundColor: 'var(--service-color)' }}
                />
                <h3 className="h4-main">{item.title}</h3>
                <p className="text-base mt-3 opacity-75">{item.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Specifiche tecniche */}
      {content.tech && (
        <Section className="pt-4">
          <TitleRow title={content.tech.heading} text={content.tech.description} />
          <RevealGroup className="mt-10 divide-y divide-current/15">
            {content.tech.specs.map((spec) => (
              <RevealItem key={spec.name} y={24}>
                <div className="grid gap-x-6 gap-y-2 py-7 md:grid-cols-12 md:items-baseline">
                  <h3 className="h3-support md:col-span-3">{spec.name}</h3>
                  <p
                    className="text-small font-semibold uppercase tracking-wide md:col-span-3"
                    style={{ color: 'var(--service-color)' }}
                  >
                    {spec.value}
                  </p>
                  <p className="text-small leading-relaxed opacity-70 md:col-span-6">{spec.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Tabella comparativa (obbligatoria) */}
      <Section id="confronto" className="pt-4">
        <TitleRow title={content.comparison.heading} text={content.comparison.description} />
        <Reveal className="mt-10">
          <ComparisonTable rows={content.comparison.rows} caption={content.comparison.caption} />
        </Reveal>
      </Section>

      {/* Potenzialità */}
      <Section className="pt-4">
        <Reveal>
          <p
            className="text-small mb-6 font-medium uppercase tracking-[0.25em]"
            style={{ color: 'var(--service-color)' }}
          >
            {content.potential.heading}
          </p>
          <p className="h2-main max-w-4xl" style={{ color: 'var(--heading-color)' }}>
            {content.potential.statement}
          </p>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3">
          {content.potential.points.map((point) => (
            <RevealItem key={point.title} className="border-t border-current/20 pt-6">
              <h3 className="h4-main">{point.title}</h3>
              <p className="text-small mt-3 leading-relaxed opacity-70">{point.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* CTA */}
      <Section className="py-24 md:py-32">
        <Reveal>
          <div
            className="rounded-3xl p-10 text-bg-dark md:p-16"
            style={{ backgroundColor: meta.colorSoft }}
          >
            <div className="grid items-center gap-8 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <h2 className="h2-main !text-bg-dark">{content.cta.title}</h2>
                <p className="text-base mt-5 max-w-2xl text-bg-dark/80">{content.cta.description}</p>
              </div>
              <div className="flex flex-wrap gap-4 xl:col-span-4 xl:justify-end">
                <Button href={`/contatti?servizio=${content.key}`} variant="solid-dark">
                  Richiedi una consulenza
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}
