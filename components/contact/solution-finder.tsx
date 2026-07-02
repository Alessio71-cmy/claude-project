'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { serviceMeta, type ServiceKey } from '@/lib/site'
import { cn } from '@/lib/utils'

const profiles = ['Privato', 'Azienda', 'Pubblica Amministrazione', 'Associazione']

const needs: { label: string; key: ServiceKey }[] = [
  { label: 'Internet più veloce e stabile', key: 'connettivita' },
  { label: 'Telefonia aziendale', key: 'voip' },
  { label: 'Sensori e monitoraggio', key: 'iot' },
  { label: 'Collegare più sedi', key: 'core-network' },
  { label: 'Wi-Fi per la struttura', key: 'wireless' },
  { label: 'Proteggere la rete', key: 'cyberalps' },
]

/**
 * "Trova la soluzione per te" (sezione 7): due domande rapide che portano
 * al form contatti con tipologia e oggetto già precompilati.
 * Non un funnel separato: un orientamento gentile, pensato per le PMI.
 */
export function SolutionFinder({ className }: { className?: string }) {
  const router = useRouter()
  const [profile, setProfile] = useState('Azienda')
  const [need, setNeed] = useState<ServiceKey | null>(null)

  const go = () => {
    const params = new URLSearchParams({ tipologia: profile })
    if (need) params.set('servizio', need)
    router.push(`/contatti?${params.toString()}#form`)
  }

  return (
    <div className={cn('rounded-3xl bg-bg-surface p-8 md:p-12', className)}>
      <p className="text-small font-medium uppercase tracking-[0.25em] text-primary">
        Trova la soluzione per te
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <fieldset>
          <legend className="h3-support mb-4">Chi sei?</legend>
          <div className="flex flex-wrap gap-2.5">
            {profiles.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={profile === p}
                onClick={() => setProfile(p)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                  profile === p
                    ? 'border-transparent bg-primary text-bg-dark'
                    : 'border-current/25 opacity-85 hover:opacity-100'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="h3-support mb-4">Di cosa hai bisogno?</legend>
          <div className="flex flex-wrap gap-2.5">
            {needs.map((n) => (
              <button
                key={n.key}
                type="button"
                aria-pressed={need === n.key}
                onClick={() => setNeed(need === n.key ? null : n.key)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                  need === n.key
                    ? 'border-transparent text-bg-dark'
                    : 'border-current/25 opacity-85 hover:opacity-100'
                )}
                style={need === n.key ? { backgroundColor: serviceMeta[n.key].color } : undefined}
              >
                {n.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-10">
        <Button onClick={go} withIcon>
          Vai al form precompilato
        </Button>
      </div>
    </div>
  )
}
