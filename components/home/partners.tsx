import Image from 'next/image'
import { partners } from '@/lib/content/it/home'

/**
 * Striscia partner a scorrimento infinito (da ashen): loghi reali su
 * chip chiari, lista duplicata per il loop senza stacchi.
 */
export function Partners() {
  const doubled = [...partners.items, ...partners.items]

  return (
    <section aria-label="Partner tecnologici" className="py-10 md:py-14">
      <p className="text-small mb-8 text-center font-medium uppercase tracking-[0.25em] opacity-65">
        {partners.label}
      </p>
      <div className="overflow-hidden" role="presentation">
        <ul className="animate-partners-scroll flex w-max items-center gap-4 pr-4">
          {doubled.map((p, i) => (
            <li
              key={`${p.name}-${i}`}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-bg-dark/10 bg-bg-light px-5"
              aria-hidden={i >= partners.items.length}
            >
              <Image
                src={p.logo}
                alt={i < partners.items.length ? `Partner ${p.name}` : ''}
                width={130}
                height={56}
                className="max-h-14 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
