import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'Core Network' }

export default function Page() {
  return <PageStub eyebrow="Servizi" title="Core Network" />
}
