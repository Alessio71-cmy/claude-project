import type { ServiceContent } from './types'

export const iot: ServiceContent = {
  key: 'iot',
  slug: 'iot',
  eyebrow: 'IoT — Internet of Things',
  h1: 'Dai voce ai tuoi asset aziendali',
  subtitle:
    'Connettività prioritaria e sicura per sensori e dispositivi distribuiti: i tuoi asset lavorano per te in tempo reale, con controllo centralizzato su ogni dispositivo.',
  seo: {
    title: 'IoT — Reti e sensori per il monitoraggio in Trentino-Alto Adige',
    description:
      'Reti IoT per aziende e comuni in Trentino-Alto Adige: smart metering, monitoraggio idrogeologico, illuminazione pubblica, manutenzione predittiva. SIM multi-operatore e rete privata.',
  },

  features: {
    heading: 'Trasformiamo i dispositivi in una fonte di dati',
    description:
      'Lo smart sensing e l’automazione dei processi sono il sistema nervoso dell’impresa moderna: dati grezzi che diventano decisioni strategiche.',
    items: [
      {
        title: 'Controllo totale',
        text: 'Ogni dispositivo gestito da un’unica interfaccia: stato, consumi e anomalie di tutta la flotta IoT in tempo reale.',
      },
      {
        title: 'Un solo plafond condiviso',
        text: 'Il traffico dati è condiviso tra tutte le SIM: nessun gigabyte sprecato, nessuna sorpresa in fattura.',
      },
      {
        title: 'Connessione dove serve',
        text: 'In cantina, in galleria, dietro un muro di pietra: tecnologie radio e antenne progettate per gli ambienti difficili del territorio alpino.',
      },
      {
        title: 'Traffico su rete privata',
        text: 'I dati dei tuoi dispositivi non transitano mai su Internet pubblico: instradamento in rete privata fino ai tuoi sistemi.',
      },
    ],
  },

  tech: {
    heading: 'Cosa ci costruiamo insieme',
    description:
      'Casi d’uso già operativi tra aziende, PMI e pubbliche amministrazioni del territorio.',
    specs: [
      {
        name: 'Manutenzione predittiva',
        value: 'Aziende e PMI',
        text: 'Sensori su macchinari e impianti: le anomalie si vedono prima del guasto, i fermi macchina si pianificano invece di subirli.',
      },
      {
        name: 'Smart metering',
        value: 'Acqua, gas, energia',
        text: 'Telelettura di contatori e consumi, anche in edifici storici e zone impervie: dati continui senza sopralluoghi.',
      },
      {
        name: 'Monitoraggio idrogeologico',
        value: 'Comuni e PA',
        text: 'Sensoristica ambientale su versanti, corsi d’acqua e infrastrutture: allerte in tempo reale dove il territorio lo richiede.',
      },
      {
        name: 'Città intelligente',
        value: 'Illuminazione, parcheggi, mobilità',
        text: 'Lampioni smart, stalli monitorati e flussi di traffico: costi energetici ridotti e servizi misurabili per i cittadini.',
      },
      {
        name: 'Geolocalizzazione GPS',
        value: 'Flotte e logistica',
        text: 'Posizione e percorsi ottimizzati per mezzi e attrezzature, con report automatici e storici consultabili.',
      },
    ],
  },

  comparison: {
    heading: 'Come ci confrontiamo',
    description:
      'Rete IoT KonnectAlps rispetto alle connettività IoT generiche (SIM consumer o M2M standard) disponibili sul territorio.',
    rows: [
      {
        criterion: 'Copertura in ambienti difficili',
        note: 'Progettazione radio specifica per valli, edifici storici e interrati: dove le SIM generiche restano senza segnale.',
        verdict: 'migliore',
      },
      {
        criterion: 'Priorità e latenza del traffico',
        note: 'Traffico IoT con priorità sulla nostra rete: i dati critici arrivano anche quando la rete pubblica è satura.',
        verdict: 'migliore',
      },
      {
        criterion: 'Sicurezza del trasporto dati',
        note: 'APN privato e instradamento fuori da Internet pubblico, contro il tunnel VPN fai-da-te delle soluzioni standard.',
        verdict: 'migliore',
      },
      {
        criterion: 'Hardware e standard di mercato',
        note: 'Usiamo sensori e protocolli standard (LoRaWAN, NB-IoT, LTE-M): nessun lock-in, stessa compatibilità di tutti.',
        verdict: 'uguale',
      },
      {
        criterion: 'Costo per micro-progetti',
        note: 'Per due o tre sensori senza requisiti di sicurezza, una SIM M2M da listino resta più economica.',
        verdict: 'peggiore',
      },
      {
        criterion: 'Integrazione con i sistemi esistenti',
        note: 'Portiamo i dati dentro i tuoi gestionali e piattaforme, con progettazione e assistenza in loco.',
        verdict: 'migliore',
      },
    ],
    caption:
      'Confronto con le connettività IoT generiche disponibili in Trentino-Alto Adige. Il valore emerge sui progetti strutturati: per esigenze minime, lo diciamo chiaramente, bastano soluzioni da listino.',
  },

  potential: {
    heading: 'Potenzialità',
    statement:
      'Una rete pensata per il monitoraggio ambientale alpino regge, per costruzione, i requisiti dell’industria.',
    points: [
      {
        title: 'Migliaia di endpoint',
        text: 'Architettura che scala da dieci sensori a flotte intere di dispositivi, con gestione centralizzata del ciclo di vita.',
      },
      {
        title: 'Edge computing',
        text: 'Gateway industriali 5G rugged per elaborare i dati vicino alla sorgente: decisioni in millisecondi, non a valle del cloud.',
      },
      {
        title: 'Dual carrier',
        text: 'SIM su doppio operatore con commutazione automatica: la raccolta dati continua anche se una rete mobile cade.',
      },
    ],
  },

  cta: {
    title: 'Partiamo dai tuoi asset',
    description:
      'Un sopralluogo per capire cosa vale la pena misurare, poi un progetto pilota concreto: l’IoT si dimostra sul campo, non sulle slide.',
  },

  quickFacts: {
    ideale: 'Industria, utility, comuni',
    tecnologia: 'LoRaWAN · NB-IoT · 5G · APN privato',
    puntoForte: 'Copertura e sicurezza in ambienti difficili',
    finoA: 'Migliaia di dispositivi gestiti',
  },
}
