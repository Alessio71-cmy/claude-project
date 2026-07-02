'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PlayIcon, PauseIcon } from '@/components/ui/icons'

interface DemoLanguage {
  code: string
  flag: string
  label: string
  src?: string
}

function formatTime(s: number) {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/**
 * Demo Agent AI (5.6): selettore lingua + waveform animata + player.
 * La waveform "respira" quando l'audio è in riproduzione; le barre sono
 * animate solo via transform (performance). Le lingue senza file audio
 * mostrano lo stato "in arrivo" (slot predisposti per i file reali).
 */
export function AgentAiDemo({ languages }: { languages: DemoLanguage[] }) {
  const reduce = useReducedMotion()
  const [langIndex, setLangIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const lang = languages[langIndex]
  const disabled = !lang.src

  // Altezze pseudo-casuali ma stabili per le barre della waveform
  const bars = useMemo(() => {
    const n = 48
    return Array.from({ length: n }, (_, i) => {
      const t = Math.sin(i * 12.9898) * 43758.5453
      const r = t - Math.floor(t)
      const envelope = Math.sin((i / (n - 1)) * Math.PI) // più alte al centro
      return 0.25 + r * 0.75 * (0.35 + envelope * 0.65)
    })
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      setCurrent(audio.currentTime)
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    }
    const onMeta = () => setDuration(audio.duration)
    const onEnd = () => {
      setPlaying(false)
      setProgress(0)
      setCurrent(0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    // i metadata possono essere già disponibili prima dell'attach dei listener
    if (audio.readyState >= 1) onMeta()
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [lang.src])

  const selectLang = (i: number) => {
    audioRef.current?.pause()
    setPlaying(false)
    setProgress(0)
    setCurrent(0)
    setLangIndex(i)
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || disabled) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      void audio.play()
      setPlaying(true)
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    audio.currentTime = ratio * audio.duration
  }

  return (
    <div className="rounded-3xl bg-bg-surface p-6 md:p-10">
      {lang.src && <audio ref={audioRef} src={lang.src} preload="metadata" />}

      {/* Selettore lingua */}
      <div role="tablist" aria-label="Lingua della demo" className="flex flex-wrap gap-3">
        {languages.map((l, i) => (
          <button
            key={l.code}
            role="tab"
            aria-selected={i === langIndex}
            onClick={() => selectLang(i)}
            className={cn(
              'flex items-center gap-2 rounded-full border px-4 py-2 font-medium transition-all duration-300',
              i === langIndex
                ? 'border-transparent bg-support-viola text-bg-dark'
                : 'border-current/25 opacity-85 hover:opacity-100'
            )}
          >
            <span aria-hidden="true">{l.flag}</span>
            {l.label}
            {!l.src && <span className="text-xs opacity-90">(in arrivo)</span>}
          </button>
        ))}
      </div>

      {/* Waveform + play */}
      <div className="mt-10 flex items-center gap-6">
        <button
          type="button"
          onClick={toggle}
          disabled={disabled}
          aria-label={playing ? `Pausa demo ${lang.label}` : `Ascolta demo ${lang.label}`}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-support-viola text-bg-dark transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {playing ? <PauseIcon size={22} /> : <PlayIcon size={22} className="translate-x-[2px]" />}
        </button>

        <div className="min-w-0 flex-1">
          <div
            className={cn('flex h-20 items-center gap-[3px] md:gap-1', disabled && 'opacity-30')}
            onClick={disabled ? undefined : seek}
            role={disabled ? undefined : 'slider'}
            aria-label="Posizione audio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              const audio = audioRef.current
              if (!audio || !audio.duration) return
              if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.currentTime + 5, audio.duration)
              if (e.key === 'ArrowLeft') audio.currentTime = Math.max(audio.currentTime - 5, 0)
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                toggle()
              }
            }}
          >
            {bars.map((h, i) => {
              const played = i / bars.length <= progress
              return (
                <span
                  key={i}
                  className="block w-full flex-1 origin-center rounded-full transition-colors duration-200"
                  style={{
                    height: `${h * 100}%`,
                    backgroundColor: played ? 'var(--support-viola)' : 'rgba(255,255,250,0.22)',
                    animation:
                      playing && !reduce
                        ? `agent-wave 1.1s ease-in-out ${(i % 8) * 0.09}s infinite`
                        : undefined,
                  }}
                />
              )
            })}
          </div>
          <div className="text-small mt-2 flex justify-between tabular-nums opacity-70">
            <span>{disabled ? 'Campione in preparazione' : formatTime(current)}</span>
            <span>{disabled ? '—' : formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
