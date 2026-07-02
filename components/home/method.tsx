import { TitleRow } from '@/components/ui/title-row'
import { Section, Container } from '@/components/ui/container'
import { PinnedSteps } from '@/components/motion/pinned-steps'
import AuditIcon from '@/components/icons/audit-icon'
import AccessIcon from '@/components/icons/access-icon'
import SecurityIcon from '@/components/icons/security-icon'
import TransferIcon from '@/components/icons/transfer-icon'
import { method } from '@/lib/content/it/home'

const iconMap = {
  audit: AuditIcon,
  access: AccessIcon,
  security: SecurityIcon,
  transfer: TransferIcon,
} as const

/**
 * Metodo di lavoro (5.1.4): processo a 4 fasi come sezione pinned
 * scroll-driven; su mobile degrada a lista verticale.
 */
export function Method() {
  return (
    <>
      <Section id="metodo" className="pb-0">
        <TitleRow eyebrow={method.eyebrow} title={method.title} text={method.description} />
      </Section>
      <Container>
        <PinnedSteps
          perStepVh={0.85}
          steps={method.steps.map((step) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap]
            return {
              label: step.label,
              title: step.title,
              text: step.text,
              visual: (
                <div className="flex min-h-[20rem] items-center justify-center rounded-3xl bg-bg-surface p-10 text-bg-light/90 md:min-h-[24rem]">
                  <div className="w-full max-w-sm">
                    <Icon forceInvert />
                  </div>
                </div>
              ),
            }
          })}
        />
      </Container>
    </>
  )
}
