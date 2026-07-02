import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'Contatti' }

export default function Page() {
  return <PageStub eyebrow="Contatti" title="Parliamo del tuo progetto" />
}
