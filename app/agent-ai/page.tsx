import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'Agent AI' }

export default function Page() {
  return (
    <div data-service="agent-ai">
      <PageStub eyebrow="Agent AI" title="Il tuo agente vocale AI" />
    </div>
  )
}
