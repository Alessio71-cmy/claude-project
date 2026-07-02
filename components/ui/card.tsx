import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from './icons'

/** Card base su superficie scura. */
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-3xl bg-bg-surface p-6', className)} {...props}>
      {children}
    </div>
  )
}

interface ServiceCardProps {
  title: string
  description?: string
  href: string
  /** Sfondo soft del servizio (es. var(--support-yellow-soft)). */
  background: string
  /** Slot per l'icona SVG animata del servizio. */
  icon?: React.ReactNode
  badge?: { text: string; color: string }
  className?: string
  iconWrapperClassName?: string
}

/**
 * Card servizio (linguaggio ashen): sfondo soft del colore dedicato,
 * cerchio scuro con freccia in alto a destra (ruota all'hover),
 * icona SVG animata al centro, titolo e descrizione in basso.
 */
export function ServiceCard({
  title,
  description,
  href,
  background,
  icon,
  badge,
  className,
  iconWrapperClassName,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 ease-in-out lg:hover:scale-[1.02]',
        className
      )}
      style={{ backgroundColor: background }}
    >
      <div className="mb-6 flex w-full justify-end">
        <span
          className="service-card-arrow flex h-8 w-8 items-center justify-center rounded-full bg-bg-dark transition-transform duration-300 xl:group-hover:scale-110"
          style={{ color: background }}
        >
          <ArrowUpRight />
        </span>
      </div>

      <div
        className={cn(
          'relative flex min-h-[180px] w-full flex-1 items-center justify-center overflow-hidden md:min-h-[220px]',
          iconWrapperClassName
        )}
      >
        {icon}
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <h3 className="h3-main flex items-center gap-2 !text-bg-dark">
          {title}
          {badge && (
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white"
              style={{ backgroundColor: badge.color }}
            >
              {badge.text}
            </span>
          )}
        </h3>
        {description && <p className="text-small leading-relaxed text-bg-dark/80">{description}</p>}
      </div>
    </Link>
  )
}
