import type { Metadata } from 'next'
import { Section } from '@/components/ui/container'
import { privacyLines } from '@/lib/content/it/privacy'

export const metadata: Metadata = {
  title: 'Informativa Privacy',
  description:
    'Informativa sul trattamento dei dati personali di KonnectAlps S.r.l. ai sensi del Regolamento (UE) 2016/679 (GDPR).',
  robots: { index: false },
}

/** Righe brevi senza punteggiatura finale = titoli di sezione dell'informativa. */
function isHeading(line: string) {
  return line.length < 80 && !/[.:;)]$/.test(line) && !/^[a-z]/.test(line)
}

export default function PrivacyPage() {
  const [title, ...rest] = privacyLines
  return (
    <Section className="pt-36 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <h1 className="h2-main">{title}</h1>
        <div className="mt-10 space-y-4">
          {rest.map((line, i) =>
            isHeading(line) ? (
              <h2 key={i} className="h3-support pt-6" style={{ color: 'var(--heading-color)' }}>
                {line}
              </h2>
            ) : (
              <p key={i} className="text-small leading-relaxed opacity-75">
                {line}
              </p>
            )
          )}
        </div>
      </div>
    </Section>
  )
}
