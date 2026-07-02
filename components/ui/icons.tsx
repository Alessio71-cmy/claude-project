import { cn } from '@/lib/utils'

/** Freccia diagonale usata in bottoni e card (da ashen). */
export function ArrowUpRight({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.86}
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path
        d="M2.18561 0.812464L8.52535 1.36712L7.9707 7.70686M8.04658 1.76886L1.05643 7.6343"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function ChevronDown({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path d="M4 6l4 4 4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlayIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={cn('shrink-0', className)}>
      <path d="M4.5 2.8a.6.6 0 0 1 .9-.52l8 5.2a.6.6 0 0 1 0 1.04l-8 5.2a.6.6 0 0 1-.9-.52V2.8z" />
    </svg>
  )
}

export function PauseIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={cn('shrink-0', className)}>
      <rect x="3.5" y="2.5" width="3.4" height="11" rx="1" />
      <rect x="9.1" y="2.5" width="3.4" height="11" rx="1" />
    </svg>
  )
}
