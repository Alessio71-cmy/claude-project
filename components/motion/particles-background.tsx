'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  size: number
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null
}

function getParticleColor(): { r: number; g: number; b: number } {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--bg-light').trim()
  return hexToRgb(value) || { r: 255, g: 255, b: 250 }
}

/**
 * Sfondo a pallini reattivi al mouse della hero (portato da ashen e migliorato):
 * - rendering nitido su schermi ad alta densità (devicePixelRatio)
 * - repulsione morbida con ritorno elastico alla posizione base
 * - coordinate mouse relative al canvas (corretto anche se la hero non è a y=0)
 * - pausa completa quando la hero esce dal viewport o il tab è nascosto
 * - su mobile: meno particelle, 30fps, nessuna interazione, niente glow
 * - rispetta prefers-reduced-motion (render statico singolo)
 */
export function ParticlesBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let color = getParticleColor()
    const mouse = { x: -9999, y: -9999 }
    let raf = 0
    let running = true
    let visible = true
    let inViewport = true

    const buildParticles = () => {
      const density = isMobile ? 8000 : 2500
      const count = Math.floor((width * height) / density)
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width
        const y = Math.random() * height
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseX: x,
          baseY: y,
          size: Math.random() * 1 + 0.9,
        }
      })
    }

    const resize = () => {
      const parent = canvas.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildParticles()
    }
    resize()

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      const { r, g, b } = color
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.35)`
        ctx.fill()
      }
    }

    if (prefersReducedMotion) {
      drawStatic()
      const onResize = () => {
        resize()
        drawStatic()
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onMouseLeave)
    }
    window.addEventListener('resize', resize)

    const onVisibility = () => {
      visible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Pausa quando la hero non è visibile: zero lavoro in background
    const io = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting
    })
    io.observe(canvas)

    let last = 0
    const minInterval = isMobile ? 33 : 16
    const repelRadius = 180

    const animate = (now: number) => {
      if (!running) return
      raf = requestAnimationFrame(animate)
      if (!visible || !inViewport) return
      if (now - last < minInterval) return
      last = now

      ctx.clearRect(0, 0, width, height)
      const { r, g, b } = color

      for (const p of particles) {
        if (isMobile) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = width
          if (p.x > width) p.x = 0
          if (p.y < 0) p.y = height
          if (p.y > height) p.y = 0

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`
          ctx.fill()
        } else {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const distance = Math.hypot(dx, dy)

          if (distance < repelRadius) {
            const force = (repelRadius - distance) / repelRadius
            const smooth = force * force
            const angle = Math.atan2(dy, dx)
            p.x -= Math.cos(angle) * smooth * 2.2
            p.y -= Math.sin(angle) * smooth * 2.2
          } else {
            // ritorno elastico morbido alla posizione base
            p.x += (p.baseX - p.x) * 0.03
            p.y += (p.baseY - p.y) * 0.03
          }

          p.baseX += p.vx
          p.baseY += p.vy
          if (p.baseX < 0) p.baseX = width
          if (p.baseX > width) p.baseX = 0
          if (p.baseY < 0) p.baseY = height
          if (p.baseY > height) p.baseY = 0

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.6)`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }
    }
    raf = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.4,
        pointerEvents: 'none',
      }}
    />
  )
}
