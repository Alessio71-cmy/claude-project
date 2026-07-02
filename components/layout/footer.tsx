import Link from 'next/link'
import Image from 'next/image'
import { site, serviceMeta } from '@/lib/site'
import { Container } from '@/components/ui/container'

const soluzioni = [
  serviceMeta.connettivita,
  serviceMeta.voip,
  serviceMeta.iot,
  serviceMeta['core-network'],
  serviceMeta.wireless,
  serviceMeta['agent-ai'],
  serviceMeta.cyberalps,
]

const aziendali = [
  { label: 'Servizi', href: '/servizi' },
  { label: 'La nostra identità', href: '/about/identita' },
  { label: 'Case study', href: '/about/case-study' },
  { label: 'Contatti', href: '/contatti' },
]

export function Footer() {
  return (
    <footer className="border-t border-bg-light/10 bg-bg-dark text-text-light">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-12">
          {/* Brand */}
          <div className="xl:col-span-5">
            <Link href="/" aria-label="KonnectAlps — Home" className="relative block h-10 w-44">
              <Image
                src="/brand/logo-on-dark.png"
                alt="KonnectAlps"
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </Link>
            <p className="text-small mt-6 max-w-sm leading-relaxed opacity-75">
              Ingegneria delle telecomunicazioni e connettività su misura per aziende e pubbliche
              amministrazioni del Trentino-Alto Adige.
            </p>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small mt-6 inline-flex items-center gap-2 opacity-75 transition-opacity hover:opacity-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Soluzioni */}
          <nav aria-label="Soluzioni" className="xl:col-span-3">
            <h2 className="text-small mb-5 font-semibold uppercase tracking-[0.2em] opacity-65">
              Soluzioni
            </h2>
            <ul className="space-y-2.5">
              {soluzioni.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-small opacity-75 transition-opacity hover:opacity-100">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* KonnectAlps */}
          <nav aria-label="Azienda" className="xl:col-span-2">
            <h2 className="text-small mb-5 font-semibold uppercase tracking-[0.2em] opacity-65">
              KonnectAlps
            </h2>
            <ul className="space-y-2.5">
              {aziendali.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-small opacity-75 transition-opacity hover:opacity-100">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Assistenza */}
          <div className="xl:col-span-2">
            <h2 className="text-small mb-5 font-semibold uppercase tracking-[0.2em] opacity-65">
              Assistenza
            </h2>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${site.email}`} className="text-small opacity-75 transition-opacity hover:opacity-100">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="text-small opacity-75 transition-opacity hover:opacity-100">
                  {site.phone}
                </a>
              </li>
              <li>
                <span className="text-small opacity-75">Sede {site.location}</span>
              </li>
              <li>
                <a
                  href={site.customerArea}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small opacity-75 transition-opacity hover:opacity-100"
                >
                  Area Clienti
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-small opacity-75 transition-opacity hover:opacity-100">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-bg-light/10 pt-8">
          <p className="text-small opacity-65">
            © {new Date().getFullYear()} {site.legalName} — Tutti i diritti riservati · P.IVA{' '}
            {site.vat} · REA {site.rea}
          </p>
        </div>
      </Container>
    </footer>
  )
}
