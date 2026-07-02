import { Section } from '@/components/ui/container'
import { TitleRow } from '@/components/ui/title-row'

/**
 * Segnaposto temporaneo per le pagine in costruzione nelle fasi successive.
 * Da rimuovere man mano che le pagine vengono implementate.
 */
export function PageStub({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <Section className="pt-40">
      <TitleRow as="h1" eyebrow={eyebrow} title={title} text={text} lineAbove={false} />
      <p className="text-small mt-16 opacity-40">Pagina in costruzione — vedi piano di lavoro.</p>
    </Section>
  )
}
