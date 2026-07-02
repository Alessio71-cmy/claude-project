'use client'

import { useState } from 'react'
import { WizardProgress, WizardStep } from '@/components/ui/wizard'
import { Button } from '@/components/ui/button'

const steps = ['Chi sei', 'Contatti', 'Richiesta']

export function WizardDemo() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const go = (dir: 1 | -1) => {
    setDirection(dir)
    setCurrent((c) => Math.min(Math.max(c + dir, 0), steps.length - 1))
  }

  return (
    <div className="max-w-xl">
      <WizardProgress steps={steps} current={current} />
      <WizardStep current={current} direction={direction} className="mt-8">
        <div className="rounded-2xl border border-current/15 p-8">
          <h4 className="h4-main">{steps[current]}</h4>
          <p className="text-base mt-2 opacity-75">
            Contenuto di esempio dello step {current + 1}. Le transizioni seguono la direzione di
            navigazione.
          </p>
        </div>
      </WizardStep>
      <div className="mt-6 flex gap-3">
        <Button variant="ghost-light" size="sm" withIcon={false} onClick={() => go(-1)} disabled={current === 0}>
          Indietro
        </Button>
        <Button size="sm" withIcon={false} onClick={() => go(1)} disabled={current === steps.length - 1}>
          Avanti
        </Button>
      </div>
    </div>
  )
}
