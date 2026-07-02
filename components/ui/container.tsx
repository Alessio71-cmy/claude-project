import { cn } from '@/lib/utils'

/** Contenitore principale: larghezza massima e padding orizzontale coerenti. */
export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('mx-auto w-full max-w-screen-2xl px-5 md:px-10', className)}>{children}</div>
}

/** Sezione di pagina con spaziatura verticale coerente. */
export function Section({
  id,
  className,
  containerClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  containerClassName?: string
}) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
