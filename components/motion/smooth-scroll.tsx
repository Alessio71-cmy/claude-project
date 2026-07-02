'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useReducedMotion } from 'framer-motion'

/** Smooth scroll per le ancore interne, con offset per l'header fisso. */
function AnchorScroll() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -96 })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis])

  return null
}

/**
 * Gestione manuale della posizione iniziale: con hash scrolla all'ancora,
 * senza hash parte sempre dall'inizio (evita il ripristino del browser).
 */
function ScrollRestorationManager() {
  const lenis = useLenis()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (!lenis) return
    const hash = window.location.hash
    if (hash && hash.length > 1) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) lenis.scrollTo(el as HTMLElement, { offset: -96 })
      }, 100)
      return () => clearTimeout(timer)
    }
    lenis.scrollTo(0, { immediate: true })
  }, [lenis])

  return null
}

/**
 * Provider smooth scroll (Lenis). Disattivato con prefers-reduced-motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  if (reduce) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: false,
      }}
    >
      <ScrollRestorationManager />
      <AnchorScroll />
      {children}
    </ReactLenis>
  )
}
