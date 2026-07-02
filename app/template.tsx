import { PageTransition } from '@/components/motion/page-transition'

/** Re-montato a ogni navigazione: applica la transizione di pagina. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
