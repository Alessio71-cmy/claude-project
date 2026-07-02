import Link from 'next/link'
import { Section } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Section className="pt-44">
      <p className="text-small mb-3 font-medium uppercase tracking-[0.2em] text-primary">Errore 404</p>
      <h1 className="h1-main max-w-3xl">Questa pagina non esiste.</h1>
      <p className="text-base mt-6 max-w-xl opacity-75">
        Il collegamento potrebbe essere cambiato con il nuovo sito. Riparti dalla home o scrivici:
        ti indirizziamo noi.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/">Torna alla home</Button>
        <Button href="/contatti" variant="ghost-light">
          Contattaci
        </Button>
      </div>
      <p className="sr-only">
        <Link href="/servizi">Vai ai servizi</Link>
      </p>
    </Section>
  )
}
