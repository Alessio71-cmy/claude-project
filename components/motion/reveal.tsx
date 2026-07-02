'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  /** Ritardo in secondi (per stagger manuale tra elementi fratelli). */
  delay?: number
  /** Distanza di ingresso in px. */
  y?: number
  className?: string
  /** Elemento contenitore. */
  as?: 'div' | 'section' | 'li' | 'span'
  once?: boolean
}

/**
 * Reveal on-scroll: fade-up morbido all'ingresso nel viewport.
 * Curva e distanza riprese dalle animazioni validate di ashen
 * (cubic-bezier(0.16, 1, 0.3, 1), 40px). Solo transform/opacity.
 */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div', once = true }: RevealProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  if (reduce) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}

/**
 * Gruppo con stagger automatico: i figli diretti entrano in sequenza.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

/** Elemento figlio di RevealGroup. */
export function RevealItem({
  children,
  className,
  y = 40,
}: {
  children: React.ReactNode
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}
