import type { MetadataRoute } from 'next'

// Necessario con output: 'export' — senza questo il manifest è trattato come
// route dinamica e la build statica si interrompe.
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lettura quotidiana — psicologia del design',
    short_name: 'Lettura',
    description:
      'Studi, paper e case study di psicologia comportamentale applicata al design digitale, spiegati in italiano. Un numero al giorno.',
    lang: 'it',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    // standalone è un requisito per le Web Push su iOS, non una preferenza.
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f4f2ec',
    theme_color: '#f4f2ec',
    categories: ['education', 'productivity', 'news'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
