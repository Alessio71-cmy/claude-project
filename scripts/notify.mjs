#!/usr/bin/env node
/**
 * Manda il promemoria delle 10:00 all'iPhone.
 *
 * Nessun modello coinvolto: legge la coda, compone una riga e la spedisce.
 *
 * Il fallimento è deliberatamente rumoroso. Avendo scelto le sole Web Push
 * senza email di riserva, se l'iscrizione scade la notifica smetterebbe di
 * arrivare in silenzio: qui un 410/404 fa uscire lo script con errore, il
 * workflow diventa rosso e GitHub manda l'email di fallimento. Quell'email è
 * la rete di sicurezza.
 *
 * Uso:
 *   node scripts/notify.mjs
 *   node scripts/notify.mjs --dry-run   compone il messaggio senza spedirlo
 */
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import webpush from 'web-push'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const DRY_RUN = process.argv.includes('--dry-run')

const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, PUSH_SUBSCRIPTION, SITE_URL } = process.env

async function leggiCoda() {
  const p = join(root, 'content', 'queue.json')
  if (!existsSync(p)) return []
  try {
    const q = JSON.parse(await readFile(p, 'utf8'))
    return Array.isArray(q.items) ? q.items : []
  } catch {
    return []
  }
}

async function leggiTitoli(ids) {
  const titoli = []
  for (const id of ids) {
    const p = join(root, 'content', 'articles', `${id}.json`)
    if (!existsSync(p)) continue
    try {
      titoli.push(JSON.parse(await readFile(p, 'utf8')).titleIt)
    } catch {
      /* un articolo illeggibile non deve impedire la notifica */
    }
  }
  return titoli
}

/**
 * Il workflow non conosce lo stato del telefono (cursore, letti): quello vive
 * nel localStorage. Quindi il messaggio non promette un numero preciso di
 * articoli — dice che il numero c'è e anticipa un titolo, che è già un buon
 * innesco senza rischiare di mentire.
 */
function componi(titoli) {
  if (titoli.length === 0) {
    return { titolo: 'Lettura quotidiana', corpo: 'Il numero di oggi ti aspetta.', url: '/' }
  }
  const primo = titoli[0]
  const altri = titoli.length - 1
  return {
    titolo: 'Il numero di oggi',
    corpo: altri > 0 ? `${primo} — e altre letture.` : primo,
    url: '/',
  }
}

async function main() {
  const coda = await leggiCoda()
  const titoli = await leggiTitoli(coda.slice(0, 3).map((i) => i.id))
  const payload = componi(titoli)

  console.log('Messaggio:', JSON.stringify(payload))

  if (DRY_RUN) {
    console.log('(dry run: non spedisco)')
    return
  }

  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !PUSH_SUBSCRIPTION) {
    console.error(
      'Mancano i secret. Servono VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY e PUSH_SUBSCRIPTION\n' +
        '(le prime due da `npx web-push generate-vapid-keys`, la terza copiata\n' +
        "dalle Impostazioni dell'app dopo aver attivato le notifiche).",
    )
    process.exit(1)
  }

  webpush.setVapidDetails(
    SITE_URL || 'mailto:alessioruggera2@gmail.com',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY,
  )

  let subscription
  try {
    subscription = JSON.parse(PUSH_SUBSCRIPTION)
  } catch {
    console.error('PUSH_SUBSCRIPTION non è JSON valido: ricopialo dalle Impostazioni.')
    process.exit(1)
  }

  try {
    const res = await webpush.sendNotification(subscription, JSON.stringify(payload))
    console.log(`✓ Spedita (HTTP ${res.statusCode})`)
  } catch (err) {
    const code = err?.statusCode
    if (code === 410 || code === 404) {
      console.error(
        `L'iscrizione push non è più valida (HTTP ${code}).\n` +
          'Riapri le Impostazioni sul telefono, riattiva le notifiche e aggiorna\n' +
          'il secret PUSH_SUBSCRIPTION. Questo fallimento è voluto: senza email di\n' +
          'riserva, il rosso di questo workflow è il modo in cui te ne accorgi.',
      )
    } else {
      console.error(`Invio fallito (HTTP ${code ?? '?'}):`, err?.body || err?.message || err)
    }
    process.exit(1)
  }
}

main().catch((e) => {
  console.error('Notifica interrotta:', e)
  process.exit(1)
})
