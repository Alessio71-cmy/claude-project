/** Contatti (5.7): Calendly prima, poi form a step. */
export const contact = {
  eyebrow: 'Contatti',
  h1: 'Entriamo in contatto',
  subtitle:
    'Che tu voglia un preventivo dettagliato o un primo incontro conoscitivo, il team è a tua disposizione: rispondiamo entro 24 ore lavorative.',
  seo: {
    title: 'Contatti — Richiedi una consulenza',
    description:
      'Contatta KonnectAlps: prenota direttamente una call di 30 minuti o scrivici con il form. Sedi a Trento e Bolzano, risposta entro 24 ore lavorative.',
  },

  calendly: {
    eyebrow: 'Prenota subito',
    heading: 'Scegli un orario, parliamone',
    description:
      'Trenta minuti con un tecnico — non un commerciale. Porta le tue domande: usciamo dalla call con almeno una risposta concreta.',
  },

  form: {
    eyebrow: 'Oppure scrivici',
    heading: 'Raccontaci la tua esigenza',
    description:
      'Tre passaggi rapidi: chi sei, come ricontattarti, cosa ti serve. I campi con * sono obbligatori.',
    steps: ['Chi sei', 'Contatti', 'Richiesta'],
    tipologie: ['Privato', 'Azienda', 'Pubblica Amministrazione', 'Associazione'],
    privacyText:
      'Acconsento al trattamento dei dati forniti per ricevere informazioni sui servizi ed essere ricontattato. Il trasferimento a terzi è escluso e il consenso è revocabile in qualsiasi momento. Maggiori dettagli nella',
    success: {
      title: 'Richiesta inviata',
      text: 'Grazie: ti rispondiamo entro 24 ore lavorative. Se preferisci non aspettare, prenota direttamente una call qui sopra.',
    },
  },

  /** Etichette-oggetto precompilate per ?servizio= (CTA dalle pagine servizio). */
  serviceSubjects: {
    connettivita: 'Consulenza Connettività Avanzata',
    voip: 'Consulenza VoIP & Fonia',
    iot: 'Consulenza IoT',
    'core-network': 'Consulenza Core Network',
    wireless: 'Consulenza Soluzioni Wireless',
    'agent-ai': 'Accesso Beta Agent AI',
    cyberalps: 'Assessment CyberAlps',
  } as Record<string, string>,
}
