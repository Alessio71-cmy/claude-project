'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface HotspotPoint {
  /** Posizione percentuale rispetto al contenitore. */
  x: number
  y: number
  title: string
  description: string
}

interface HotspotFrameProps {
  /** Il contenuto visivo (immagine, diagramma SVG…). */
  children: React.ReactNode
  points: HotspotPoint[]
  className?: string
}

/**
 * Hotspot cliccabili su immagini/schemi (sezione 6): punti pulsanti nel
 * colore del servizio corrente, popover con dettaglio al click/focus.
 * Un solo popover aperto alla volta; chiusura con Escape o click fuori.
 */
export function HotspotFrame({ children, points, className }: HotspotFrameProps) {
  const [open, setOpen] = useState<number | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {children}

      {points.map((point, i) => {
        const isOpen = open === i
        // Il popover si apre dal lato con più spazio
        const popLeft = point.x > 55
        const popTop = point.y > 60
        return (
          <div
            key={point.title}
            className="absolute"
            style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={`Dettagli: ${point.title}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group relative flex h-7 w-7 items-center justify-center rounded-full"
            >
              {/* alone pulsante */}
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full opacity-30 [animation-duration:2.2s] group-hover:opacity-65"
                style={{ backgroundColor: 'var(--service-color)' }}
              />
              <span
                aria-hidden="true"
                className="relative flex h-4 w-4 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: 'var(--service-color)' }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-bg-dark" />
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  role="dialog"
                  aria-label={point.title}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'absolute z-20 w-64 rounded-2xl bg-bg-surface p-5 shadow-xl',
                    popLeft ? 'right-full mr-3' : 'left-full ml-3',
                    popTop ? 'bottom-0' : 'top-0'
                  )}
                >
                  <p className="h3-support mb-1 text-bg-light">{point.title}</p>
                  <p className="text-small leading-relaxed text-text-light/80">{point.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
