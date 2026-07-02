import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, ServiceCard } from '@/components/ui/card'
import { ComparisonTable } from '@/components/ui/comparison-table'
import { AudioPlayer } from '@/components/ui/audio-player'
import { TitleRow } from '@/components/ui/title-row'
import { Section } from '@/components/ui/container'
import { serviceMeta, type ServiceKey } from '@/lib/site'
import { serviceIcons } from '@/components/icons'
import { ParticlesBackground } from '@/components/motion/particles-background'
import { AnimatedCounter } from '@/components/motion/animated-counter'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { HotspotFrame } from '@/components/motion/hotspot'
import { PinnedSteps } from '@/components/motion/pinned-steps'
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

      {/* Icone servizi animate (porting da ashen) */}
      <Section className="pt-0">
        <TitleRow
          title="Icone servizi animate"
          text="Porting 1:1 delle animazioni SVG validate su ashen, una per servizio."
          lineAbove
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {(Object.keys(serviceMeta) as ServiceKey[]).map((key) => {
            const Icon = serviceIcons[key]
            return (
              <div
                key={key}
                className="flex min-h-[220px] flex-col rounded-3xl p-6"
                style={{ backgroundColor: serviceMeta[key].colorSoft }}
              >
                <div className="flex flex-1 items-center justify-center overflow-hidden">
                  <Icon />
                </div>
                <p className="text-small mt-4 font-semibold text-bg-dark">{serviceMeta[key].label}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Particelle hero */}
      <Section className="pt-0">
        <TitleRow
          title="Pallini interattivi"
          text="Canvas della hero: repulsione morbida al passaggio del mouse, ritorno elastico, pausa fuori viewport."
          lineAbove
        />
        <div className="relative mt-12 h-[340px] overflow-hidden rounded-3xl border border-current/15">
          <ParticlesBackground />
          <div className="relative z-10 flex h-full items-center justify-center">
            <p className="h3-main text-center">Muovi il mouse qui sopra</p>
          </div>
        </div>
      </Section>

      {/* Contatori animati */}
      <Section className="pt-0">
        <TitleRow title="Contatori animati" lineAbove />
        <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            ['99,9%', 'uptime garantito'],
            ['24/7', 'monitoraggio attivo'],
            ['+120', 'sedi connesse'],
          ].map(([value, label]) => (
            <RevealItem key={label}>
              <p className="text-stat-display text-primary">
                <AnimatedCounter value={value} />
              </p>
              <p className="text-small mt-2 uppercase tracking-[0.15em] opacity-60">{label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Hotspot */}
      <Section className="pt-0" data-service="core-network">
        <TitleRow
          title="Hotspot su schema"
          text="Punti pulsanti nel colore del servizio, popover con dettaglio al click."
          lineAbove
        />
        <div className="mt-12 max-w-3xl">
          <HotspotFrame
            points={[
              { x: 22, y: 38, title: 'Ridondanza', description: 'Doppia dorsale indipendente: il traffico non si ferma se un percorso cade.' },
              { x: 58, y: 62, title: 'Routing BGP', description: 'Annunci di rete gestiti direttamente, con failover automatico.' },
              { x: 82, y: 30, title: 'Peering locale', description: 'Interconnessione diretta con gli operatori del territorio.' },
            ]}
          >
            <div className="flex h-72 items-center justify-center rounded-3xl bg-bg-surface">
              <p className="text-small opacity-50">[schema di rete — placeholder]</p>
            </div>
          </HotspotFrame>
        </div>
      </Section>

      {/* Pinned steps */}
      <Section className="pt-0" data-service="connettivita">
        <TitleRow
          title="Sezione pinned scroll-driven"
          text="Il pannello resta fermo, lo scroll fa avanzare gli step. Su mobile degrada a lista."
          lineAbove
        />
      </Section>
      <div data-service="connettivita" className="mx-auto w-full max-w-screen-2xl px-5 md:px-10">
        <PinnedSteps
          steps={[
            { label: '01 — Analisi', title: 'Ascoltiamo prima di progettare', text: 'Sopralluogo e analisi del contesto: ogni infrastruttura parte dai vincoli reali del territorio.', visual: <div className="flex h-64 items-center justify-center rounded-3xl bg-bg-surface"><p className="text-small opacity-50">[visual 1]</p></div> },
            { label: '02 — Progetto', title: 'Architettura su misura', text: 'Dimensioniamo banda, ridondanza e copertura sul flusso di lavoro effettivo, non su un listino.', visual: <div className="flex h-64 items-center justify-center rounded-3xl bg-bg-surface"><p className="text-small opacity-50">[visual 2]</p></div> },
            { label: '03 — Attivazione', title: 'Operativi senza interruzioni', text: 'Migrazione pianificata e verificata: la continuità operativa resta il vincolo di progetto.', visual: <div className="flex h-64 items-center justify-center rounded-3xl bg-bg-surface"><p className="text-small opacity-50">[visual 3]</p></div> },
          ]}
        />
      </div>
    </main>
  )
}
