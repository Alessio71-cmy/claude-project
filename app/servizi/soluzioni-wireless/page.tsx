import type { Metadata } from 'next'
import { ServicePage } from '@/components/services/service-page'
import { servicesBySlug } from '@/lib/content/it/services'

const content = servicesBySlug['soluzioni-wireless']

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
}

export default function Page() {
  return <ServicePage content={content} />
}
