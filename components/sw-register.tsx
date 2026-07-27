'use client'

import { useEffect } from 'react'
import { getState } from '@/lib/storage'

/**
 * Registra il service worker e applica il tema scelto.
 *
 * Il tema va applicato qui e non nel componente Impostazioni, perché deve
 * valere su tutte le schermate dal primo istante: se lo applicasse solo la
 * pagina delle impostazioni, aprire l'app in tema "Notte" mostrerebbe un
 * lampo di carta chiara.
 */
export function SwRegister() {
  useEffect(() => {
    const { theme } = getState()
    if (theme !== 'auto') document.documentElement.setAttribute('data-theme', theme)

    if (!('serviceWorker' in navigator)) return
    // Registrazione differita: non deve competere con il primo render.
    const t = setTimeout(() => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* niente offline: l'app funziona comunque */
      })
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  return null
}
