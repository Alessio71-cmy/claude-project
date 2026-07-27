import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Newsreader } from 'next/font/google'
import { TabBar } from '@/components/tab-bar'
import './globals.css'

const display = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

const body = Newsreader({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-newsreader',
})

export const metadata: Metadata = {
  title: {
    default: 'Lettura quotidiana',
    template: '%s · Lettura quotidiana',
  },
  description:
    'Psicologia comportamentale applicata al design digitale: studi, paper e case study spiegati in italiano, un numero al giorno.',
  applicationName: 'Lettura quotidiana',
  // Obbligatorio per le Web Push su iOS: la PWA deve poter girare standalone.
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lettura',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  formatDetection: { telephone: false, date: false, address: false, email: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // viewport-fit=cover + env(safe-area-inset-*) nel CSS: senza questo,
  // in standalone il contenuto finisce sotto il notch e la home bar.
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f2ec' },
    { media: '(prefers-color-scheme: dark)', color: '#111110' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="relative z-1 mx-auto flex min-h-[100dvh] max-w-[42rem] flex-col">
          <main id="contenuto" className="flex-1 pb-24">
            {children}
          </main>
          <TabBar />
        </div>
      </body>
    </html>
  )
}
