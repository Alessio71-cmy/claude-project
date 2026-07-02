import { cn } from '@/lib/utils'

interface TitleRowProps {
  /** Etichetta piccola sopra il titolo (es. nome sezione). */
  eyebrow?: string
  title: React.ReactNode
  /** Testo di accompagnamento, affiancato al titolo su desktop. */
  text?: React.ReactNode
  /** Segmento di linea sopra la riga (linguaggio grafico ashen). */
  lineAbove?: boolean
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  titleClassName?: string
  id?: string
}

/**
 * Riga titolo di sezione: linea corta + eyebrow + titolo display,
 * con testo opzionale affiancato (griglia 12 colonne su xl).
 */
export function TitleRow({
  eyebrow,
  title,
  text,
  lineAbove = true,
  as: Tag = 'h2',
  className,
  titleClassName,
  id,
}: TitleRowProps) {
  return (
    <div className={cn('w-full', className)}>
      {lineAbove && (
        <div className="mb-10 grid grid-cols-3 gap-x-6 md:grid-cols-6 xl:grid-cols-12">
          <div className="col-span-1 border-t border-current opacity-60 xl:col-span-2" aria-hidden="true" />
        </div>
      )}
      <div className="grid grid-cols-1 items-end gap-x-6 gap-y-6 xl:grid-cols-12">
        <div className={cn('xl:col-span-7', !text && 'xl:col-span-9')}>
          {eyebrow && (
            <p className="text-small mb-3 font-medium uppercase tracking-[0.2em] opacity-70">{eyebrow}</p>
          )}
          <Tag id={id} className={cn(Tag === 'h1' ? 'h1-main' : 'h2-main', titleClassName)}>
            {title}
          </Tag>
        </div>
        {text && (
          <div className="xl:col-span-5">
            <div className="text-base max-w-prose opacity-80">{text}</div>
          </div>
        )}
      </div>
    </div>
  )
}
