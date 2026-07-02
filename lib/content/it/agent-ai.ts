/** Agent AI (5.6) — base testi reali dall'export, demo con audio. */
export const agentAi = {
  eyebrow: 'Tecnologia VoIP + AI',
  badge: 'Beta',
  h1: 'Il tuo agente vocale AI che non dorme mai',
  subtitle:
    'Un operatore telefonico intelligente, multilingua e sempre disponibile, connesso direttamente alla tua linea VoIP. Gestisce chiamate, risponde a domande e compie azioni in autonomia.',
  seo: {
    title: 'Agent AI — L’agente vocale che risponde per la tua azienda',
    description:
      'Agente vocale AI su linea VoIP: risponde alle chiamate 24/7, parla più lingue, fissa appuntamenti, invia mail e preventivi. Ascolta le demo vocali e richiedi l’accesso beta.',
  },

  demo: {
    eyebrow: 'Campioni audio',
    heading: 'Ascolta la voce dell’agente',
    description:
      'Seleziona una lingua e premi play: un esempio reale di come l’agente si presenta e risponde. Naturalezza prima di tutto — giudica tu.',
    privacyNote: 'I tuoi dati sono protetti e non vengono condivisi.',
    languages: [
      { code: 'it', flag: '🇮🇹', label: 'Italiano', src: '/audio/agent-ai-it.mp3' },
      { code: 'en', flag: '🇬🇧', label: 'English', src: undefined },
      { code: 'de', flag: '🇩🇪', label: 'Deutsch', src: undefined },
    ] as { code: string; flag: string; label: string; src?: string }[],
  },

  capabilities: {
    heading: 'Cosa fa, concretamente',
    description:
      'Non un risponditore evoluto: un operatore che capisce l’intento, agisce sui tuoi sistemi e chiude il cerchio — dalla risposta all’appuntamento fissato.',
    items: [
      { title: 'Risponde alle chiamate', text: 'Gestisce più conversazioni simultanee, 24 ore su 24: niente code, niente segnale di occupato.' },
      { title: 'Parla come una persona', text: 'Tono naturale e costante, rilevamento automatico della lingua dell’interlocutore.' },
      { title: 'Si integra nei tuoi sistemi', text: 'Calendari, CRM e gestionali: verifica disponibilità e registra ogni interazione.' },
      { title: 'Invia mail e preventivi', text: 'Al termine della chiamata parte il follow-up: riepiloghi, documenti, offerte.' },
      { title: 'Fissa appuntamenti', text: 'Conferme, spostamenti e disdette gestiti in autonomia su Google o Outlook.' },
      { title: 'Passa la palla quando serve', text: 'Capisce quando serve un umano e trasferisce al reparto giusto, senza menu a tasti.' },
    ],
  },

  useCases: {
    heading: 'L’AI che si modella sul tuo business',
    description:
      'Ogni impresa ha flussi unici, ma tutte condividono il bisogno di risposte rapide e precise. Quattro ambiti dove la tecnologia VoIP + AI cambia il modo di comunicare.',
    tabs: [
      {
        title: 'Centralino aziendale',
        text: 'Accoglienza professionale e costante, a qualsiasi ora.',
        items: [
          { title: 'Zero attese', text: 'Gestisce chiamate simultanee eliminando code e segnali di occupato.' },
          { title: 'Smistamento smart', text: 'Capisce l’intento e trasferisce al reparto giusto, senza menu a tasti.' },
          { title: 'Brand image', text: 'Tono professionale 24/7, senza cali di attenzione.' },
          { title: 'Efficienza interna', text: 'Libera lo staff dai compiti ripetitivi per attività a maggior valore.' },
        ],
      },
      {
        title: 'Prenotazioni e appuntamenti',
        text: 'Per studi medici, saloni e agenzie: l’agenda si gestisce da sola, senza perdere il tocco umano.',
        items: [
          { title: 'Sync real-time', text: 'Verifica disponibilità e fissa appuntamenti su Google o Outlook.' },
          { title: 'Booking 24/7', text: 'Si prenota anche la sera e nei festivi: più vendite, zero straordinari.' },
          { title: 'Meno no-show', text: 'Conferme, spostamenti e disdette gestiti in autonomia.' },
          { title: 'Dati precisi', text: 'Niente errori di trascrizione durante la conversazione.' },
        ],
      },
      {
        title: 'E-commerce e assistenza',
        text: 'Risposte immediate su ordini, resi e pagamenti — anche nei picchi di stagione.',
        items: [
          { title: 'Tracking istantaneo', text: 'Stato spedizione in tempo reale, integrato con il gestionale.' },
          { title: 'FAQ vocali', text: 'Resi e pagamenti risolti al telefono, senza attese.' },
          { title: 'Picchi assorbiti', text: 'Black Friday e saldi senza assumere staff temporaneo.' },
          { title: 'Storico completo', text: 'Ogni richiesta tracciata e consultabile.' },
        ],
      },
      {
        title: 'Multilingua automatico',
        text: 'Rileva la lingua dell’interlocutore e si adatta con fluidità: il tuo business parla al mondo.',
        items: [
          { title: 'Lingua rilevata al volo', text: 'Info su servizi e check-in istantanee in qualsiasi lingua.' },
          { title: 'Mercati esteri', text: 'Testa nuovi mercati senza team madrelingua dedicati.' },
          { title: 'Protocolli uniformi', text: 'Informazioni precise e coerenti in ogni lingua.' },
          { title: 'Ospitalità alpina', text: 'Per hotel e strutture del territorio: ospiti internazionali, accoglienza impeccabile.' },
        ],
      },
    ],
  },

  trust: {
    statement: 'La fiducia non si dichiara: si ascolta.',
    text: 'Per questo la pagina inizia con la voce, non con le promesse. L’agente è in beta: lo attiviamo con pochi partner selezionati, calibrato sui flussi reali di ciascuno.',
  },

  cta: {
    title: 'Richiedi l’accesso alla beta',
    description:
      'Raccontaci i tuoi flussi telefonici: se l’agente può esserti utile davvero, lo configuriamo insieme sul tuo caso. Se non è pronto per il tuo scenario, te lo diciamo.',
  },
}
