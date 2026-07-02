import { Section } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { finalCta } from '@/lib/content/it/home'

/** CTA finale verso contatti (5.1.7). */
export function FinalCta() {
  return (
    <Section id="cta-finale" className="py-28 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="h2-main">{finalCta.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-base mx-auto mt-6 max-w-2xl opacity-75">{finalCta.description}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button href={finalCta.primaryCta.href}>{finalCta.primaryCta.label}</Button>
            <Button href={finalCta.secondaryCta.href} variant="ghost-light">
              {finalCta.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
