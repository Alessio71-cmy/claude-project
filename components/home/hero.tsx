import { Button } from '@/components/ui/button'
import { ParticlesBackground } from '@/components/motion/particles-background'
import { Reveal } from '@/components/motion/reveal'
import { hero } from '@/lib/content/it/home'

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-5 py-32 md:px-10 md:text-center">
        <Reveal>
          <p className="text-small font-medium uppercase tracking-[0.25em] text-primary">
            {hero.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="h1-main mx-auto mt-6 max-w-5xl">
            {hero.title[0]}
            <br />
            {hero.title[1]}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-base mx-auto mt-8 max-w-2xl opacity-80">{hero.subtitle}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-col flex-wrap items-start gap-4 md:flex-row md:items-center md:justify-center">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="ghost-light">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Indicatore di scroll */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="h-10 w-[1.5px] overflow-hidden rounded-full bg-bg-light/20">
          <div className="h-1/2 w-full animate-scroll-hint rounded-full bg-primary" />
        </div>
      </div>
    </section>
  )
}
