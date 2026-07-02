'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface UseCaseTab {
  title: string
  text: string
  items: { title: string; text: string }[]
}

/** Tab interattive dei casi d'uso Agent AI (pattern coerente con ServiceExplorer). */
export function AgentAiUseCases({ tabs }: { tabs: UseCaseTab[] }) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const tab = tabs[active]

  return (
    <div>
      <div role="tablist" aria-label="Casi d'uso" className="flex flex-wrap gap-3">
        {tabs.map((t, i) => (
          <button
            key={t.title}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'rounded-full border px-5 py-2.5 font-medium transition-all duration-300',
              i === active
                ? 'border-transparent bg-support-viola text-bg-dark'
                : 'border-current/25 opacity-85 hover:opacity-100 lg:hover:scale-105'
            )}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-3xl bg-bg-surface">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-12"
          >
            <p className="text-base max-w-2xl opacity-80">{tab.text}</p>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {tab.items.map((item) => (
                <div key={item.title} className="border-t border-current/15 pt-4">
                  <h3 className="h3-support text-support-viola">{item.title}</h3>
                  <p className="text-small mt-2 leading-relaxed opacity-75">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
