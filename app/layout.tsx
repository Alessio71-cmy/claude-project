import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { site } from '@/lib/site'
import { SmoothScrollProvider } from '@/components/motion/smooth-scroll'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'KonnectAlps — Connettività, VoIP e IoT in Trentino-Alto Adige',
    template: '%s | KonnectAlps',
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: site.url,
    siteName: site.name,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={roboto.variable}>
      <body>
        <SmoothScrollProvider>
          <Header />
          <main id="contenuto">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
