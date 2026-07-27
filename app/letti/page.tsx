import { ArticleList } from '@/components/article-list'
import { getSummaries } from '@/lib/content'

export const metadata = { title: 'Letti' }

export default function Letti() {
  return <ArticleList summaries={getSummaries()} mode="letti" />
}
