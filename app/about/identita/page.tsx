import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'La nostra identità' }

export default function Page() {
  return <PageStub eyebrow="About" title="La nostra identità" />
}
