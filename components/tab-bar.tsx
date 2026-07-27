'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

/* Icone disegnate a mano, stroke 1.5 su griglia 20: tre forme deliberatamente
   diverse fra loro, perché "da leggere" e "letti" sono i due stati che
   l'utente confonde più facilmente se le icone si somigliano. */

function IconOggi({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3.5" y="2.5" width="13" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="6" y="5.5" width="5" height="2" rx="0.5" fill="currentColor" opacity={active ? 1 : 0.55} />
      <path d="M6 10.5h8M6 13.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconDaLeggere({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.5 2.75h9a.75.75 0 0 1 .75.75v13.05a.4.4 0 0 1-.62.34L10 13.6l-4.63 3.29a.4.4 0 0 1-.62-.34V3.5a.75.75 0 0 1 .75-.75Z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.14 : 0}
      />
    </svg>
  )
}

function IconLetti({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle
        cx="10"
        cy="10"
        r="7.25"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.14 : 0}
      />
      <path d="m6.9 10.2 2.1 2.1 4.1-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const tabs = [
  { href: '/', label: 'Oggi', Icon: IconOggi },
  { href: '/da-leggere', label: 'Da leggere', Icon: IconDaLeggere },
  { href: '/letti', label: 'Letti', Icon: IconLetti },
] as const

export function TabBar() {
  const pathname = usePathname()

  // Il reader è una schermata a sé: la barra ruberebbe superficie di lettura e
  // resterebbe accesa senza che nessuna tab sia davvero attiva. Si esce con
  // «← indice», che è più chiaro di una tab illuminata a caso.
  if (pathname.startsWith('/articolo/')) return null

  return (
    <nav
      aria-label="Sezioni"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-rule bg-paper/92 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-[42rem] items-stretch inset-bottom-safe">
        {tabs.map(({ href, label, Icon }) => {
          // Su /articolo/... nessuna tab è attiva: il reader è una schermata
          // a sé, e illuminare "Oggi" mentirebbe sulla provenienza.
          const active = pathname === href
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-1 px-2 pt-2.5 pb-1 transition-colors',
                  active ? 'text-ink' : 'text-ink-muted',
                )}
              >
                <Icon active={active} />
                <span
                  className={cn(
                    'label',
                    active && 'text-ink',
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
