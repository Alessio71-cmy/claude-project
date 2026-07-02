"use client"

import * as React from "react"
import { useInView, useReducedMotion } from "framer-motion"

type AnimatedCounterProps = {
  /** Valore da visualizzare. Viene animata la prima sequenza numerica trovata. */
  value: string
  className?: string
  durationSec?: number
}

/**
 * Anima il conteggio partendo da zero all'entrata nel viewport, preservando
 * caratteri di contorno (+, %, /7, decimali...). Disattivato se l'utente preferisce motion ridotto.
 */
export function AnimatedCounter({ value, className, durationSec = 1.6 }: AnimatedCounterProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = React.useState(value)

  React.useEffect(() => {
    // Trova il primo numero (supporta virgole o punti come separatore decimale)
    const match = value.match(/(\d+(?:[.,]\d+)?)/)

    if (!inView || reduce || !match) {
      setDisplay(value)
      return
    }

    const raw = match[1]
    const sep = raw.includes(",") ? "," : "."
    const decimals = raw.includes(",") || raw.includes(".") ? raw.split(/[.,]/)[1].length : 0
    const target = parseFloat(raw.replace(",", "."))
    
    const start = performance.now()
    const durationMs = durationSec * 1000
    let frame = 0

    // Easing cubic ease-out per rallentare verso la fine dell'animazione
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      const current = (target * ease(t)).toFixed(decimals).replace(".", sep)
      setDisplay(value.replace(raw, current))

      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, value, durationSec])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  )
}
