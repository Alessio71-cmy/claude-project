'use client'

import { useEffect, useState } from 'react'

/**
 * Attivazione delle Web Push, con i vincoli iOS trattati come vincoli e non
 * come casi limite:
 *
 *  1. su iPhone le push funzionano SOLO se la PWA è sulla schermata Home;
 *     dal browser l'API non esiste nemmeno
 *  2. il permesso va chiesto da un gesto dell'utente dentro l'app installata,
 *     mai all'avvio
 *  3. l'iscrizione va portata a mano nel secret GitHub PUSH_SUBSCRIPTION,
 *     perché non c'è backend a cui inviarla
 */

const VAPID = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ''

/**
 * La chiave VAPID arriva in base64url e `applicationServerKey` vuole byte.
 * Il buffer va allocato esplicitamente: `Uint8Array.from(...)` produce un
 * `Uint8Array<ArrayBufferLike>`, che TypeScript rifiuta perché potrebbe essere
 * uno SharedArrayBuffer.
 */
function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(b64)
  const view = new Uint8Array(new ArrayBuffer(raw.length))
  for (let i = 0; i < raw.length; i += 1) view[i] = raw.charCodeAt(i)
  return view
}

type Stato = 'sconosciuto' | 'non-installata' | 'non-supportata' | 'pronta' | 'attiva' | 'negata'

export function PushSetup() {
  const [stato, setStato] = useState<Stato>('sconosciuto')
  const [iscrizione, setIscrizione] = useState<string | null>(null)
  const [errore, setErrore] = useState<string | null>(null)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // Safari su iOS espone questa proprietà non standard.
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true

    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      // Su iOS, fuori dalla PWA installata, PushManager non esiste: il messaggio
      // giusto è «aggiungi alla Home», non «browser non supportato».
      setStato(standalone ? 'non-supportata' : 'non-installata')
      return
    }
    if (!standalone && /iphone|ipad|ipod/i.test(navigator.userAgent)) {
      setStato('non-installata')
      return
    }
    if (Notification.permission === 'denied') return setStato('negata')

    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => {
        if (sub) {
          setIscrizione(JSON.stringify(sub))
          setStato('attiva')
        } else {
          setStato('pronta')
        }
      })
      .catch(() => setStato('pronta'))
  }, [])

  async function attiva() {
    setErrore(null)
    try {
      if (!VAPID) {
        setErrore(
          'Manca NEXT_PUBLIC_VAPID_PUBLIC_KEY nella build. Genera le chiavi VAPID e ricompila (vedi README).',
        )
        return
      }
      const permesso = await Notification.requestPermission()
      if (permesso !== 'granted') {
        setStato(permesso === 'denied' ? 'negata' : 'pronta')
        return
      }
      const reg = await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID),
      })
      setIscrizione(JSON.stringify(sub))
      setStato('attiva')
    } catch (e) {
      setErrore(e instanceof Error ? e.message : String(e))
    }
  }

  return (
    <section className="mt-10">
      <h2 className="label">Promemoria delle 10:00</h2>

      {stato === 'non-installata' && (
        <p className="mt-2 text-small text-ink-soft">
          Su iPhone le notifiche funzionano solo se questa app è sulla schermata Home. Apri il menu
          di condivisione di Safari, scegli <strong>Aggiungi a Home</strong>, poi torna qui da
          quell&apos;icona. È un vincolo di Apple, non una scelta di questa app.
        </p>
      )}

      {stato === 'non-supportata' && (
        <p className="mt-2 text-small text-ink-soft">
          Questo browser non espone le Web Push. Su iPhone serve iOS 16.4 o successivo.
        </p>
      )}

      {stato === 'negata' && (
        <p className="mt-2 text-small text-ink-soft">
          Le notifiche sono state rifiutate. Per riattivarle serve passare dalle impostazioni di
          sistema: il browser non permette di richiedere di nuovo il permesso.
        </p>
      )}

      {stato === 'pronta' && (
        <>
          <p className="mt-2 text-small text-ink-soft">
            Un promemoria al giorno, alle 10:00, con i titoli del numero. Niente altro. Puoi
            rifiutare adesso e attivarle più tardi: entrambe le cose vanno bene.
          </p>
          <button
            type="button"
            onClick={attiva}
            className="mt-3 w-full border border-ink px-4 py-3 text-small"
          >
            Attiva le notifiche
          </button>
        </>
      )}

      {stato === 'attiva' && iscrizione && (
        <>
          <p className="mt-2 text-small text-ink-soft">
            Notifiche attive su questo dispositivo. Manca un passaggio, una volta sola: copia
            l&apos;iscrizione qui sotto e incollala nel secret GitHub{' '}
            <code className="text-micro">PUSH_SUBSCRIPTION</code>. Serve perché non c&apos;è un
            server a cui inviarla — è il workflow a spedire la notifica.
          </p>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(iscrizione)}
            className="mt-3 w-full border border-ink px-4 py-3 text-small"
          >
            Copia l&apos;iscrizione
          </button>
          <textarea
            readOnly
            value={iscrizione}
            rows={4}
            aria-label="Iscrizione push da copiare"
            className="mt-2 w-full border border-rule bg-transparent p-2 font-mono text-micro"
          />
        </>
      )}

      {errore && <p className="mt-3 text-small text-accent">{errore}</p>}
    </section>
  )
}
