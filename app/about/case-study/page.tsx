import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'Case study' }

export default function Page() {
  return <PageStub eyebrow="About" title="Case study" />
}
