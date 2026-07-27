import { notFound } from 'next/navigation'
import { Reader } from '@/components/reader'
import { getArticle, getArticles, getCatalogEntry, toSummary } from '@/lib/content'

export function generateStaticParams() {
  return getArticles().map((a) => ({ id: a.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const a = getArticle(id)
  return a ? { title: a.titleIt, description: a.preview.hook } : {}
}

export default async function ArticoloPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getArticle(id)
  if (!article) notFound()

  const entry = getCatalogEntry(article.catalogId)
  const related = article.related
    .map((rid) => getArticle(rid))
    .filter((a): a is NonNullable<typeof a> => !!a)
    .map(toSummary)

  return (
    <Reader
      article={article}
      fallbackUrl={entry?.fallbackUrl}
      linkVerified={entry?.linkVerified ?? false}
      related={related}
    />
  )
}
