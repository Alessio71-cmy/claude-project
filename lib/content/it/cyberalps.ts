/**
 * CyberAlps (5.5) — contenuti ex novo. Tema chiaro "lab/clean".
 * Tono: tecnico ma rassicurante — costruire fiducia, non ansia.
 */
export const cyberalps = {
  eyebrow: 'CyberAlps',
  h1: 'La sicurezza che lavora in silenzio',
  subtitle:
    'Protezione gestita per aziende e pubbliche amministrazioni: prevenzione concreta, monitoraggio continuo e persone raggiungibili quando serve. Senza allarmismi, senza gergo inutile.',
  seo: {
    title: 'CyberAlps — Cybersecurity gestita per aziende e PA',
    description:
      'Cybersecurity gestita in Trentino-Alto Adige: firewall next-generation, protezione endpoint, filtraggio DNS e monitoraggio continuo. Protezione concreta, spiegata con chiarezza.',
  },

  approach: {
    heading: 'La protezione è un processo, non un prodotto',
    description:
      'Nessun software da solo mette al sicuro un’azienda. La sicurezza si costruisce gestendo ogni giorno i flussi di dati, con strumenti calibrati sul tuo modo di lavorare.',
    items: [
      {
        title: 'Firewall & IPS gestiti',
        text: 'Il traffico nocivo si ferma sul gateway di accesso, prima di raggiungere la rete locale. Configurazione e manutenzione le curiamo noi.',
      },
      {
        title: 'Protezione endpoint',
        text: 'Sistemi centralizzati proteggono server e postazioni da malware e ransomware, con aggiornamenti costanti e visibilità su ogni dispositivo.',
      },
      {
        title: 'Filtraggio DNS e contenuti',
        text: 'La navigazione verso domini compromessi viene bloccata alla radice: una protezione invisibile che lavora su ogni dispositivo connesso.',
      },
      {
        title: 'Monitoraggio continuo',
        text: 'Le anomalie si rilevano in tempo reale e i firmware degli apparati restano aggiornati: la superficie di attacco si riduce ogni settimana.',
      },
    ],
  },

  path: {
    heading: 'Come iniziamo, in quattro passi',
    description:
      'Un percorso graduale e trasparente: capisci sempre cosa stiamo facendo e perché, senza dover diventare esperto di sicurezza.',
    steps: [
      {
        label: '01',
        title: 'Fotografia dello stato attuale',
        text: 'Un assessment leggibile: cosa è già protetto, cosa è esposto, cosa conviene fare per primo. In linguaggio chiaro, con priorità oneste.',
      },
      {
        label: '02',
        title: 'Protezione di base',
        text: 'Gateway, endpoint e DNS: le difese fondamentali attivate senza fermare il lavoro, calibrate sui tuoi flussi reali.',
      },
      {
        label: '03',
        title: 'Monitoraggio e manutenzione',
        text: 'La sicurezza resta aggiornata da sola: regole, firme e firmware seguiti dal nostro team, con report periodici comprensibili.',
      },
      {
        label: '04',
        title: 'Risposta quando serve',
        text: 'Se qualcosa non torna, parli con un tecnico che conosce la tua rete — non con un call center che apre un ticket.',
      },
    ],
  },

  comparison: {
    heading: 'Come ci confrontiamo',
    description:
      'CyberAlps rispetto all’approccio più diffuso nelle PMI: antivirus autonomi, firewall non gestiti e sicurezza “installata e dimenticata”.',
    rows: [
      {
        criterion: 'Protezione sul perimetro di rete',
        note: 'Il filtraggio avviene sul gateway gestito, prima che il traffico entri: l’antivirus da solo interviene a minaccia già in casa.',
        verdict: 'migliore' as const,
      },
      {
        criterion: 'Aggiornamenti e manutenzione',
        note: 'Regole e firmware seguiti da un team dedicato, contro l’aggiornamento manuale che nella pratica non avviene.',
        verdict: 'migliore' as const,
      },
      {
        criterion: 'Strumenti di base (antivirus, backup)',
        note: 'I buoni prodotti consumer fanno il loro lavoro: su questo livello siamo alla pari, e te lo diciamo.',
        verdict: 'uguale' as const,
      },
      {
        criterion: 'Costo per una singola postazione',
        note: 'Per un professionista con un solo PC, una suite consumer costa meno di un servizio gestito.',
        verdict: 'peggiore' as const,
      },
      {
        criterion: 'Visibilità su ciò che accade',
        note: 'Report periodici in linguaggio comprensibile e un referente che risponde: la sicurezza smette di essere una scatola nera.',
        verdict: 'migliore' as const,
      },
    ],
    caption:
      'Confronto con le pratiche di sicurezza più diffuse tra le PMI del territorio. La protezione giusta è proporzionata al rischio reale: se bastano gli strumenti di base, te lo diremo.',
  },

  trust: {
    statement: 'La buona sicurezza non si fa notare: si nota solo quando manca.',
    text: 'L’obiettivo non è venderti paura, ma toglierti un pensiero: sapere che qualcuno guarda la tua rete ogni giorno, così tu puoi guardare il tuo lavoro.',
  },

  cta: {
    title: 'Iniziamo dalla fotografia',
    description:
      'Un assessment iniziale chiaro e senza impegno: capisci dove sei esposto e cosa conviene fare per primo. Poi decidi tu il passo successivo.',
  },
}
