import type { ServiceContent } from './types'

export const connettivita: ServiceContent = {
  key: 'connettivita',
  slug: 'connettivita-avanzata',
  eyebrow: 'Connettività Avanzata',
  h1: 'Connettività enterprise: potenza e stabilità',
  subtitle:
    'Infrastrutture di rete ad alte prestazioni per garantire continuità operativa e massima affidabilità. La tua azienda sempre connessa, in ogni valle del Trentino-Alto Adige.',
  seo: {
    title: 'Connettività Avanzata — Fibra dedicata e FWA in Trentino-Alto Adige',
    description:
      'Fibra dedicata fino a 100 Gbps, FTTH, FWA e accessi radio dedicati per aziende e PA in Trentino-Alto Adige. Banda minima garantita, monitoraggio e assistenza locale.',
  },

  features: {
    heading: 'Le fondamenta della tua connettività',
    description:
      'Ogni aspetto del servizio è pensato per massimizzare prestazioni e sicurezza: dalla banda garantita al supporto dedicato, una soluzione completa per la tua azienda.',
    items: [
      {
        title: 'Prestazioni al massimo',
        text: 'Portante garantita fino a 10 Gbps, con possibilità di scalare rapidamente. Velocità costante per supportare le operazioni più esigenti.',
      },
      {
        title: 'Continuità senza interruzioni',
        text: 'Collegamenti alternativi e failover automatico per restare operativi anche in caso di guasto. Resilienza integrata nell’architettura di rete.',
      },
      {
        title: 'Controllo totale',
        text: 'Dashboard live e alert proattivi per intervenire subito su ogni anomalia, con visibilità completa sullo stato dell’infrastruttura.',
      },
      {
        title: 'Assistenza esperta',
        text: 'Specialisti raggiungibili via ticket, telefono o chat. Ti affianchiamo dalla progettazione all’attivazione, fino all’evoluzione del servizio.',
      },
    ],
  },

  tech: {
    heading: 'Architettura del servizio: prestazioni senza compromessi',
    description:
      'Ogni progetto parte da una mappatura meticolosa delle infrastrutture disponibili, per integrare i sistemi locali con i nodi di interscambio nazionali senza colli di bottiglia.',
    specs: [
      {
        name: 'Fibra dedicata',
        value: 'FTTO fino a 100 Gbps simmetrici',
        text: 'Banda ultra-larga dedicata per imprese strutturate e pubbliche amministrazioni: applicazioni data-intensive, cloud e comunicazione digitale.',
      },
      {
        name: 'Fibra condivisa',
        value: 'FTTH fino a 10 / 2,5 Gbps',
        text: 'Banda larga con accesso prioritario per le imprese che cercano prestazioni affidabili per far crescere il proprio business.',
      },
      {
        name: 'Fibra via radio',
        value: 'FWA fino a 1 Gbps / 350 Mbps',
        text: 'Connessione affidabile e flessibile con installazione minima: la risposta concreta per le aree più remote.',
      },
      {
        name: 'Accessi radio dedicati',
        value: 'FTTW fino a 1 Gbps simmetrico',
        text: 'Frequenza dedicata e simmetrica con installazione progettata su misura: il massimo che un ponte radio può offrire.',
      },
      {
        name: 'Mobile',
        value: '5G/4G+ fino a 500 / 50 Mbps',
        text: 'Antenne interne o esterne e SIM anche su doppio operatore: ideale per continuità internet, videosorveglianza e IoT.',
      },
    ],
  },

  comparison: {
    heading: 'Come ci confrontiamo',
    description:
      'Un confronto onesto con le offerte di connettività tipicamente disponibili sul territorio: dove facciamo la differenza e dove siamo alla pari.',
    rows: [
      {
        criterion: 'Banda minima garantita',
        note: 'Definita contrattualmente e monitorata, non un valore "fino a" teorico.',
        verdict: 'migliore',
      },
      {
        criterion: 'Simmetria upload/download',
        note: 'Circuiti dedicati simmetrici anche via radio, dove le offerte standard privilegiano il solo download.',
        verdict: 'migliore',
      },
      {
        criterion: 'Copertura nelle aree servite da FTTH',
        note: 'Nei centri già raggiunti dalla fibra pubblica le prestazioni di base si equivalgono.',
        verdict: 'uguale',
      },
      {
        criterion: 'Copertura in valli e aree remote',
        note: 'FWA e accessi radio dedicati progettati sull’orografia alpina, dove le offerte generiche si fermano.',
        verdict: 'migliore',
      },
      {
        criterion: 'Prezzo di ingresso',
        note: 'Le offerte consumer di massa partono da soglie più basse: se basta una connessione best-effort, costano meno.',
        verdict: 'peggiore',
      },
      {
        criterion: 'Assistenza tecnica',
        note: 'Interlocutore unico e presidio in loco a Trento e Bolzano, senza call center intermedi.',
        verdict: 'migliore',
      },
    ],
    caption:
      'Confronto con le soluzioni di connettività tipicamente disponibili in Trentino-Alto Adige, aggiornato alla data di pubblicazione. Le valutazioni dipendono dal profilo d’uso: parliamone.',
  },

  potential: {
    heading: 'Potenzialità',
    statement:
      'Nata per rispondere alle esigenze del territorio, l’infrastruttura regge i carichi di lavoro di chi opera sui mercati globali.',
    points: [
      {
        title: '100 Gbps di portante',
        text: 'La fibra dedicata FTTO scala fino a 100 Gbps simmetrici: capacità per data center, produzione multimediale e ricerca.',
      },
      {
        title: 'Failover multi-tecnologia',
        text: 'Fibra, radio e mobile combinabili in architetture ridondate con commutazione automatica: continuità anche negli scenari peggiori.',
      },
      {
        title: 'Monitoraggio proattivo',
        text: 'Telemetria costante sugli apparati di terminazione, gestiti direttamente: le anomalie si risolvono prima che diventino disservizi.',
      },
    ],
  },

  cta: {
    title: 'Dimensioniamo la banda sul tuo lavoro',
    description:
      'Raccontaci come lavora la tua azienda: progettiamo l’accesso giusto tra fibra dedicata, condivisa, radio o mobile — senza vincoli superflui.',
  },

  quickFacts: {
    ideale: 'Aziende e PA che non possono fermarsi',
    tecnologia: 'FTTO · FTTH · FWA · FTTW · 5G',
    puntoForte: 'Banda garantita anche fuori dai centri urbani',
    finoA: '100 Gbps simmetrici',
  },
}
