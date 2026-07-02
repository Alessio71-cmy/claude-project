'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { serviceMeta } from '@/lib/site'
import { serviceIcons } from '@/components/icons'
import { ArrowUpRight } from '@/components/ui/icons'
import type { ServiceContent } from '@/lib/content/it/services'
import { cn } from '@/lib/utils'

/**
 * Esploratore comparativo (sezione 5.2): permette di confrontare i 5 servizi
 * senza aprire ogni pagina. Selettore a pillole tintate + pannello con
 * fatti rapidi e link di approfondimento.
 */
export function ServiceExplorer({ services }: { services: ServiceContent[] }) {
  const [activeKey, setActiveKey] = useState(services[0].key)
  const reduce = useReducedMotion()
  const active = services.find((s) => s.key === activeKey)!
  const meta = serviceMeta[active.key]
  const Icon = serviceIcons[active.key]

  const facts: { label: string; value: string }[] = [
    { label: 'Ideale per', value: active.quickFacts.ideale },
    { label: 'Tecnologia', value: active.quickFacts.tecnologia },
    { label: 'Punto di forza', value: active.quickFacts.puntoForte },
    { label: 'Fino a', value: active.quickFacts.finoA },
  ]

  return (
    <div>
      {/* Selettore */}
      <div role="tablist" aria-label="Confronta i servizi" className="flex flex-wrap gap-3">
        {services.map((service) => {
          const isActive = service.key === activeKey
          const m = serviceMeta[service.key]
          return (
            <button
              key={service.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveKey(service.key)}
              className={cn(
                'rounded-full border px-5 py-2.5 font-medium transition-all duration-300',
                isActive
                  ? 'border-transparent text-bg-dark'
                  : 'border-current/25 opacity-70 hover:opacity-100 lg:hover:scale-105'
              )}
              style={isActive ? { backgroundColor: m.color } : undefined}
            >
              {m.label}
            </button>
          )
        })}
      </div>

      {/* Pannello */}
      <div className="relative mt-8 overflow-hidden rounded-3xl bg-bg-surface">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.key}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 p-8 md:p-12 xl:grid-cols-12"
          >
            <div className="xl:col-span-7">
              <p
                className="text-small font-medium uppercase tracking-[0.25em]"
                style={{ color: meta.color }}
              >
                {active.eyebrow}
              </p>
              <h3 className="h3-main mt-4">{active.h1}</h3>

              <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.label} className="border-t border-current/15 pt-4">
                    <dt className="text-small uppercase tracking-[0.15em] opacity-50">{fact.label}</dt>
                    <dd className="mt-1.5 font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href={meta.href}
                className="group mt-10 inline-flex items-center gap-3 font-semibold"
                style={{ color: meta.color }}
              >
                Approfondisci {meta.label}
                <span className="service-card-arrow">
                  <ArrowUpRight />
                </span>
              </Link>
            </div>

            <div
              className="hidden min-h-[16rem] items-center justify-center rounded-2xl p-8 xl:col-span-5 xl:flex"
              style={{ backgroundColor: meta.colorSoft }}
            >
              <div className="w-full max-w-xs">
                <Icon />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
