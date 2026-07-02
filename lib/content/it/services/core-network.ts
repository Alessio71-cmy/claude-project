import type { ServiceContent } from './types'

export const coreNetwork: ServiceContent = {
  key: 'core-network',
  slug: 'core-network',
  eyebrow: 'Core Network',
  h1: 'SD-WAN 2.0: connettività intelligente evoluta',
  subtitle:
    'Un’architettura L3 avanzata che va oltre i limiti delle connessioni tradizionali: la tua rete aziendale gestita con l’intelligenza di chi la costruisce ogni giorno.',
  seo: {
    title: 'Core Network — SD-WAN e architetture di rete L3 per aziende',
    description:
      'SD-WAN 2.0, gestione L3 avanzata e failover multi-connessione per aziende multi-sede in Trentino-Alto Adige: monitoraggio, convergenza istantanea e controllo centralizzato.',
  },

  features: {
    heading: 'La rete come vantaggio competitivo',
    description:
      'Massima affidabilità, costi ridotti e flessibilità totale: la gestione della rete smette di essere un problema e diventa uno strumento.',
    items: [
      {
        title: 'Gestione L3 avanzata',
        text: 'Routing, segmentazione e policy applicate a livello di rete: il controllo resta nelle tue mani, non in quello di un profilo chiuso.',
      },
      {
        title: 'Architettura aperta',
        text: 'Standard aperti e compatibilità con hardware dedicato: nessun vincolo proprietario, ogni componente è sostituibile.',
      },
      {
        title: 'Convergenza istantanea',
        text: 'Failover tra connessioni in tempi impercettibili: una linea cade, la sessione continua — videoconferenze incluse.',
      },
      {
        title: 'Control panel intuitivo',
        text: 'Una dashboard chiara per tutta la rete: stato dei link, traffico per applicazione, alert e configurazioni in pochi click.',
      },
    ],
  },

  tech: {
    heading: 'Quality control di nuova generazione',
    description:
      'Il monitoraggio multi-connessione valuta in continuo latenza, jitter e perdita di pacchetti su ogni percorso disponibile, scegliendo istante per istante il migliore.',
    specs: [
      {
        name: 'Multi-link attivo',
        value: 'Fibra + radio + mobile',
        text: 'Tutte le connessioni disponibili lavorano insieme: banda aggregata quando serve, ridondanza sempre.',
      },
      {
        name: 'Switch istantaneo',
        value: 'Convergenza < 1 s',
        text: 'La commutazione tra percorsi avviene senza interruzione percepibile delle sessioni attive.',
      },
      {
        name: 'QoS per applicazione',
        value: 'Policy granulari',
        text: 'Voce, gestionali e backup classificati e prioritizzati: le applicazioni critiche passano per prime.',
      },
      {
        name: 'Visibilità completa',
        value: 'Telemetria continua',
        text: 'Metriche storiche e in tempo reale per ogni sede e ogni link: le decisioni di rete si basano su dati.',
      },
    ],
  },

  comparison: {
    heading: 'Come ci confrontiamo',
    description:
      'Core Network KonnectAlps rispetto alle connettività multi-sede tradizionali (MPLS di operatore o router con doppia WAN).',
    rows: [
      {
        criterion: 'Controllo e visibilità della rete',
        note: 'Dashboard unica con telemetria per link e applicazione, contro la scatola chiusa dei profili wholesale.',
        verdict: 'migliore',
      },
      {
        criterion: 'Continuità su guasto di linea',
        note: 'Convergenza sotto il secondo con sessioni preservate; il failover dei router dual-WAN interrompe le connessioni attive.',
        verdict: 'migliore',
      },
      {
        criterion: 'Costi rispetto a MPLS',
        note: 'Stessa affidabilità percepita usando accessi Internet standard coordinati: il risparmio è strutturale.',
        verdict: 'migliore',
      },
      {
        criterion: 'Standard e interoperabilità',
        note: 'Protocolli aperti e hardware di mercato: la compatibilità è la stessa che troveresti altrove.',
        verdict: 'uguale',
      },
      {
        criterion: 'Semplicità per reti mono-sede',
        note: 'Una piccola rete con una sola sede e una sola linea non ha bisogno di SD-WAN: sarebbe complessità in più.',
        verdict: 'peggiore',
      },
      {
        criterion: 'Progettazione sul territorio',
        note: 'Conosciamo dorsali, ripetitori e vincoli orografici locali: l’architettura nasce già adattata al contesto.',
        verdict: 'migliore',
      },
    ],
    caption:
      'Confronto con le architetture multi-sede tipicamente proposte in Trentino-Alto Adige. Se la tua rete è semplice, te lo diciamo: la tecnologia giusta è quella proporzionata al problema.',
  },

  potential: {
    heading: 'Potenzialità',
    statement:
      'La stessa architettura che collega le sedi di valle governa reti distribuite su scala nazionale.',
    points: [
      {
        title: 'Sedi illimitate',
        text: 'Ogni nuova sede si aggancia alla rete esistente con configurazione centralizzata: l’espansione non richiede ridisegni.',
      },
      {
        title: 'Segmentazione enterprise',
        text: 'VLAN, VPN e micro-segmentazione per separare reparti, ospiti e sistemi industriali con policy indipendenti.',
      },
      {
        title: 'SLA misurabili',
        text: 'Metriche contrattuali verificabili dalla dashboard: la qualità promessa coincide con quella osservata.',
      },
    ],
  },

  cta: {
    title: 'Disegniamo la tua rete',
    description:
      'Portaci lo schema attuale — o anche solo l’elenco delle sedi: torniamo con un’architettura misurabile e un piano di migrazione senza interruzioni.',
  },

  quickFacts: {
    ideale: 'Aziende multi-sede e in crescita',
    tecnologia: 'SD-WAN 2.0 · L3 · multi-link',
    puntoForte: 'Failover impercettibile tra connessioni',
    finoA: 'Convergenza sotto il secondo',
  },
}
