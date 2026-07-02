import type { ServiceKey } from '@/lib/site'

/** Identità aziendale (5.4) — registro concettuale/emotivo, base testi reali. */
export const identity = {
  eyebrow: 'La nostra identità',
  h1: 'L’impegno e la passione che ci contraddistinguono',
  subtitle:
    'Traduciamo i nostri valori in azioni concrete: lavoriamo con trasparenza per offrire soluzioni che riflettono chi siamo.',
  seo: {
    title: 'La nostra identità — Principi, direzione, visione',
    description:
      'KonnectAlps: radicamento nel Trentino-Alto Adige e spinta all’innovazione. Integrità, prossimità e visione — i principi che guidano ogni infrastruttura che progettiamo.',
  },

  manifesto: {
    eyebrow: 'Scrivere il cambiamento',
    statement: 'Crediamo che la geografia non debba limitare le ambizioni.',
    text: 'Disegniamo infrastrutture su misura che permettono alle imprese di competere globalmente senza compromessi.',
  },

  pillars: {
    heading: 'Alte prestazioni e valori del territorio',
    description:
      'La nostra eccellenza poggia su tre pilastri — integrità, prossimità e visione. Ogni connessione è un impegno verso la trasparenza assoluta e la vicinanza reale al territorio.',
    items: [
      {
        title: 'Radicati nel territorio',
        text: 'Progettiamo infrastrutture che trasformano le sfide orografiche in opportunità competitive, portando performance di livello metropolitano dove altri vedono solo limiti geografici.',
      },
      {
        title: 'Proiettati al futuro',
        text: 'Collaboriamo con i migliori partner tecnologici globali per portare soluzioni evolute: dal VoIP enterprise al Wi-Fi ad alte prestazioni, fino al Layer 3 avanzato.',
      },
      {
        title: 'Costruiamo partnership',
        text: 'Ogni progetto è una co-creazione: ascoltiamo le vostre ambizioni prima di proporre soluzioni, trasformando requisiti tecnici in vantaggi misurabili.',
      },
    ],
  },

  vision: {
    eyebrow: 'Visione digitale concreta',
    title: 'Costruiamo oggi l’infrastruttura digitale che guiderà il vostro futuro',
    text: 'Intelligenza artificiale, edge computing, IoT industriale e 5G stanno ridefinendo cosa significa “essere connessi”. Non ci limitiamo a osservare questi cambiamenti: li anticipiamo, li integriamo e li rendiamo accessibili al tessuto imprenditoriale del territorio.',
  },

  freedom: {
    heading: 'L’efficienza come unico vincolo',
    description:
      'Non crediamo nei contratti che imprigionano, ma nei risultati che convincono: la scelta radicale di eliminare penali e barriere, puntando tutto su una qualità che parla da sé.',
    items: [
      {
        title: 'Libertà contrattuale assoluta',
        text: 'Disattivi quando vuoi, senza penali né costi nascosti. La fedeltà si conquista con il servizio, non con i vincoli legali.',
      },
      {
        title: 'Soluzioni su misura',
        text: 'Dalla fibra condivisa alla dedicata 10 Gbps, dai centralini cloud alle reti L3 avanzate: ascoltiamo, poi realizziamo.',
      },
      {
        title: 'Affidabilità operativa',
        text: 'Monitoraggio continuo, assistenza dedicata, interventi rapidi. La tua connessione è critica? Lo sappiamo, e agiamo di conseguenza.',
      },
      {
        title: 'Visione sostenibile',
        text: 'Infrastrutture pensate per durare, fornitori responsabili, impegno verso il territorio: innovazione con rispetto ambientale.',
      },
    ],
  },

  mountain: {
    eyebrow: 'Prospettive d’avanguardia',
    title: 'Dove altri vedono limiti, noi vediamo opportunità',
    text: 'Il territorio non è un ostacolo da superare: è il nostro laboratorio di eccellenza. Portare connettività enterprise a 2.000 metri richiede conoscenza profonda dei luoghi, partnership locali e la capacità di trasformare i vincoli geografici in vantaggi competitivi.',
    items: [
      {
        title: 'Presenza capillare',
        text: 'Presidio diretto del Trentino-Alto Adige per una gestione capillare dei nodi di rete.',
      },
      {
        title: 'Interventi rapidi',
        text: 'Tempistiche di ripristino accelerate grazie alla dislocazione strategica sul territorio.',
      },
      {
        title: 'Expertise montana',
        text: 'Sistemi resilienti ingegnerizzati per funzionare in tutte le condizioni, a ogni quota.',
      },
    ],
  },

  cta: {
    title: 'I principi si dimostrano nei progetti',
    description: 'Guarda cosa abbiamo costruito con le realtà del territorio — poi parliamo del tuo.',
  },
}

/** Case study (5.4) — struttura pronta per contenuti completi futuri. */
export interface CaseStudy {
  title: string
  sector: string
  summary: string
  services: ServiceKey[]
}

export const caseStudies = {
  eyebrow: 'Case study',
  h1: 'Storie che ispirano, connessioni che crescono',
  subtitle:
    'I progetti raccontano il nostro lavoro meglio di qualsiasi promessa: criticità infrastrutturali trasformate in vantaggi competitivi misurabili.',
  seo: {
    title: 'Case study — Progetti realizzati sul territorio',
    description:
      'Progetti KonnectAlps in Trentino-Alto Adige: connettività per il retail alimentare in quota, reti industriali ridondate, VoIP per l’hospitality e automazione per le cooperative.',
  },
  items: [
    {
      title: 'Cooperativa Perginese, Pinetana e Cembrana',
      sector: 'Retail alimentare',
      summary:
        'Connettività in fibra e soluzioni di rete personalizzate per circa 30 punti vendita, anche in aree montane difficili da raggiungere.',
      services: ['connettivita', 'core-network', 'wireless'],
    },
    {
      title: 'Lamafer Srl',
      sector: 'Settore industriale',
      summary:
        'Rinnovo completo dell’infrastruttura di connettività e fibra: una rete performante, ridondata e scalabile a supporto della produzione.',
      services: ['core-network', 'voip'],
    },
    {
      title: 'Craffonara Srl',
      sector: 'Turismo e hospitality',
      summary:
        'Fibra ridondata e VoIP integrati con gli impianti esistenti: continuità operativa, supporto a eventi di alto profilo e infrastruttura scalabile per ospiti e gestione.',
      services: ['connettivita', 'core-network', 'voip'],
    },
    {
      title: 'SAIT Società Cooperativa',
      sector: 'Cooperazione',
      summary:
        'Sistema VoIP integrato con OCR e speech-to-text: trascrizione automatica delle chiamate dall’app InCooperazione, con più efficienza e migliore qualità dei dati.',
      services: ['voip', 'agent-ai'],
    },
  ] satisfies CaseStudy[],
  note: 'Ogni progetto diventerà un approfondimento completo, con numeri e architetture. Vuoi vederlo prima? Chiedici un referral diretto.',
  cta: {
    title: 'Il prossimo case study può essere il tuo',
    description:
      'Raccontaci la tua sfida infrastrutturale: la trasformiamo in un progetto misurabile, come abbiamo fatto per queste realtà.',
  },
}
