import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'CyberAlps — Cybersecurity' }

export default function Page() {
  return (
    <div data-service="cyberalps" data-theme="light">
      <PageStub eyebrow="CyberAlps" title="Cybersecurity" />
    </div>
  )
}
