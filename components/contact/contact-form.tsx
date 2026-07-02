'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { WizardProgress, WizardStep } from '@/components/ui/wizard'
import { Button } from '@/components/ui/button'
import { contact } from '@/lib/content/it/contact'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

interface FormData {
  tipologia: string
  azienda: string
  ruolo: string
  nome: string
  cognome: string
  email: string
  telefono: string
  via: string
  civico: string
  oggetto: string
  messaggio: string
  privacy: boolean
}

const inputClass =
  'w-full rounded-xl border border-current/20 bg-transparent px-4 py-3 text-base transition-colors placeholder:opacity-35 focus:border-primary focus:outline-none'

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={cn('block', className)}>
      <span className="text-small mb-2 block font-medium opacity-80">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  )
}

/**
 * Form a step wizard (5.7.2): tre step logici con transizioni animate,
 * validazione per step e precompilazione via query param
 * (?servizio= dalle CTA delle pagine servizio, ?tipologia= dal
 * componente di orientamento).
 */
export function ContactForm() {
  const params = useSearchParams()

  const initialSubject = useMemo(() => {
    const servizio = params.get('servizio')
    return (servizio && contact.serviceSubjects[servizio]) || ''
  }, [params])

  const initialTipologia = useMemo(() => {
    const t = params.get('tipologia')
    return t && contact.form.tipologie.includes(t) ? t : ''
  }, [params])

  const [data, setData] = useState<FormData>({
    tipologia: initialTipologia,
    azienda: '',
    ruolo: '',
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    via: '',
    civico: '',
    oggetto: initialSubject,
    messaggio: '',
    privacy: false,
  })
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'fallback'>('idle')

  const set = (key: keyof FormData, value: string | boolean) => {
    setData((d) => ({ ...d, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validateStep = (s: number): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (s === 1) {
      if (!data.nome.trim()) errs.nome = 'Campo obbligatorio'
      if (!data.cognome.trim()) errs.cognome = 'Campo obbligatorio'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Inserisci un’email valida'
      if (!data.telefono.trim() || data.telefono.replace(/\D/g, '').length < 6)
        errs.telefono = 'Inserisci un numero valido'
      if (!data.via.trim()) errs.via = 'Campo obbligatorio'
      if (!data.civico.trim()) errs.civico = 'Campo obbligatorio'
    }
    if (s === 2) {
      if (!data.oggetto.trim()) errs.oggetto = 'Campo obbligatorio'
      if (!data.messaggio.trim()) errs.messaggio = 'Campo obbligatorio'
      if (!data.privacy) errs.privacy = 'Il consenso è necessario per rispondere alla richiesta'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const go = (dir: 1 | -1) => {
    if (dir === 1 && !validateStep(step)) return
    setDirection(dir)
    setStep((s) => Math.min(Math.max(s + dir, 0), 2))
  }

  const mailtoHref = useMemo(() => {
    const body = encodeURIComponent(
      `${data.messaggio}\n\n---\n${data.nome} ${data.cognome}\n${data.tipologia}${data.azienda ? ` — ${data.azienda}` : ''}\nTel: ${data.telefono}\nIndirizzo: ${data.via} ${data.civico}`
    )
    return `mailto:${site.email}?subject=${encodeURIComponent(data.oggetto)}&body=${body}`
  }, [data])

  const submit = async () => {
    if (!validateStep(2)) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('fallback')
      }
    } catch {
      setStatus('fallback')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-bg-surface p-10 text-center md:p-16" role="status">
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-bg-dark"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor">
            <path d="M4 11.5l5 5L18 6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="h3-main mt-6">{contact.form.success.title}</h3>
        <p className="text-base mx-auto mt-4 max-w-md opacity-75">{contact.form.success.text}</p>
      </div>
    )
  }

  return (
    <form
      className="rounded-3xl bg-bg-surface p-6 md:p-10"
      onSubmit={(e) => {
        e.preventDefault()
        if (step < 2) go(1)
        else void submit()
      }}
      noValidate
    >
      <WizardProgress steps={contact.form.steps} current={step} />

      <WizardStep current={step} direction={direction} className="mt-10 min-h-[20rem]">
        {step === 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Tipologia utente" className="md:col-span-2">
              <select
                className={cn(inputClass, 'appearance-none')}
                value={data.tipologia}
                onChange={(e) => set('tipologia', e.target.value)}
              >
                <option value="" className="bg-bg-surface">
                  — Seleziona —
                </option>
                {contact.form.tipologie.map((t) => (
                  <option key={t} value={t} className="bg-bg-surface">
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Nome azienda / ente">
              <input
                type="text"
                className={inputClass}
                placeholder="KonnectAlps"
                value={data.azienda}
                onChange={(e) => set('azienda', e.target.value)}
                autoComplete="organization"
              />
            </Field>
            <Field label="Ruolo / qualifica">
              <input
                type="text"
                className={inputClass}
                placeholder="Account Manager"
                value={data.ruolo}
                onChange={(e) => set('ruolo', e.target.value)}
                autoComplete="organization-title"
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Nome" required>
              <input
                type="text"
                className={inputClass}
                placeholder="Guglielmo"
                value={data.nome}
                onChange={(e) => set('nome', e.target.value)}
                autoComplete="given-name"
                aria-invalid={!!errors.nome}
              />
              {errors.nome && <p className="text-small mt-1.5 text-support-orange">{errors.nome}</p>}
            </Field>
            <Field label="Cognome" required>
              <input
                type="text"
                className={inputClass}
                placeholder="Marconi"
                value={data.cognome}
                onChange={(e) => set('cognome', e.target.value)}
                autoComplete="family-name"
                aria-invalid={!!errors.cognome}
              />
              {errors.cognome && (
                <p className="text-small mt-1.5 text-support-orange">{errors.cognome}</p>
              )}
            </Field>
            <Field label="E-mail" required>
              <input
                type="email"
                className={inputClass}
                placeholder="nome@azienda.it"
                value={data.email}
                onChange={(e) => set('email', e.target.value)}
                autoComplete="email"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-small mt-1.5 text-support-orange">{errors.email}</p>}
            </Field>
            <Field label="Numero di telefono" required>
              <input
                type="tel"
                className={inputClass}
                placeholder="+39 …"
                value={data.telefono}
                onChange={(e) => set('telefono', e.target.value)}
                autoComplete="tel"
                aria-invalid={!!errors.telefono}
              />
              {errors.telefono && (
                <p className="text-small mt-1.5 text-support-orange">{errors.telefono}</p>
              )}
            </Field>
            <Field label="Via / piazza" required>
              <input
                type="text"
                className={inputClass}
                placeholder="Via Alto Adige"
                value={data.via}
                onChange={(e) => set('via', e.target.value)}
                autoComplete="address-line1"
                aria-invalid={!!errors.via}
              />
              {errors.via && <p className="text-small mt-1.5 text-support-orange">{errors.via}</p>}
            </Field>
            <Field label="Numero civico" required>
              <input
                type="text"
                className={inputClass}
                placeholder="60"
                value={data.civico}
                onChange={(e) => set('civico', e.target.value)}
                aria-invalid={!!errors.civico}
              />
              {errors.civico && (
                <p className="text-small mt-1.5 text-support-orange">{errors.civico}</p>
              )}
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6">
            <Field label="Oggetto del messaggio" required>
              <input
                type="text"
                className={inputClass}
                placeholder="Es. consulenza connettività per la nostra sede"
                value={data.oggetto}
                onChange={(e) => set('oggetto', e.target.value)}
                aria-invalid={!!errors.oggetto}
              />
              {errors.oggetto && (
                <p className="text-small mt-1.5 text-support-orange">{errors.oggetto}</p>
              )}
            </Field>
            <Field label="Messaggio" required>
              <textarea
                className={cn(inputClass, 'min-h-[9rem] resize-y')}
                placeholder="Raccontaci l’esigenza: sedi, numero di persone, cosa non funziona oggi…"
                value={data.messaggio}
                onChange={(e) => set('messaggio', e.target.value)}
                aria-invalid={!!errors.messaggio}
              />
              {errors.messaggio && (
                <p className="text-small mt-1.5 text-support-orange">{errors.messaggio}</p>
              )}
            </Field>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={data.privacy}
                onChange={(e) => set('privacy', e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[var(--primary)]"
                aria-invalid={!!errors.privacy}
              />
              <span className="text-small opacity-75">
                {contact.form.privacyText}{' '}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
                  Privacy Policy
                </Link>
                . <span className="text-primary">*</span>
              </span>
            </label>
            {errors.privacy && <p className="text-small -mt-3 text-support-orange">{errors.privacy}</p>}

            {/* Riepilogo */}
            <div className="rounded-2xl border border-current/15 p-5">
              <p className="text-small mb-2 font-semibold uppercase tracking-[0.15em] opacity-50">
                Riepilogo
              </p>
              <p className="text-small opacity-75">
                {data.nome} {data.cognome}
                {data.tipologia && ` · ${data.tipologia}`}
                {data.azienda && ` · ${data.azienda}`}
                <br />
                {data.email} · {data.telefono}
              </p>
            </div>

            {status === 'fallback' && (
              <div className="rounded-2xl border border-support-orange/40 p-5" role="alert">
                <p className="text-small opacity-90">
                  L’invio diretto non è al momento disponibile. Puoi inviare la stessa richiesta
                  con il tuo client di posta:{' '}
                  <a href={mailtoHref} className="font-semibold text-primary underline underline-offset-2">
                    apri l’email precompilata
                  </a>{' '}
                  oppure scrivici a {site.email}.
                </p>
              </div>
            )}
          </div>
        )}
      </WizardStep>

      <div className="mt-10 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="ghost-light"
          withIcon={false}
          onClick={() => go(-1)}
          className={cn(step === 0 && 'invisible')}
        >
          Indietro
        </Button>
        {step < 2 ? (
          <Button type="submit" withIcon>
            Continua
          </Button>
        ) : (
          <Button type="submit" withIcon disabled={status === 'sending'}>
            {status === 'sending' ? 'Invio in corso…' : 'Invia la richiesta'}
          </Button>
        )}
      </div>
    </form>
  )
}
