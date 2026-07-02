import type { ServiceKey } from '@/lib/site'

/**
 * Contenuti home (sezione 5.1 del brief).
 * Base: testi reali del sito ashen, alleggeriti e rivisti per SEO locale.
 */

export const hero = {
  eyebrow: 'Telecomunicazioni in Trentino-Alto Adige',
  // Headline forte in Clash Display; il posizionamento emerge, non si dichiara.
  title: 'La rete che fa correre il tuo business.',
  subtitle:
    'Infrastrutture digitali su misura per aziende e pubbliche amministrazioni: connettività, fonia, IoT e reti progettate sul territorio, con standard da grande operatore.',
  primaryCta: { label: 'Richiedi una consulenza', href: '/contatti' },
  secondaryCta: { label: 'Esplora i servizi', href: '/servizi' },
  /** Colonna destra: card chiara con badge live e mini-CTA (layout ashen). */
  card: {
    badge: 'Rete monitorata 24/7',
    title: 'La soluzione giusta in trenta minuti',
    text: 'Prenota una call con un tecnico — non un commerciale. Analizziamo la tua esigenza e usciamo dalla chiamata con una proposta concreta.',
    cta: { label: 'Prenota una call', href: '/contatti#calendly' },
  },
}

export const partners = {
  label: 'Tecnologie e partner che fanno la differenza',
  items: [
    { name: 'Cambium Networks', logo: '/partners/cambium-networks.png' },
    { name: 'Eolo', logo: '/partners/eolo.png' },
    { name: 'Fastweb', logo: '/partners/fastweb.png' },
    { name: 'Fiber Telecom', logo: '/partners/fiber-telecom.png' },
    { name: 'FiberCop', logo: '/partners/fibercop.png' },
    { name: 'Fiber Connect', logo: '/partners/fiber-connect.png' },
    { name: 'GL.iNet', logo: '/partners/gl-inet.png' },
    { name: 'Infranet', logo: '/partners/infranet.png' },
    { name: 'MikroTik', logo: '/partners/mikrotik.png' },
    { name: 'Nextmedia', logo: '/partners/nextmedia.png' },
    { name: 'Open Fiber', logo: '/partners/open-fiber.png' },
    { name: 'Opnet', logo: '/partners/opnet.png' },
    { name: 'Proxima Cloud', logo: '/partners/proxima-cloud.png' },
    { name: 'Sicetelecom', logo: '/partners/sicetelecom.png' },
    { name: 'Teltonika', logo: '/partners/teltonika.png' },
  ],
}

export const services = {
  eyebrow: 'Servizi',
  title: 'Standard superiori, senza compromessi',
  description:
    'Progettiamo infrastrutture così performanti da rendere superflua ogni clausola vincolante: la libertà di scegliere la nostra efficienza, ogni giorno.',
  cards: [
    {
      key: 'iot' as ServiceKey,
      description: 'Sensori, reti e piattaforme per dispositivi e sistemi distribuiti.',
    },
    {
      key: 'connettivita' as ServiceKey,
      description: 'Soluzioni condivise o dedicate con velocità fino a 10 Gbps.',
    },
    {
      key: 'voip' as ServiceKey,
      description: 'Centralino cloud, SIP Trunk e numerazioni per la tua azienda.',
    },
    {
      key: 'core-network' as ServiceKey,
      description: 'Architettura L3 avanzata per la massima flessibilità di gestione.',
    },
    {
      key: 'wireless' as ServiceKey,
      description: 'Connessioni stabili e veloci in ogni ambiente, anche dove la fibra non arriva.',
    },
  ],
  cta: { label: 'Scopri tutti i servizi', href: '/servizi' },
}

export const stats = {
  eyebrow: 'Numeri',
  title: 'Eccellenza operativa, misurabile',
  description:
    'La competitività di un’impresa dipende dalla stabilità della sua infrastruttura digitale: rete resiliente, monitoraggio costante, assistenza che risponde.',
  boxes: [
    { value: '10', suffix: ' Gbps', label: 'di velocità', text: 'Banda ultraveloce per operazioni mission-critical.' },
    { value: '100%', suffix: '', label: 'fibra dedicata', text: 'Connessione esclusiva, prestazioni costanti.' },
    { value: '0€', suffix: '', label: 'costi di uscita', text: 'Massima libertà contrattuale, senza penali.' },
    { value: '24/7', suffix: '', label: 'assistenza locale', text: 'Team tecnico con sedi a Trento e Bolzano.' },
  ],
}

export const method = {
  eyebrow: 'Come lavoriamo',
  title: 'Un metodo, quattro passaggi',
  description:
    'Dalla prima analisi al supporto continuativo: ogni progetto segue un percorso controllato, pensato per non fermare mai la tua operatività.',
  steps: [
    {
      label: '01 — Audit',
      title: 'Analisi strategica',
      text: 'Due diligence tecnica del comparto IT: scalabilità della rete, sicurezza perimetrale, efficienza dei fornitori attuali. Dati certi per decidere.',
      icon: 'audit',
    },
    {
      label: '02 — Progetto',
      title: 'Infrastruttura su misura',
      text: 'Circuiti dedicati FTTH/FTTO e instradamento ottimizzato: colleghiamo la tua sede agli hub di interscambio con il minor numero di salti possibile.',
      icon: 'access',
    },
    {
      label: '03 — Protezione',
      title: 'Sicurezza gestita',
      text: 'Firewall next-generation e monitoraggio continuo direttamente sul gateway di accesso: il traffico nocivo si ferma prima di entrare in azienda.',
      icon: 'security',
    },
    {
      label: '04 — Transizione',
      title: 'Attivazione senza interruzioni',
      text: 'Doppio binario: la vecchia connessione resta attiva finché la nuova non è collaudata. Poi, accesso diretto ai tecnici, senza filtri commerciali.',
      icon: 'transfer',
    },
  ],
}

export const agentAiBox = {
  eyebrow: 'Novità',
  badge: 'Beta',
  title: 'Il tuo agente vocale AI che non dorme mai',
  description:
    'Risponde alle chiamate, parla con i tuoi clienti, fissa appuntamenti e invia preventivi — in più lingue, con naturalezza. Ascolta la demo.',
  cta: { label: 'Scopri Agent AI', href: '/agent-ai' },
}

export const sustainability = {
  eyebrow: 'Sostenibilità',
  title: 'Una foresta che cresce con la rete',
  description:
    'Attraverso la foresta aziendale KonnectAlps su Tree-Nation, ogni progetto contribuisce alla compensazione di CO₂ in modo tracciabile e certificato. Un impegno concreto per il territorio alpino, non uno slogan.',
  stats: [
    { value: 'CO₂', label: 'compensata e certificata' },
    { value: '100%', label: 'trasparenza sui progetti' },
    { value: '+1', label: 'albero a ogni nuova attivazione' },
  ],
  cta: {
    label: 'Visita la nostra foresta',
    href: 'https://tree-nation.com/it/profilo/impatto/konnectalps',
  },
}

export const finalCta = {
  title: 'Progettiamo la tua infrastruttura',
  description:
    'Ogni azienda ha sfide uniche. Raccontaci le tue esigenze: le trasformiamo in un progetto di connettività concreto, dimensionato sul tuo modo di lavorare.',
  primaryCta: { label: 'Richiedi una consulenza', href: '/contatti' },
  secondaryCta: { label: 'Prenota una call', href: '/contatti#calendly' },
}
