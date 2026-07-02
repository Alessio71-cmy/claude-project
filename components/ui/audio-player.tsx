'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { PlayIcon, PauseIcon } from './icons'

interface AudioPlayerProps {
  /** URL del file audio; se assente il player è in stato "in arrivo". */
  src?: string
  /** Etichetta (es. "Italiano — prenotazione tavolo"). */
  label: string
  /** Sottotitolo opzionale (es. lingua o scenario). */
  sublabel?: string
  className?: string
  /** Notifica il parent quando parte la riproduzione (per fermare altri player). */
  onPlay?: () => void
}

function formatTime(s: number) {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/**
 * Audio player custom minimale (sezione 5.6): play/pausa circolare,
 * barra di avanzamento cliccabile, durata. Tinta = colore servizio corrente.
 */
export function AudioPlayer({ src, label, sublabel, className, onPlay }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)

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
  }, [src])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      onPlay?.()
      void audio.play()
      setPlaying(true)
    }
  }

  /** Pausa dall'esterno (coordinamento tra player multipli). */
  const pause = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    audio.currentTime = ratio * audio.duration
  }

  const disabled = !src

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-2xl border border-current/15 p-4 transition-colors',
        disabled && 'opacity-50',
        className
      )}
      data-audio-player
      data-playing={playing || undefined}
    >
      {src && <audio ref={audioRef} src={src} preload="metadata" data-pause-handler />}

      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-label={playing ? `Metti in pausa: ${label}` : `Ascolta: ${label}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-bg-dark transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--service-color)' }}
      >
        {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} className="translate-x-[1px]" />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate font-medium">{label}</p>
          <p className="text-small shrink-0 tabular-nums opacity-60">
            {disabled ? 'In arrivo' : `${formatTime(current)} / ${formatTime(duration)}`}
          </p>
        </div>
        {sublabel && <p className="text-small mt-0.5 opacity-60">{sublabel}</p>}
        <div
          className="group/track mt-2 cursor-pointer py-1.5"
          onClick={disabled ? undefined : seek}
          role="slider"
          aria-label={`Posizione audio: ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            const audio = audioRef.current
            if (!audio || !audio.duration) return
            if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.currentTime + 5, audio.duration)
            if (e.key === 'ArrowLeft') audio.currentTime = Math.max(audio.currentTime - 5, 0)
          }}
        >
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-current/15">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-150"
              style={{ width: `${progress * 100}%`, backgroundColor: 'var(--service-color)' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
