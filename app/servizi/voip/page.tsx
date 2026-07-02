import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'VoIP & Fonia' }

export default function Page() {
  return <PageStub eyebrow="Servizi" title="VoIP & Fonia" />
}
