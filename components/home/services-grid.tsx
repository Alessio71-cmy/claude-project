import { TitleRow } from '@/components/ui/title-row'
import { ServiceCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/container'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { serviceIcons } from '@/components/icons'
import { serviceMeta } from '@/lib/site'
import { services } from '@/lib/content/it/home'

/**
 * Panoramica servizi: griglia asimmetrica delle 5 card con colore e
 * animazione dedicati (layout ripreso da ashen: 5+7 / 4+4+4).
 */
export function ServicesGrid() {
  const cards = services.cards.map((card) => {
    const meta = serviceMeta[card.key]
    const Icon = serviceIcons[card.key]
    return { ...card, meta, Icon }
  })

  const spans = [
    'xl:col-span-5',
    'xl:col-span-7',
    'xl:col-span-4',
    'xl:col-span-4',
    'xl:col-span-4',
  ]

  return (
    <Section id="servizi">
      <TitleRow eyebrow={services.eyebrow} title={services.title} text={services.description} />

      <RevealGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
        {cards.map(({ key, description, meta, Icon }, i) => (
          <RevealItem key={key} className={spans[i]}>
            <ServiceCard
              title={meta.label}
              description={description}
              href={meta.href}
              background={meta.colorSoft}
              icon={<Icon />}
              className="h-full"
            />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-12">
        <Button href={services.cta.href}>{services.cta.label}</Button>
      </div>
    </Section>
  )
}
