/**
 * Costanti sito — dati aziendali reali (da settings KonnectAlps).
 */
export const site = {
  name: 'KonnectAlps',
  url: 'https://konnectalps.it',
  description:
    'KonnectAlps | Ingegneria delle telecomunicazioni e connettività su misura per la tua continuità operativa in Trentino-Alto Adige',
  email: 'info@konnectalps.it',
  phone: '+39 0471 840048',
  phoneHref: '+390471840048',
  location: 'Trento / Bolzano',
  vat: '02805640220',
  rea: 'TN – 251228',
  legalName: 'KonnectAlps S.R.L.',
  linkedin: 'https://linkedin.com/company/konnectalps',
  customerArea: 'https://ispbilling.it/customer-area/NDE2NzEwMQ==/login',
  calendlyUrl: 'https://calendly.com/konnectalps',
} as const

/** Mapping colore → servizio (sezione 2.2 del brief, fisso). */
export type ServiceKey =
  | 'connettivita'
  | 'voip'
  | 'iot'
  | 'core-network'
  | 'wireless'
  | 'agent-ai'
  | 'cyberalps'

export const serviceMeta: Record<
  ServiceKey,
  { label: string; href: string; color: string; colorSoft: string }
> = {
  connettivita: {
    label: 'Connettività Avanzata',
    href: '/servizi/connettivita-avanzata',
    color: 'var(--support-yellow)',
    colorSoft: 'var(--support-yellow-soft)',
  },
  voip: {
    label: 'VoIP & Fonia',
    href: '/servizi/voip',
    color: 'var(--support-cyano)',
    colorSoft: 'var(--support-cyano-soft)',
  },
  iot: {
    label: 'IoT',
    href: '/servizi/iot',
    color: 'var(--support-orange)',
    colorSoft: 'var(--support-orange-soft)',
  },
  'core-network': {
    label: 'Core Network',
    href: '/servizi/core-network',
    color: 'var(--support-green)',
    colorSoft: 'var(--support-green-soft)',
  },
  wireless: {
    label: 'Soluzioni Wireless',
    href: '/servizi/soluzioni-wireless',
    color: 'var(--support-lilla)',
    colorSoft: 'var(--support-lilla-soft)',
  },
  'agent-ai': {
    label: 'Agent AI',
    href: '/agent-ai',
    color: 'var(--support-viola)',
    colorSoft: 'var(--support-viola-soft)',
  },
  cyberalps: {
    label: 'CyberAlps',
    href: '/cyberalps',
    color: 'var(--support-blue)',
    colorSoft: 'var(--support-blue-soft)',
  },
}
