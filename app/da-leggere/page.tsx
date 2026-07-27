import { ArticleList } from '@/components/article-list'
import { getSummaries } from '@/lib/content'

export const metadata = { title: 'Da leggere' }

export default function DaLeggere() {
  return <ArticleList summaries={getSummaries()} mode="da-leggere" />
}
