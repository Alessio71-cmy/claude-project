#!/usr/bin/env node
/**
 * Genera le icone PNG dal marchio, in tre varianti che NON sono la stessa
 * immagine ridimensionata:
 *
 *   icon-192 / icon-512      full-bleed, per il manifest ("any")
 *   apple-touch-icon (180)   full-bleed: iOS applica la sua maschera, e
 *                            un'icona già arrotondata finisce con un doppio
 *                            bordo visibile
 *   icon-maskable-512        full-bleed con il marchio rimpicciolito dentro
 *                            la safe zone dell'80%, altrimenti Android
 *                            taglia le righe del paragrafo
 *
 * Nessun PNG è arrotondato: l'arrotondamento vive solo in icon.svg, dove il
 * browser lo mostra come favicon. Su un PNG opaco sarebbe comunque invisibile
 * (lo sfondo dietro l'angolo è dello stesso inchiostro) e su Android
 * produrrebbe un doppio raggio.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public')

const INK = '#17150F'
const PAPER = '#F4F2EC'
const RUBRIC = '#B8564A'

/**
 * Il marchio, parametrico sulla scala. `scale` 1 = il marchio riempie il
 * riquadro come nell'icona normale; valori minori lo rimpiccioliscono
 * mantenendolo centrato (serve per la variante maskable).
 */
function mark({ rounded, scale = 1 }) {
  // Il blocco occupa 104..408 in orizzontale (59% del riquadro) e 153..360 in
  // verticale, centrato: abbastanza pieno da leggersi come marchio e non come
  // un dettaglio perso in mezzo al vuoto.
  const lines = [
    { y: 153, w: 112, h: 30, fill: RUBRIC },
    { y: 217, w: 304, h: 17, fill: PAPER },
    { y: 259, w: 304, h: 17, fill: PAPER },
    { y: 301, w: 248, h: 17, fill: PAPER },
    { y: 343, w: 128, h: 17, fill: PAPER },
  ]

  const rects = lines
    .map((l) => `<rect x="104" y="${l.y}" width="${l.w}" height="${l.h}" rx="4" fill="${l.fill}"/>`)
    .join('')

  // Scala attorno al centro del riquadro (256,256).
  const group =
    scale === 1
      ? rects
      : `<g transform="translate(256 256) scale(${scale}) translate(-256 -256)">${rects}</g>`

  return `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512"${rounded ? ' rx="112"' : ''} fill="${INK}"/>
  ${group}
</svg>`
}

const variants = [
  { name: 'icon-192.png', svg: mark({ rounded: false }), size: 192 },
  { name: 'icon-512.png', svg: mark({ rounded: false }), size: 512 },
  { name: 'apple-touch-icon.png', svg: mark({ rounded: false }), size: 180 },
  { name: 'icon-maskable-512.png', svg: mark({ rounded: false, scale: 0.72 }), size: 512 },
]

await mkdir(outDir, { recursive: true })

for (const v of variants) {
  const png = await sharp(Buffer.from(v.svg))
    .resize(v.size, v.size)
    // Sfondo opaco: un apple-touch-icon con alpha viene reso su nero da iOS.
    .flatten({ background: INK })
    .png({ compressionLevel: 9 })
    .toBuffer()
  await writeFile(join(outDir, v.name), png)
  console.log(`✓ ${v.name} (${v.size}×${v.size}, ${(png.length / 1024).toFixed(1)} kB)`)
}

console.log('\nIcone generate in public/.')
