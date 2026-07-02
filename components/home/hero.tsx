import { Button } from '@/components/ui/button'
import { ParticlesBackground } from '@/components/motion/particles-background'
import { Reveal } from '@/components/motion/reveal'
import { hero } from '@/lib/content/it/home'

/**
 * Hero a due colonne (layout ashen): titolo, sottotitolo e CTA a sinistra;
 * a destra la card chiara con badge live, cerchi animati e mini-CTA.
 * Sfondo a pallini interattivi su tutta la sezione.
 */
export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-stretch gap-6 px-5 pb-16 pt-36 md:px-10 md:pt-44 xl:grid-cols-12 xl:pb-24">
        {/* Colonna sinistra */}
        <div className="flex min-h-[420px] flex-col justify-center py-10 xl:col-span-8 xl:min-h-[520px] xl:pr-10">
          <Reveal>
            <p className="text-small font-medium uppercase tracking-[0.25em] text-primary">
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="h1-main mt-6 max-w-4xl">{hero.title}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="h4-main mt-8 max-w-3xl !font-sans font-normal leading-relaxed opacity-90">
              {hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-12 flex flex-wrap items-center gap-4 md:mt-16">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <Button href={hero.secondaryCta.href} variant="ghost-light">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Colonna destra: card chiara (firma ashen) */}
        <Reveal delay={0.2} className="xl:col-span-4">
          <div className="flex h-full min-h-[460px] flex-col rounded-3xl bg-bg-light p-8">
            <div className="mb-12">
              <span className="text-small inline-flex items-center gap-2.5 rounded-full bg-bg-dark/10 px-5 py-2 font-medium text-bg-dark">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3e8442]" />
                </span>
                {hero.card.badge}
              </span>
            </div>

            {/* Cerchi animati (animazione validata ashen) */}
            <div className="flex flex-1 items-center justify-center px-4 py-8">
              <svg
                width="340"
                height="123"
                viewBox="0 0 340 123"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[280px]"
                aria-hidden="true"
              >
                <circle cx="61" cy="62" r="61" fill="#E1C9FF" fillOpacity="0.4" className="animate-hero-circle-1" />
                <circle cx="130" cy="61" r="61" fill="#E1C9FF" fillOpacity="0.6" className="animate-hero-circle-2" />
                <circle cx="210" cy="61" r="61" fill="#E1C9FF" fillOpacity="0.8" className="animate-hero-circle-3" />
                <circle cx="279" cy="62" r="61" fill="#E1C9FF" className="animate-hero-circle-4" />
              </svg>
            </div>

            <div className="my-8 h-[2px] w-full bg-bg-dark/20" aria-hidden="true" />

            <div className="flex flex-col gap-5">
              <h2 className="h3-main !text-bg-dark">{hero.card.title}</h2>
              <p className="text-small leading-relaxed text-bg-dark/80">{hero.card.text}</p>
              <div className="mt-3">
                <Button href={hero.card.cta.href} variant="solid-dark" size="sm">
                  {hero.card.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
