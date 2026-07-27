# Lettura quotidiana

Psicologia comportamentale applicata al design digitale: studi, paper e case
study spiegati in italiano, **un numero al giorno**, calibrato sui minuti che
vuoi dedicarci. PWA per iPhone, nessun account, **nessun costo oltre il piano
Claude Pro**.

```
API aperte (Crossref/OpenAlex/arXiv)
      │  harvest-catalog.yml — settimanale, GitHub Actions, ZERO token
      ▼
content/catalog/_pending.json    candidate con DOI, citazioni, abstract
      │  Routine giornaliera — promuove ~10, scarta il rumore
      ▼
content/catalog/*.json           fonti verificate (i numeri vengono dagli abstract)
      │  stessa Routine — scrive 4 articoli
      ▼
content/articles/*.json  +  content/queue.json
      │  push → build statica
      ▼
PWA   alle 7:00 locali pesca dalla coda quanto riempie il tuo budget di minuti
      10:00 → notifica push
```

Due proprietà tengono in piedi il resto: **generazione e consegna sono
disaccoppiate** (gli articoli sono scritti giorni prima, quindi un ritardo non
si vede e si legge offline) e **il rifornimento supera il consumo** (~120
articoli generati al mese contro ~100 letti, quindi il margine cresce e non
esiste un giorno in cui il materiale finisce).

---

## Cosa devi fare tu, in ordine

### 1. Attivare i workflow — 30 secondi, obbligatorio

I file in `ci/workflows/` **non sono attivi**: vanno spostati in
`.github/workflows/`. Le credenziali della sessione che li ha scritti non
avevano lo scope `workflow`. Istruzioni in [`ci/README.md`](ci/README.md).

### 2. Verificare il raccolto — il controllo che non ho potuto fare

*Actions → Raccolto fonti → Run workflow*, con `dry_run` attivo.

Nel log devi vedere righe `✓ openalex …` con candidate maggiori di zero e una
percentuale alta di abstract. **Questa verifica è rimasta aperta**: nell'ambiente
di sviluppo `api.openalex.org` e `api.crossref.org` rispondono 403 per policy di
rete dell'organizzazione, e il README del proxy dice di riportare il blocco
invece di aggirarlo. La logica di trasformazione è coperta da 29 test (inclusa
l'inversione dell'indice invertito di OpenAlex, il punto più facile da sbagliare
in silenzio), ma che le API rispondano con la forma attesa si vede solo da un
runner.

### 3. Verificare i link del catalogo

*Actions → Validazione → Run workflow* con `check_links` attivo, oppure in
locale `node scripts/validate-catalog.mjs --check-links --fix-verified`.

Nel catalogo seed **nessun link è verificato** (`linkVerified: false`) e l'app lo
dice al lettore invece di far scoprire un 404. Non avendo potuto controllare
nessun URL, non ho inventato DOI: dove non ero certo ho messo un link di ricerca,
e ogni voce ha un `fallbackUrl`.

### 4. Notifiche sull'iPhone

```sh
npx web-push generate-vapid-keys
```

Metti la pubblica e la privata nei secret `VAPID_PUBLIC_KEY` e
`VAPID_PRIVATE_KEY`, e la pubblica anche come variabile di build
`NEXT_PUBLIC_VAPID_PUBLIC_KEY` su Vercel. Poi:

1. apri l'app su Safari e fai **Aggiungi a Home** — su iPhone le push
   funzionano *solo* dalla PWA installata, è un vincolo di Apple
2. da quell'icona: *Impostazioni → Attiva le notifiche*
3. copia l'iscrizione e incollala nel secret `PUSH_SUBSCRIPTION`
4. prova con *Actions → Promemoria delle 10 → Run workflow*

Hai scelto le sole push, senza email di riserva. Se l'iscrizione scade la
notifica smetterebbe di arrivare in silenzio, quindi `notify.mjs` **esce con
errore** su 410/404: il workflow diventa rosso e l'email di fallimento di GitHub
diventa la rete di sicurezza.

### 5. La Routine giornaliera

Da una sessione Claude Code, una Routine alle 03:00 con questo prompt:

> Leggi `.claude/skills/genera-articoli/SKILL.md` e seguila: promuovi ~10
> candidate da `content/catalog/_pending.json`, scrivi 4 articoli nuovi,
> aggiorna `content/queue.json`, esegui `npm run validate`, committa e pusha.

In alternativa, a mano quando vuoi: `/genera-articoli 10`.

---

## Comandi

| | |
|---|---|
| `npm run dev` | sviluppo |
| `npm run build` | build statica in `out/` |
| `npm test` | 65 test (usa `TZ=Europe/Rome`: i test sull'ora legale altrimenti passano banalmente) |
| `npm run validate` | catalogo + articoli, incluso il test anti-allucinazione |
| `npm run harvest -- --dry-run` | raccolto fonti (richiede rete verso le API aperte) |
| `npm run icons` | rigenera le icone da `public/icon.svg` |
| `npm run notify -- --dry-run` | compone la notifica senza spedirla |

## Come è fatto

| | |
|---|---|
| `lib/reading.ts` | il cuore: selezione del giorno (pura, quindi testabile), ripetizione spaziata, date in ora locale |
| `lib/storage.ts` | localStorage, con export/import |
| `lib/schema.ts` | la forma dei dati, condivisa fra app, generatore e validatori |
| `.claude/skills/genera-articoli/` | la guida di stile: **la fonte unica del tono** |
| `scripts/harvest-lib.mjs` | i mapper delle API, con 29 test |
| `scripts/validate-articles.mjs` | il test anti-allucinazione |

**Design.** Direzione «quaderno di studio»: la separazione è un filetto e non
un'ombra, la gerarchia è tipografica e non cromatica, un solo accento oxblood
usato con parsimonia. Instrument Serif per i titoli, Newsreader per il corpo.
La rilevanza è un marcatore di *forma* diversa (quadrato pieno / cerchio pieno /
anello vuoto), non tre pillole colorate: si distingue anche senza percepire il
colore.

## Regole che il codice fa rispettare

1. **Nessuna cifra inventata.** Ogni valore in `keyNumbers` deve comparire nella
   voce di catalogo. `validate-articles.mjs` fallisce altrimenti. È la risposta
   strutturale alla nota con cui chiudevi il tuo brief.
2. **`citable` solo con fonte primaria.** Il badge promette numeri da
   presentazione: se la fonte è secondaria, la validazione blocca.
3. **`wordCount` e `readingMinutes` sono ricalcolati**, non creduti: da loro
   dipende quanti articoli vedi al giorno.

## Limiti, dichiarati

- **Lo stato vive solo su questo telefono.** Cancellare i dati di Safari azzera
  i progressi; cambiando telefono non ti seguono. L'export JSON in Impostazioni
  è la via di recupero.
- **Il seed sono 25 voci, non 200.** Verificare 200 fonti senza rete sarebbe
  stata una promessa non mantenuta. Il volume arriva dal raccolto automatico.
- **Due articoli scritti**, come taratura del tono. Leggili: se il tono non ti
  convince si corregge `SKILL.md`, non i singoli articoli.
- **`schedule` funziona solo dal branch di default.** Finché questo branch non lo
  è, i cron vanno lanciati a mano.
- **Il credito del piano è il solo limite reale.** Non è una spesa, ma non è
  infinito: se un mese usi molto Claude Code per lavoro la generazione rallenta,
  e il margine accumulato serve ad assorbirlo.
