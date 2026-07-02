import { serviceMeta } from './site'

export interface NavChild {
  label: string
  href: string
  description?: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

/** Navbar a 6 voci (sezione 5 del brief). */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Servizi',
    href: '/servizi',
    children: [
      { label: 'Overview servizi', href: '/servizi', description: 'Panoramica e confronto rapido' },
      { label: serviceMeta.connettivita.label, href: serviceMeta.connettivita.href, description: 'Fibra dedicata e banda garantita' },
      { label: serviceMeta.voip.label, href: serviceMeta.voip.href, description: 'Centralino cloud e fonia aziendale' },
      { label: serviceMeta.iot.label, href: serviceMeta.iot.href, description: 'Sensori e reti per il monitoraggio' },
      { label: serviceMeta['core-network'].label, href: serviceMeta['core-network'].href, description: 'Infrastruttura di rete e routing' },
      { label: serviceMeta.wireless.label, href: serviceMeta.wireless.href, description: 'Ponti radio e copertura Wi-Fi' },
    ],
  },
  {
    label: 'About',
    href: '/about/identita',
    children: [
      { label: 'La nostra identità', href: '/about/identita', description: 'Principi, direzione, visione' },
      { label: 'Case study', href: '/about/case-study', description: 'Progetti sul territorio' },
    ],
  },
  { label: 'CyberAlps', href: '/cyberalps' },
  { label: 'Agent AI', href: '/agent-ai' },
  { label: 'Contatti', href: '/contatti' },
]
