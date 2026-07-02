import type { Metadata } from 'next'
import { Section } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import CaseStudyIcon from '@/components/icons/case-study-icon'
import { caseStudies } from '@/lib/content/it/about'
import { serviceMeta } from '@/lib/site'

export const metadata: Metadata = {
  title: caseStudies.seo.title,
  description: caseStudies.seo.description,
}

export default function CaseStudyPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-36 md:pt-44">
        <Reveal>
          <p className="text-small font-medium uppercase tracking-[0.25em] text-primary">
            {caseStudies.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="h1-main mt-6 max-w-4xl">{caseStudies.h1}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-base mt-8 max-w-2xl opacity-80">{caseStudies.subtitle}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-16 hidden justify-center overflow-hidden rounded-3xl bg-bg-surface p-10 md:flex">
            <div className="w-full max-w-3xl">
              <CaseStudyIcon animate />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Griglia case study */}
      <Section className="pt-4">
        <RevealGroup className="grid gap-5 md:grid-cols-2">
          {caseStudies.items.map((cs) => (
            <RevealItem key={cs.title}>
              <article className="flex h-full flex-col rounded-3xl bg-bg-surface p-8 transition-transform duration-300 lg:hover:scale-[1.01] md:p-10">
                <p className="text-small font-medium uppercase tracking-[0.2em] opacity-50">
                  {cs.sector}
                </p>
                <h2 className="h3-main mt-4">{cs.title}</h2>
                <p className="text-base mt-4 flex-1 opacity-75">{cs.summary}</p>
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Servizi coinvolti">
                  {cs.services.map((key) => (
                    <li
                      key={key}
                      className="rounded-full px-3 py-1 text-xs font-semibold text-bg-dark"
                      style={{ backgroundColor: serviceMeta[key].color }}
                    >
                      {serviceMeta[key].label}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal>
          <p className="text-small mt-10 max-w-2xl opacity-50">{caseStudies.note}</p>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="h2-main">{caseStudies.cta.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base mt-6 opacity-75">{caseStudies.cta.description}</p>
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
