'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Transizione di pagina (sezione 6): ogni navigazione entra con un
 * fade-up breve e coerente col resto del motion. Montato in app/template.tsx,
 * che Next re-monta a ogni cambio di rotta. Solo transform/opacity.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  if (reduce) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
