import type { Metadata } from 'next'
import { Section } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { TitleRow } from '@/components/ui/title-row'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import IdentityIcon from '@/components/icons/identity-icon'
import { identity } from '@/lib/content/it/about'

export const metadata: Metadata = {
  title: identity.seo.title,
  description: identity.seo.description,
}

export default function IdentitaPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-36 md:pt-44">
        <div className="grid items-center gap-10 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <Reveal>
              <p className="text-small font-medium uppercase tracking-[0.25em] text-primary">
                {identity.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="h1-main mt-6">{identity.h1}</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-base mt-8 max-w-2xl opacity-80">{identity.subtitle}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="hidden xl:col-span-5 xl:block">
            <div className="flex min-h-[18rem] items-center justify-center rounded-3xl bg-bg-surface p-10">
              <div className="w-full max-w-sm">
                <IdentityIcon animate />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Manifesto */}
      <Section className="py-28 md:py-36">
        <Reveal>
          <p className="text-small mb-8 font-medium uppercase tracking-[0.25em] text-primary">
            {identity.manifesto.eyebrow}
          </p>
          <p className="h2-main max-w-5xl" style={{ color: 'var(--heading-color)' }}>
            “{identity.manifesto.statement}”
          </p>
          <p className="text-base mt-8 max-w-2xl opacity-75">{identity.manifesto.text}</p>
        </Reveal>
      </Section>

      {/* Tre pilastri */}
      <Section className="pt-0">
        <TitleRow title={identity.pillars.heading} text={identity.pillars.description} />
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {identity.pillars.items.map((item, i) => (
            <RevealItem key={item.title}>
              <div className="flex h-full flex-col rounded-3xl bg-bg-surface p-8">
                <p className="text-stat-display text-primary/60">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="h4-main mt-8">{item.title}</h3>
                <p className="text-small mt-3 leading-relaxed opacity-75">{item.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Visione */}
      <Section>
        <Reveal>
          <div className="rounded-3xl p-10 md:p-16" style={{ backgroundColor: 'var(--menu-accent)' }}>
            <p className="text-small font-medium uppercase tracking-[0.25em] text-bg-dark/75">
              {identity.vision.eyebrow}
            </p>
            <h2 className="h2-main mt-6 max-w-4xl !text-bg-dark">{identity.vision.title}</h2>
            <p className="text-base mt-6 max-w-2xl text-bg-dark/80">{identity.vision.text}</p>
          </div>
        </Reveal>
      </Section>

      {/* Libertà contrattuale */}
      <Section className="pt-4">
        <TitleRow title={identity.freedom.heading} text={identity.freedom.description} />
        <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {identity.freedom.items.map((item) => (
            <RevealItem key={item.title} className="border-t border-current/20 pt-6">
              <h3 className="h4-main">{item.title}</h3>
              <p className="text-base mt-3 opacity-75">{item.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Montagna come laboratorio */}
      <Section>
        <Reveal>
          <p className="text-small mb-6 font-medium uppercase tracking-[0.25em] text-primary">
            {identity.mountain.eyebrow}
          </p>
          <h2 className="h2-main max-w-4xl">{identity.mountain.title}</h2>
          <p className="text-base mt-8 max-w-2xl opacity-75">{identity.mountain.text}</p>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3">
          {identity.mountain.items.map((item) => (
            <RevealItem key={item.title} className="border-t border-current/20 pt-6">
              <h3 className="h4-main">{item.title}</h3>
              <p className="text-small mt-3 leading-relaxed opacity-75">{item.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* CTA */}
      <Section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="h2-main">{identity.cta.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base mt-6 opacity-75">{identity.cta.description}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/about/case-study">Guarda i case study</Button>
              <Button href="/contatti" variant="ghost-light">
                Richiedi una consulenza
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
