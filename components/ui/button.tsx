import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from './icons'

export type ButtonVariant = 'primary' | 'ghost-light' | 'ghost-dark' | 'solid-dark'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Mostra il cerchio con la freccia diagonale (ruota all'hover). */
  withIcon?: boolean
  className?: string
  children: React.ReactNode
}

type ButtonProps = ButtonBaseProps &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'>)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)
  )

const variantClass: Record<ButtonVariant, string> = {
  primary: 'button--primary',
  'ghost-light': 'button--ghost-light',
  'ghost-dark': 'button--ghost-dark',
  'solid-dark': 'button--solid-dark',
}

export function Button({
  variant = 'primary',
  size = 'md',
  withIcon = true,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'button',
    variantClass[variant],
    size === 'sm' && 'button--sm',
    size === 'lg' && 'button--lg',
    className
  )

  const content = (
    <>
      {children}
      {withIcon && (
        <span className="button__icon">
          <ArrowUpRight />
        </span>
      )}
    </>
  )

  if ('href' in props && typeof props.href === 'string') {
    const { href, ...rest } = props as { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
