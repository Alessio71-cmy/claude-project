'use client'

import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface PinnedStep {
  /** Etichetta breve (es. "01 — Analisi"). */
  label: string
  title: string
  text: string
  /** Visual opzionale mostrato nel pannello destro. */
  visual?: React.ReactNode
}

interface PinnedStepsProps {
  steps: PinnedStep[]
  className?: string
  /** Altezza di scroll per step, in viewport height (default 0.9). */
  perStepVh?: number
}

/**
 * Sezione pinned scroll-driven (sezione 6, "scroll-driven storytelling"):
 * il pannello resta fermo mentre lo scroll fa avanzare gli step; testo e
 * visual si aggiornano con crossfade. Sotto lg (e con reduced motion)
 * degrada a lista verticale semplice — il motion si semplifica, mai sparisce.
 */
export function PinnedSteps({ steps, className, perStepVh = 0.9 }: PinnedStepsProps) {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Tracking manuale con getBoundingClientRect: sempre accurato anche con
  // smooth scroll (Lenis) e sezioni con content-visibility che spostano gli offset.
  useEffect(() => {
    // Nota: il ref si attacca solo nel layout desktop, quindi l'effect deve
    // ri-eseguirsi quando isDesktop cambia dopo il primo render.
    const el = containerRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return
      const progress = Math.min(Math.max(-rect.top / total, 0), 0.999)
      setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [steps.length, isDesktop, reduce])

  // Fallback semplice: mobile e reduced motion
  if (!isDesktop || reduce) {
    return (
      <div className={cn('flex flex-col gap-10', className)}>
        {steps.map((step) => (
          <div key={step.label} className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-small mb-2 font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--service-color)' }}>
                {step.label}
              </p>
              <h3 className="h3-main">{step.title}</h3>
              <p className="text-base mt-3 opacity-75">{step.text}</p>
            </div>
            {step.visual && <div className="flex items-center justify-center">{step.visual}</div>}
          </div>
        ))}
      </div>
    )
  }

  const current = steps[active]

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{ height: `${steps.length * perStepVh * 100 + 20}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="grid w-full grid-cols-12 items-center gap-x-6">
          {/* Rail di avanzamento + testo */}
          <div className="col-span-5">
            <div className="flex gap-2" role="tablist" aria-label="Avanzamento step">
              {steps.map((s, i) => (
                <span
                  key={s.label}
                  role="presentation"
                  className="h-[3px] flex-1 overflow-hidden rounded-full bg-current/15"
                >
                  <span
                    className="block h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{
                      width: i < active ? '100%' : i === active ? '100%' : '0%',
                      backgroundColor: 'var(--service-color)',
                      opacity: i === active ? 1 : 0.45,
                    }}
                  />
                </span>
              ))}
            </div>

            <div className="relative mt-10 min-h-[16rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    className="text-small mb-3 font-medium uppercase tracking-[0.2em]"
                    style={{ color: 'var(--service-color)' }}
                  >
                    {current.label}
                  </p>
                  <h3 className="h2-main">{current.title}</h3>
                  <p className="text-base mt-5 max-w-prose opacity-75">{current.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Visual */}
          <div className="col-span-6 col-start-7">
            <div className="relative flex min-h-[24rem] items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="w-full"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {current.visual}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
