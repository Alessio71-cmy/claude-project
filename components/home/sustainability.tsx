import { Section } from '@/components/ui/container'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { ArrowUpRight } from '@/components/ui/icons'
import { sustainability } from '@/lib/content/it/home'

/** Sostenibilità / foresta aziendale Tree-Nation (5.1.6). */
export function Sustainability() {
  return (
    <Section id="sostenibilita">
      <Reveal>
        <div className="rounded-3xl p-8 md:p-14" style={{ backgroundColor: '#d7f5dc' }}>
          <div className="grid gap-10 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <p className="text-small font-medium uppercase tracking-[0.25em] text-bg-dark/75">
                {sustainability.eyebrow}
              </p>
              <h2 className="h2-main mt-5 !text-bg-dark">{sustainability.title}</h2>
              <p className="text-base mt-6 max-w-xl text-bg-dark/80">{sustainability.description}</p>
              <a
                href={sustainability.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--solid-dark mt-10"
              >
                {sustainability.cta.label}
                <span className="button__icon">
                  <ArrowUpRight />
                </span>
              </a>
            </div>

            <RevealGroup className="grid content-center gap-8 xl:col-span-4 xl:col-start-9">
              {sustainability.stats.map((stat) => (
                <RevealItem key={stat.label} className="border-t border-bg-dark/15 pt-5">
                  <p className="h3-main !text-bg-dark">{stat.value}</p>
                  <p className="text-small mt-1 text-bg-dark/80">{stat.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
