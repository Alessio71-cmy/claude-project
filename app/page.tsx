import Link from 'next/link'
import { DailyIndex } from '@/components/daily-index'
import { getQueue, getSummaries } from '@/lib/content'

export default function Oggi() {
  return (
    <>
      <DailyIndex summaries={getSummaries()} queue={getQueue().items} />
      <div className="mt-10 px-5">
        <hr className="rule" />
        <Link href="/impostazioni" className="label mt-4 inline-block">
          Impostazioni
        </Link>
      </div>
    </>
  )
}
