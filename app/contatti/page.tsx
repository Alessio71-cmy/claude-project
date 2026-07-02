import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Section } from '@/components/ui/container'
import { TitleRow } from '@/components/ui/title-row'
import { Reveal } from '@/components/motion/reveal'
import { CalendlyEmbed } from '@/components/contact/calendly'
import { ContactForm } from '@/components/contact/contact-form'
import { contact } from '@/lib/content/it/contact'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: contact.seo.title,
  description: contact.seo.description,
}

export default function ContattiPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-36 md:pt-44">
        <Reveal>
          <p className="text-small font-medium uppercase tracking-[0.25em] text-primary">
            {contact.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="h1-main mt-6 max-w-4xl">{contact.h1}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-base mt-8 max-w-2xl opacity-80">{contact.subtitle}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <ul className="text-small mt-8 flex flex-wrap gap-x-8 gap-y-2 opacity-75">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneHref}`} className="hover:text-primary">
                {site.phone}
              </a>
            </li>
            <li>Sedi {site.location}</li>
          </ul>
        </Reveal>
      </Section>

      {/* 1. Calendly — prima cosa che l'utente vede (5.7) */}
      <Section id="calendly" className="pt-4">
        <TitleRow
          eyebrow={contact.calendly.eyebrow}
          title={contact.calendly.heading}
          text={contact.calendly.description}
        />
        <Reveal className="mt-12">
          <CalendlyEmbed />
        </Reveal>
      </Section>

      {/* 2. Form a step wizard */}
      <Section id="form" className="pb-24 md:pb-32">
        <TitleRow
          eyebrow={contact.form.eyebrow}
          title={contact.form.heading}
          text={contact.form.description}
        />
        <Reveal className="mt-12">
          <Suspense fallback={<div className="h-[32rem] rounded-3xl bg-bg-surface" />}>
            <ContactForm />
          </Suspense>
        </Reveal>
      </Section>
    </>
  )
}
