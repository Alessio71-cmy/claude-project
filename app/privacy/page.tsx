import type { Metadata } from 'next'
import { PageStub } from '@/components/layout/page-stub'

export const metadata: Metadata = { title: 'Privacy' }

export default function Page() {
  return <PageStub title="Privacy Policy" />
}
