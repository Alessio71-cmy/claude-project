'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { navItems } from '@/lib/navigation'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { ChevronDown } from '@/components/ui/icons'

/**
 * Header fisso: navbar a 6 voci con dropdown per Servizi e About,
 * bottone Area Clienti, menu mobile a pannello. Su /cyberalps il tema
 * diventa chiaro per coerenza con la pagina (sezione 2.2).
 */
export function Header() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lightTheme = pathname?.startsWith('/cyberalps')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Chiudi menu a ogni navigazione
  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Blocca lo scroll del body quando il menu mobile è aperto
  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', mobileOpen)
    return () => document.documentElement.classList.remove('overflow-hidden')
  }, [mobileOpen])

  const openWithIntent = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(label)
  }
  const closeWithIntent = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href.split('#')[0])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled || mobileOpen
          ? lightTheme
            ? 'bg-bg-light/90 backdrop-blur-md'
            : 'bg-bg-dark/85 backdrop-blur-md'
          : 'bg-transparent'
      )}
      style={{ color: lightTheme ? 'var(--bg-dark)' : 'var(--bg-light)' }}
    >
      {/* Skip link */}
      <a
        href="#contenuto"
        className="sr-only z-[60] rounded-full bg-primary px-5 py-2 font-semibold text-bg-dark focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Salta al contenuto
      </a>

      <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between gap-6 px-5 md:px-10">
        <Link href="/" aria-label="KonnectAlps — Home" className="relative block h-9 w-40 shrink-0">
          <Image
            src={lightTheme ? '/brand/logo-on-light.png' : '/brand/logo-on-dark.png'}
            alt="KonnectAlps"
            fill
            sizes="160px"
            priority
            className="object-contain object-left"
          />
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigazione principale" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openWithIntent(item.label)}
                onMouseLeave={closeWithIntent}
              >
                <button
                  type="button"
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-4 py-2 font-medium transition-opacity',
                    isActive(item.href) ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={cn(
                      'transition-transform duration-300',
                      openDropdown === item.label && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                    >
                      <ul
                        className={cn(
                          'overflow-hidden rounded-2xl p-2 shadow-2xl',
                          lightTheme ? 'bg-bg-light' : 'bg-bg-surface'
                        )}
                      >
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                'block rounded-xl px-4 py-3 transition-colors',
                                lightTheme ? 'hover:bg-bg-dark/5' : 'hover:bg-bg-light/5'
                              )}
                            >
                              <span className="block font-medium">{child.label}</span>
                              {child.description && (
                                <span className="text-small block opacity-60">{child.description}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 font-medium transition-opacity',
                  isActive(item.href) ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                )}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.customerArea}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary button--sm hidden sm:inline-flex"
          >
            Area Clienti
          </a>

          {/* Toggle menu mobile */}
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            aria-label={mobileOpen ? 'Chiudi il menu' : 'Apri il menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={cn(
                'block h-[2px] w-6 rounded-full bg-current transition-transform duration-300',
                mobileOpen && 'translate-y-[7px] rotate-45'
              )}
            />
            <span
              className={cn(
                'block h-[2px] w-6 rounded-full bg-current transition-opacity duration-300',
                mobileOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block h-[2px] w-6 rounded-full bg-current transition-transform duration-300',
                mobileOpen && '-translate-y-[7px] -rotate-45'
              )}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navigazione principale mobile"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'overflow-hidden lg:hidden',
              lightTheme ? 'bg-bg-light/95' : 'bg-bg-dark/95',
              'backdrop-blur-md'
            )}
          >
            <ul className="max-h-[calc(100dvh-5rem)] space-y-1 overflow-y-auto px-5 pb-10 pt-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileSection === item.label}
                        onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-lg font-medium"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'transition-transform duration-300',
                            mobileSection === item.label && 'rotate-180'
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileSection === item.label && (
                          <motion.ul
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden pl-3"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link href={child.href} className="block rounded-xl px-3 py-2.5 opacity-80">
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href} className="block rounded-xl px-3 py-3 text-lg font-medium">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-4">
                <a href={site.customerArea} target="_blank" rel="noopener noreferrer" className="button button--primary">
                  Area Clienti
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
