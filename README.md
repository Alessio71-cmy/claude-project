# KonnectAlps — Rebuild

Sito di KonnectAlps (konnectalps.it): connettività, VoIP, IoT, core network,
soluzioni wireless, CyberAlps e Agent AI per il Trentino-Alto Adige.

## Stack

- **Next.js** (App Router, tutte le pagine statiche) + **Tailwind CSS 4**
- **Framer Motion** per micro-interazioni e sezioni scroll-driven, **Lenis** per lo smooth scroll
- Nessun CMS: contenuti in `lib/content/it/` (struttura per locale, pronta per multilingua/CMS)
- Font: **Clash Display** (display, Fontshare) + **Roboto** (testo)

## Avvio

```bash
npm install
npm run dev     # scarica Clash Display al primo avvio (scripts/fetch-fonts.mjs)
npm run build && npm start
```

I file di Clash Display non sono committati (licenza ITF): vengono scaricati
da Fontshare alla prima build. Forza il download con `npm run fonts`.

## Variabili d'ambiente

| Variabile | Uso |
|---|---|
| `RESEND_API_KEY` | invio email del form contatti (senza chiave il form propone il fallback mailto) |
| `CONTACT_TO` / `CONTACT_FROM` | destinatario/mittente delle richieste (default `info@konnectalps.it`) |

## Struttura

- `app/` — routing (home, servizi/…, about/…, cyberalps, agent-ai, contatti, privacy)
- `components/ui` — design system (bottoni, card, tabella comparativa, wizard, audio player)
- `components/motion` — particelle hero, reveal, contatori, pinned steps, hotspot, transizioni
- `components/icons` — icone SVG animate dei servizi (portate dal sito ashen)
- `lib/content/it` — tutti i testi, per pagina
- `lib/site.ts` — dati aziendali e mapping colore→servizio (vincolante, sezione 2.2 del brief)
- `app/styleguide` — riferimento interno del design system (noindex)

## Design system (vincoli)

Palette, mapping colore→servizio e tipografia seguono il brief di progetto e
non vanno modificati: i token sono in `app/globals.css` (`:root` + `@theme`).
Il colore di un servizio si applica con `data-service="…"` sul wrapper di pagina;
`data-theme="light"` attiva il tema chiaro (usato da CyberAlps).
