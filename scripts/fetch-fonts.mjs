/**
 * Scarica Clash Display (Fontshare, ITF Free Font License) in public/fonts/clash-display.
 *
 * I file del font non sono committati nel repo (la licenza Fontshare non consente
 * la ridistribuzione standalone dei file): vengono scaricati alla prima build.
 * Se i file esistono già o la rete non è disponibile, lo script non blocca la build —
 * in quel caso i titoli usano il fallback di sistema definito in globals.css.
 */
import { mkdir, writeFile, access } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

const OUT_DIR = path.join(process.cwd(), 'public', 'fonts', 'clash-display')

// Endpoint CSS di Fontshare: restituisce i @font-face con gli URL woff2 correnti.
const FONTSHARE_CSS = 'https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap'

const WEIGHTS = ['400', '500', '600', '700']
const fileFor = (weight) => `ClashDisplay-${weight}.woff2`

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

async function main() {
  const missing = []
  for (const w of WEIGHTS) {
    if (!(await exists(path.join(OUT_DIR, fileFor(w))))) missing.push(w)
  }
  if (missing.length === 0) {
    console.log('[fonts] Clash Display già presente, nessun download necessario.')
    return
  }

  console.log(`[fonts] Scarico Clash Display (pesi mancanti: ${missing.join(', ')})…`)
  await mkdir(OUT_DIR, { recursive: true })

  const cssRes = await fetch(FONTSHARE_CSS, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; konnectalps-build)' },
  })
  if (!cssRes.ok) throw new Error(`Fontshare CSS: HTTP ${cssRes.status}`)
  const css = await cssRes.text()

  // Estrae coppie (peso, url woff2) dai blocchi @font-face.
  const blocks = css.split('@font-face').slice(1)
  const byWeight = new Map()
  for (const block of blocks) {
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1]
    const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1]
    if (weight && url && !byWeight.has(weight)) byWeight.set(weight, url)
  }

  for (const w of missing) {
    const url = byWeight.get(w)
    if (!url) {
      console.warn(`[fonts] Peso ${w} non trovato nel CSS Fontshare, salto.`)
      continue
    }
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Download peso ${w}: HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(path.join(OUT_DIR, fileFor(w)), buf)
    const hash = createHash('sha256').update(buf).digest('hex').slice(0, 8)
    console.log(`[fonts] ${fileFor(w)} (${(buf.length / 1024).toFixed(0)} kB, sha256:${hash})`)
  }
  console.log('[fonts] Clash Display pronto.')
}

main().catch((err) => {
  console.warn(`[fonts] Download non riuscito (${err.message}).`)
  console.warn('[fonts] La build continua: i titoli useranno il font di fallback finché')
  console.warn('[fonts] non esegui `npm run fonts` da una rete con accesso a fontshare.com.')
})
