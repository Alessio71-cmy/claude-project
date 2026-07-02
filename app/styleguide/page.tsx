import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, ServiceCard } from '@/components/ui/card'
import { ComparisonTable } from '@/components/ui/comparison-table'
import { AudioPlayer } from '@/components/ui/audio-player'
import { TitleRow } from '@/components/ui/title-row'
import { Section } from '@/components/ui/container'
import { serviceMeta } from '@/lib/site'
import { WizardDemo } from './_components/wizard-demo'

export const metadata: Metadata = {
  title: 'Styleguide (interna)',
  robots: { index: false, follow: false },
}

export default function StyleguidePage() {
  return (
    <main className="min-h-screen">
      <Section>
        <TitleRow
          eyebrow="Riferimento interno"
          title="Design system"
          text="Componenti base del rebuild: tipografia, bottoni, card, tabella comparativa, wizard e audio player. Pagina non indicizzata."
        />
      </Section>

      {/* Tipografia */}
      <Section className="pt-0">
        <TitleRow title="Tipografia" lineAbove />
        <div className="mt-12 space-y-6">
          <h1 className="h1-main">H1 — Clash Display 600</h1>
          <h2 className="h2-main">H2 — Titolo di sezione</h2>
          <h3 className="h3-main">H3 — Titolo di card</h3>
          <h4 className="h4-main">H4 — Sottotitolo display</h4>
          <p className="h2-support">Supporto H2 — Roboto 600</p>
          <p className="text-base max-w-prose">
            Testo base — Roboto 400, 20px, interlinea 1.7. Progettiamo infrastrutture di rete per
            aziende e pubbliche amministrazioni del Trentino-Alto Adige.
          </p>
          <p className="text-small opacity-70">Testo small — note, didascalie, metadati.</p>
          <p className="text-stat-display text-primary">98,7%</p>
        </div>
      </Section>

      {/* Bottoni */}
      <Section className="pt-0">
        <TitleRow title="Bottoni" lineAbove />
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="#">Richiedi una consulenza</Button>
          <Button href="#" variant="ghost-light">
            Scopri i servizi
          </Button>
          <Button href="#" variant="ghost-light" withIcon={false}>
            Senza icona
          </Button>
          <Button href="#" size="sm">
            Small
          </Button>
        </div>
        <div className="mt-6 inline-flex flex-wrap items-center gap-4 rounded-2xl bg-bg-light p-6">
          <Button href="#" variant="ghost-dark">
            Su fondo chiaro
          </Button>
          <Button href="#" variant="solid-dark">
            Solid dark
          </Button>
        </div>
      </Section>

      {/* Card */}
      <Section className="pt-0">
        <TitleRow title="Card" lineAbove />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <h3 className="h3-main mb-3">Card base</h3>
            <p className="text-small opacity-80">
              Superficie scura standard per contenuti secondari.
            </p>
          </Card>
          <ServiceCard
            title="Connettività Avanzata"
            description="Fibra dedicata e banda garantita per la continuità operativa."
            href="#"
            background={serviceMeta.connettivita.colorSoft}
            icon={<span className="text-small text-bg-dark/50">[icona animata — Fase 3]</span>}
          />
          <ServiceCard
            title="VoIP & Fonia"
            description="Centralino cloud e numerazioni per la tua azienda."
            href="#"
            background={serviceMeta.voip.colorSoft}
            icon={<span className="text-small text-bg-dark/50">[icona animata — Fase 3]</span>}
          />
        </div>
      </Section>

      {/* Tabella comparativa — tinta per servizio via data-service */}
      <Section className="pt-0" data-service="connettivita">
        <TitleRow
          title="Tabella comparativa"
          text="Tre livelli di giudizio per criterio. La tinta segue il colore del servizio (qui: Connettività → giallo)."
          lineAbove
        />
        <ComparisonTable
          className="mt-12"
          rows={[
            {
              criterion: 'Banda minima garantita',
              note: 'Definita contrattualmente e monitorata, non "fino a".',
              verdict: 'migliore',
            },
            {
              criterion: 'Copertura geografica',
              note: 'Equivalente nelle aree servite dalla dorsale regionale.',
              verdict: 'uguale',
            },
            {
              criterion: 'Prezzo di ingresso',
              note: 'Le offerte consumer di massa partono da soglie più basse.',
              verdict: 'peggiore',
            },
          ]}
          caption="Confronto con le soluzioni tipicamente disponibili in Trentino-Alto Adige. Aggiornato alla data di pubblicazione."
        />
      </Section>

      {/* Wizard */}
      <Section className="pt-0">
        <TitleRow title="Wizard form" lineAbove />
        <div className="mt-12">
          <WizardDemo />
        </div>
      </Section>

      {/* Audio player — tinta Agent AI */}
      <Section className="pt-0" data-service="agent-ai">
        <TitleRow title="Audio player" lineAbove />
        <div className="mt-12 grid max-w-2xl gap-4">
          <AudioPlayer label="Italiano — prenotazione tavolo" sublabel="Voce femminile" />
          <AudioPlayer label="Deutsch — Terminvereinbarung" sublabel="Voce maschile" />
        </div>
      </Section>
    </main>
  )
}
