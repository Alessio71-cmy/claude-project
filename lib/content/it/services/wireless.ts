import type { ServiceContent } from './types'

export const wireless: ServiceContent = {
  key: 'wireless',
  slug: 'soluzioni-wireless',
  eyebrow: 'Soluzioni Wireless',
  h1: 'Connettività wireless professionale',
  subtitle:
    'Access point enterprise Cambium Networks per hotel, strutture ricettive, spazi outdoor e ambienti sanitari: prestazioni elevate, copertura affidabile, certificazioni dedicate.',
  seo: {
    title: 'Soluzioni Wireless — Wi-Fi professionale per hotel e strutture',
    description:
      'Wi-Fi professionale in Trentino-Alto Adige: reti wireless per hotel, campeggi, RSA e eventi con access point Cambium Networks, site survey sul posto e gestione cloud centralizzata.',
  },

  features: {
    heading: 'Una rete wireless che non si nota: funziona e basta',
    description:
      'Copertura continua, roaming trasparente e sicurezza di livello professionale, progettati sul tuo spazio reale — non su una planimetria ideale.',
    items: [
      {
        title: 'Hardware enterprise',
        text: 'Access point Cambium Networks di ultima generazione: densità elevate di client simultanei senza degrado delle prestazioni.',
      },
      {
        title: 'Copertura senza interruzioni',
        text: 'Site survey sul posto e progettazione radio cell-by-cell: il segnale c’è dove serve, il roaming è impercettibile.',
      },
      {
        title: 'Controllo centralizzato cloud',
        text: 'Tutta la rete gestita da un’unica console: SSID, ospiti, statistiche e aggiornamenti senza interventi sul campo.',
      },
      {
        title: 'Protezione professionale',
        text: 'Segmentazione tra rete ospiti e sistemi interni, autenticazione enterprise e filtri di navigazione configurabili.',
      },
    ],
  },

  tech: {
    heading: 'Progettato per il tuo ambiente',
    description:
      'Ogni contesto ha vincoli radio, normativi e d’uso diversi: quattro specializzazioni maturate sul campo.',
    specs: [
      {
        name: 'Hospitality',
        value: 'Hotel e resort',
        text: 'Wi-Fi premium in camera e negli spazi comuni: streaming fluido per gli ospiti, rete separata e sicura per i gestionali.',
      },
      {
        name: 'Outdoor',
        value: 'Campeggi e villaggi turistici',
        text: 'Copertura esterna su ettari di terreno con apparati resistenti a neve, gelo ed escursioni termiche alpine.',
      },
      {
        name: 'Sanità',
        value: 'RSA e strutture sanitarie',
        text: 'Reti certificate per ambienti medicali: convivenza con dispositivi clinici e affidabilità per telemetrie e cartelle.',
      },
      {
        name: 'Eventi',
        value: 'Installazioni temporanee',
        text: 'Infrastrutture plug-and-play per manifestazioni e grandi eventi: capacità che si monta e smonta in giornata.',
      },
      {
        name: 'Ponti radio',
        value: 'Collegamenti punto-punto',
        text: 'Dove il cavo non arriva: collegamenti dedicati tra edifici e sedi con banda garantita e latenza minima.',
      },
    ],
  },

  comparison: {
    heading: 'Come ci confrontiamo',
    description:
      'Wireless professionale KonnectAlps rispetto alle installazioni Wi-Fi standard tipicamente proposte sul territorio.',
    rows: [
      {
        criterion: 'Progettazione con site survey',
        note: 'Misurazioni radio sul posto prima dell’offerta: la copertura è verificata, non stimata a catalogo.',
        verdict: 'migliore',
      },
      {
        criterion: 'Densità di client simultanei',
        note: 'Apparati enterprise dimensionati per centinaia di dispositivi per area: la rete regge il tutto esaurito.',
        verdict: 'migliore',
      },
      {
        criterion: 'Copertura outdoor e condizioni alpine',
        note: 'Hardware outdoor rated e ponti radio progettati per neve, gelo e dislivelli.',
        verdict: 'migliore',
      },
      {
        criterion: 'Wi-Fi per piccoli spazi semplici',
        note: 'Per un ufficio di tre stanze un buon access point consumer fa il suo lavoro: non serviamo complessità inutile.',
        verdict: 'uguale',
      },
      {
        criterion: 'Costo iniziale dell’impianto',
        note: 'L’hardware enterprise e la progettazione costano più di un impianto improvvisato: il ritorno è nella vita utile.',
        verdict: 'peggiore',
      },
      {
        criterion: 'Certificazioni per ambienti sanitari',
        note: 'Requisiti medicali e di convivenza elettromagnetica coperti nativamente: raro trovarlo nelle offerte generiche.',
        verdict: 'migliore',
      },
    ],
    caption:
      'Confronto con le installazioni Wi-Fi tipicamente disponibili in Trentino-Alto Adige. Il wireless professionale si ripaga dove la rete è un servizio percepito dai tuoi ospiti e clienti.',
  },

  potential: {
    heading: 'Potenzialità',
    statement:
      'Le stesse reti che coprono un rifugio a 2.000 metri servono fiere, ospedali e resort internazionali.',
    points: [
      {
        title: 'Migliaia di client',
        text: 'Architetture ad alta densità per grandi eventi e strutture estese, con bilanciamento automatico del carico.',
      },
      {
        title: 'Roaming seamless',
        text: 'Passaggio tra access point senza interruzioni: VoIP e streaming continuano mentre ci si sposta nella struttura.',
      },
      {
        title: 'Analytics di presenza',
        text: 'Dati anonimi su flussi e permanenze negli spazi: informazioni utili per gestire aree comuni e servizi.',
      },
    ],
  },

  cta: {
    title: 'Misuriamo il tuo spazio',
    description:
      'Il primo passo è un site survey: veniamo sul posto, misuriamo, e progettiamo la copertura sulla struttura reale. Il preventivo arriva dopo, ed è verificabile.',
  },

  quickFacts: {
    ideale: 'Hotel, campeggi, RSA, eventi',
    tecnologia: 'Cambium Networks · Wi-Fi 6/6E',
    puntoForte: 'Site survey e progettazione sul posto',
    finoA: 'Migliaia di client simultanei',
  },
}
