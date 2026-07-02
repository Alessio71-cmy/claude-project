'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Primitivi per form a step (sezione 5.7): indicatore di avanzamento
 * elegante + contenitore con transizioni animate tra gli step.
 * La logica del form resta nel componente che li usa (controllato).
 */

interface WizardProgressProps {
  steps: string[]
  current: number
  className?: string
}

export function WizardProgress({ steps, current, className }: WizardProgressProps) {
  return (
    <ol className={cn('flex items-center gap-3', className)} aria-label="Avanzamento del form">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'todo'
        return (
          <li key={label} className="flex flex-1 flex-col gap-2" aria-current={state === 'active' ? 'step' : undefined}>
            <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-current/15">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: 'var(--service-color)' }}
                initial={false}
                animate={{ width: state === 'todo' ? '0%' : '100%' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <span
              className={cn(
                'text-small transition-opacity duration-300',
                state === 'active' ? 'font-semibold opacity-100' : 'opacity-65'
              )}
            >
              {label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

interface WizardStepProps {
  /** Indice dello step corrente. */
  current: number
  /** Direzione di navigazione: 1 avanti, -1 indietro. */
  direction: 1 | -1
  children: React.ReactNode
  className?: string
}

/**
 * Contenitore animato: lo step entra dal lato verso cui si naviga.
 * `children` è il contenuto dello step corrente (keyed su `current`).
 */
export function WizardStep({ current, direction, children, className }: WizardStepProps) {
  const reduced = useReducedMotion()
  const offset = reduced ? 0 : 32 * direction

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: offset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -offset }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
