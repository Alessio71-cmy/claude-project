import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'Servizi' }

export default function Page() {
  return <PageStub eyebrow="Servizi" title="Overview servizi" text="Connettività, VoIP, IoT, Core Network e Soluzioni Wireless per il Trentino-Alto Adige." />
}
