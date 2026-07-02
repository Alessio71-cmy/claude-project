'use client'

import { useEffect, useRef, useState } from 'react'
import { site } from '@/lib/site'

/**
 * Iframe Calendly (5.7.1) tematizzato sui colori del design system.
 * Lazy: si monta solo quando la sezione entra nel viewport (performance).
 */
export function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const url = `${site.calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=2e3530&text_color=fffffa&primary_color=90fd94`

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl bg-bg-surface">
      {visible ? (
        <iframe
          src={url}
          title="Prenota una call con KonnectAlps"
          className="iframe-interactive h-[720px] w-full border-0 md:h-[680px]"
          loading="lazy"
        />
      ) : (
        <div className="flex h-[680px] items-center justify-center">
          <p className="text-small opacity-50">Caricamento del calendario…</p>
        </div>
      )}
    </div>
  )
}
