/**
 * Service worker: lettura offline e ricezione delle notifiche.
 *
 * La strategia è "network first, cache come rete di sicurezza" per le pagine e
 * "cache first" per gli asset immutabili. Il motivo è concreto: il contenuto
 * cambia una volta al giorno con una nuova build, e una cache troppo
 * aggressiva mostrerebbe il numero di ieri.
 */

const VERSIONE = 'lettura-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSIONE).then((cache) =>
      // Il guscio minimo per aprire l'app senza rete.
      cache.addAll(['/', '/da-leggere', '/letti', '/manifest.webmanifest']).catch(() => {}),
    ),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((chiavi) => Promise.all(chiavi.filter((k) => k !== VERSIONE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Asset con hash nel nome: immutabili, quindi cache first.
  const immutabile = url.pathname.startsWith('/_next/static/')

  if (immutabile) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((res) => {
            const copia = res.clone()
            caches.open(VERSIONE).then((c) => c.put(request, copia))
            return res
          }),
      ),
    )
    return
  }

  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const copia = res.clone()
          caches.open(VERSIONE).then((c) => c.put(request, copia))
        }
        return res
      })
      .catch(() =>
        caches.match(request).then((hit) => {
          if (hit) return hit
          // In aereo, una navigazione verso una pagina mai visitata ricade
          // sull'indice invece di mostrare l'errore del browser.
          if (request.mode === 'navigate') return caches.match('/')
          return new Response('', { status: 504, statusText: 'Offline' })
        }),
      ),
  )
})

self.addEventListener('push', (event) => {
  let dati = { titolo: 'Lettura quotidiana', corpo: 'Il numero di oggi ti aspetta.', url: '/' }
  try {
    if (event.data) dati = { ...dati, ...event.data.json() }
  } catch {
    if (event.data) dati.corpo = event.data.text()
  }

  event.waitUntil(
    self.registration.showNotification(dati.titolo, {
      body: dati.corpo,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      // Un tag fisso: se per qualche motivo arrivano due notifiche nello stesso
      // giorno, la seconda sostituisce la prima invece di accumularsi.
      tag: 'numero-del-giorno',
      data: { url: dati.url },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = event.notification.data?.url || '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((finestre) => {
      for (const f of finestre) {
        if ('focus' in f) {
          f.navigate?.(target)
          return f.focus()
        }
      }
      return self.clients.openWindow(target)
    }),
  )
})
