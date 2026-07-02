import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'IoT' }

export default function Page() {
  return <PageStub eyebrow="Servizi" title="IoT" />
}
