import { TitleRow } from '@/components/ui/title-row'
import { Section } from '@/components/ui/container'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { AnimatedCounter } from '@/components/motion/animated-counter'
import { stats } from '@/lib/content/it/home'

/** Numeri aziendali con contatori animati all'ingresso in viewport (5.1.3). */
export function Stats() {
  return (
    <Section id="numeri">
      <TitleRow eyebrow={stats.eyebrow} title={stats.title} text={stats.description} />

      <RevealGroup className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 xl:grid-cols-4">
        {stats.boxes.map((box) => (
          <RevealItem key={box.label}>
            <p className="text-stat-display text-primary">
              <AnimatedCounter value={box.value} />
              {box.suffix && <span className="text-[0.45em] font-medium">{box.suffix}</span>}
            </p>
            <p className="text-small mt-3 font-semibold uppercase tracking-[0.15em]">{box.label}</p>
            <p className="text-small mt-2 max-w-[16rem] opacity-60">{box.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
