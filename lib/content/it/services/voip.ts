import type { ServiceContent } from './types'

export const voip: ServiceContent = {
  key: 'voip',
  slug: 'voip',
  eyebrow: 'VoIP & Fonia',
  h1: 'Comunicazione VoIP aziendale flessibile',
  subtitle:
    'Centralino cloud, SIP trunk e numerazioni che crescono con la tua azienda. Instradamento intelligente e ridondanza geografica: le comunicazioni non si fermano mai.',
  seo: {
    title: 'VoIP & Fonia — Centralino cloud e SIP Trunk per aziende',
    description:
      'Soluzioni VoIP per aziende e PA in Trentino-Alto Adige: centralino cloud Priamo, SIP trunking, IVR, integrazione CRM, QoS end-to-end e assistenza locale certificata.',
  },

  features: {
    heading: 'Piattaforma VoIP avanzata: qualità e mobilità ovunque',
    description:
      'Libera la telefonia aziendale dai vincoli delle linee tradizionali: scalabilità immediata, costi trasparenti e comunicazioni sempre attive.',
    items: [
      {
        title: 'Qualità cristallina',
        text: 'Codec a banda larga e policy QoS dedicano priorità assoluta al traffico voce: chiamate nitide anche su rete congestionata.',
      },
      {
        title: 'Centralino ovunque',
        text: 'Smartphone, tablet o softphone: ogni membro del team è raggiungibile con il numero aziendale, ovunque si trovi.',
      },
      {
        title: 'Integrato con i tuoi strumenti',
        text: 'Connessione nativa con Salesforce, Zoho, Microsoft Dynamics e piattaforme custom via API: click-to-call, pop-up cliente, reportistica.',
      },
      {
        title: 'Accoglienza professionale',
        text: 'IVR multilivello, code di chiamata e instradamenti per orari e competenze: un’immagine strutturata dal primo squillo.',
      },
    ],
  },

  tech: {
    heading: 'L’ecosistema in pratica',
    description:
      'Un framework che unisce governance centralizzata, efficienza economica misurabile e continuità operativa garantita — per PA, enti locali e aziende.',
    specs: [
      {
        name: 'SIP Trunking professionale',
        value: 'Canali voce su IP',
        text: 'Instradamento intelligente e ridondanza geografica distribuita: le comunicazioni proseguono anche in presenza di guasti di rete.',
      },
      {
        name: 'Centralino cloud Priamo',
        value: 'Virtualizzato o cloud',
        text: 'Gruppi di lavoro, code distribuite, IVR, voicemail e fax via email: tutto gestibile da un’interfaccia intuitiva.',
      },
      {
        name: 'Costi a consumo',
        value: 'Zero canoni fissi',
        text: 'Dashboard per consumi per reparto e utente, limiti di spesa per centro di costo, scalabilità senza penali.',
      },
      {
        name: 'Sicurezza',
        value: 'Crittografia end-to-end',
        text: 'Firewall dedicati con regole personalizzate e aggiornamenti costanti: conversazioni protette secondo standard di compliance.',
      },
    ],
  },

  comparison: {
    heading: 'Come ci confrontiamo',
    description:
      'VoIP KonnectAlps rispetto alla telefonia tradizionale e alle offerte VoIP generiche disponibili sul territorio.',
    rows: [
      {
        criterion: 'Scalabilità di linee e interni',
        note: 'Nuovi interni e numerazioni in poche ore, senza interventi fisici né cablaggi aggiuntivi.',
        verdict: 'migliore',
      },
      {
        criterion: 'Costi ricorrenti',
        note: 'Modello a consumo senza canoni fissi: budget prevedibile per aziende ed enti pubblici.',
        verdict: 'migliore',
      },
      {
        criterion: 'Qualità voce su rete gestita',
        note: 'QoS end-to-end quando fonia e connettività viaggiano sulla nostra rete: priorità garantita al traffico voce.',
        verdict: 'migliore',
      },
      {
        criterion: 'Numerazioni e portabilità',
        note: 'Migrazione delle numerazioni storiche con procedure standard di settore: qui siamo tutti alla pari.',
        verdict: 'uguale',
      },
      {
        criterion: 'Indipendenza dalla connettività',
        note: 'Come ogni VoIP, senza connettività la fonia si ferma: per scenari critici progettiamo ridondanze dedicate.',
        verdict: 'peggiore',
      },
      {
        criterion: 'Configurazione e formazione in loco',
        note: 'Specialisti certificati Priamo seguono migrazione, formazione degli utenti e manutenzione proattiva.',
        verdict: 'migliore',
      },
    ],
    caption:
      'Confronto con telefonia tradizionale e offerte VoIP generiche disponibili in Trentino-Alto Adige. L’onestà prima del marketing: la voce su IP richiede una rete ben progettata, ed è il nostro mestiere.',
  },

  potential: {
    heading: 'Potenzialità',
    statement:
      'Un’architettura pensata per chi non può perdere una chiamata: dai contact center ai servizi pubblici essenziali.',
    points: [
      {
        title: 'Ridondanza geografica',
        text: 'Traffico distribuito su nodi separati con failover automatico: se un percorso cade, il reindirizzamento è impercettibile.',
      },
      {
        title: 'Disaster recovery nativo',
        text: 'Centralino cloud: gli operatori gestiscono le chiamate da qualsiasi dispositivo e da remoto, anche in emergenza.',
      },
      {
        title: 'Telefonia come dato',
        text: 'Ogni chiamata registrata nel gestionale: storico completo per audit di qualità, SLA contrattuali e analisi delle performance.',
      },
    ],
  },

  cta: {
    title: 'Ripensiamo la tua telefonia',
    description:
      'Mappiamo i tuoi flussi di comunicazione e progettiamo il centralino sulle tue turnazioni reali, senza forzature. La migrazione avviene senza interruzioni.',
  },

  quickFacts: {
    ideale: 'PMI, PA e contact center',
    tecnologia: 'SIP Trunk · Centralino cloud Priamo',
    puntoForte: 'Costi a consumo, zero canoni fissi',
    finoA: 'Interni illimitati, in poche ore',
  },
}
