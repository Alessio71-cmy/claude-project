'use client'

import { useEffect, useRef } from 'react'

const BG_DARK = '#202321'
const BG_LIGHT = '#FFFFFA'

interface ScrollThemeZoneProps {
  /** Contenuto prima della zona chiara (resta su fondo scuro). */
  intro: React.ReactNode
  /** Contenuto della zona chiara: quando entra nel viewport lo sfondo vira al chiaro. */
  light: React.ReactNode
  /** Contenuto dopo la zona chiara (torna scuro). */
  outro: React.ReactNode
}

/**
 * Transizione di tema dark ↔ light guidata dallo scroll (portata da ashen):
 * due sentinelle delimitano la zona chiara; superata la prima al 60% del
 * viewport lo sfondo di body e zona vira a --bg-light, superata la seconda
 * torna a --bg-dark. `data-scroll-theme` su <html> fa flippare i colori
 * del testo via CSS (vedi globals). Con prefers-reduced-motion la
 * transizione resta ma senza animazione (gestito dal reset globale).
 */
export function ScrollThemeZone({ intro, light, outro }: ScrollThemeZoneProps) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const lightStartRef = useRef<HTMLDivElement>(null)
  const lightEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return

    zone.style.transition = 'background-color 1s ease'
    zone.style.backgroundColor = BG_DARK

    let raf = 0
    let active: boolean | null = null

    const apply = (isLight: boolean) => {
      if (active === isLight) return
      active = isLight
      const bg = isLight ? BG_LIGHT : BG_DARK
      zone.style.backgroundColor = bg
      document.body.style.backgroundColor = bg
      if (isLight) {
        document.documentElement.setAttribute('data-scroll-theme', 'light')
      } else {
        document.documentElement.removeAttribute('data-scroll-theme')
      }
    }

    const check = () => {
      raf = 0
      const start = lightStartRef.current
      const end = lightEndRef.current
      if (!start || !end) return
      // Il tema cambia quando la sentinella supera il 60% del viewport
      const threshold = window.innerHeight * 0.6
      const inLight = start.getBoundingClientRect().top < threshold && end.getBoundingClientRect().top >= threshold
      apply(inLight)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    check()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
      zone.style.backgroundColor = ''
      zone.style.transition = ''
      document.body.style.backgroundColor = ''
      document.documentElement.removeAttribute('data-scroll-theme')
    }
  }, [])

  return (
    <>
      {/* Zona con sfondo animato e flip dei colori (intro + light) */}
      <div ref={zoneRef} data-themable className="w-full">
        {intro}
        <div ref={lightStartRef} aria-hidden="true" style={{ height: 1 }} />
        {light}
        <div ref={lightEndRef} aria-hidden="true" style={{ height: 1 }} />
      </div>
      {/* Dopo la zona chiara: sfondo scuro esplicito, colori mai flippati
          (come la dark zone di ashen) */}
      <div className="w-full bg-bg-dark">{outro}</div>
    </>
  )
}
