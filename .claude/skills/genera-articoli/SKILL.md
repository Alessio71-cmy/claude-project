---
name: genera-articoli
description: Genera gli articoli italiani della Lettura quotidiana a partire dalle voci di content/catalog/. Usa questa skill quando serve riempire la coda di lettura, promuovere candidate dal raccolto, o quando l'utente dice "genera articoli", "riempi la coda", "/genera-articoli N". Contiene la guida di stile, lo schema a 10 sezioni e le regole anti-allucinazione.
---

# Generare gli articoli della Lettura quotidiana

Questa skill è la **fonte unica del tono**. Vale identica se invocata dalla
Routine giornaliera, a mano da una sessione, o dallo script API: se il tono va
corretto si corregge qui, non nei singoli articoli.

## Il lavoro, in ordine

1. **Promuovi le candidate.** Leggi `content/catalog/_pending.json`. Prendine
   ~10. Per ciascuna decidi: **scartare** (fuori tema, troppo tecnica, non
   utile a un designer) o **promuovere**, aggiungendo i campi di giudizio
   (`relevance`, `depth`, `keyFindings`, `citationConfidence`). Le promosse
   vanno appese a `content/catalog/seed.json`, le scartate spariscono. Riscrivi
   `_pending.json` senza quelle lavorate.
2. **Scegli le voci da scrivere.** Cerca in `content/catalog/` le voci che non
   hanno ancora un file in `content/articles/<id>.json`. Default: **4**.
3. **Scrivi gli articoli**, uno per file, seguendo lo schema qui sotto.
4. **Aggiorna `content/queue.json`** (vedi § Coda).
5. **Valida**: `npm run validate` deve passare.
6. **Committa e pusha.** Un commit per lotto, messaggio
   `Articoli: <n> nuovi (<cluster più rappresentato>)`.

## Lo schema del file articolo

`content/articles/<catalogId>.json`. I campi ricalcano `lib/schema.ts`:

```jsonc
{
  "id": "<uguale a catalogId>",
  "catalogId": "johnson-2003-do-defaults-save-lives",
  "titleIt": "Titolo italiano, non una traduzione letterale",
  "titleOriginal": "…", "authors": ["…"], "year": 2003,
  "type": "studio", "venue": "Science",
  "sourceUrl": "…", "doi": "…",
  "topics": ["choice-architecture-nudge"],
  "relevance": "fondamentale",
  "depth": "approfondito",
  "citable": true,
  "preview": { "hook": "Due righe che invitano a entrare." },
  "sections": [ { "heading": "In due righe", "paragraphs": ["…"] }, … ],
  "keyNumbers": [ { "label": "adesione opt-out vs opt-in", "value": "~99% vs ~12-15%" } ],
  "wordCount": 2450,
  "readingMinutes": 13,
  "related": ["iyengar-2000-when-choice-is-demotivating"],
  "generatedAt": "2026-07-27",
  "model": "claude-sonnet-5"
}
```

`readingMinutes` = `Math.ceil(wordCount / 190)`. Conta le parole davvero, non
stimarle: c'è un test che confronta i due valori.

### Le 10 sezioni, in quest'ordine esatto

| Sezione | Cosa ci va | Lunghezza |
|---|---|---|
| **In due righe** | il nucleo, subito, senza preamboli | 2-3 frasi |
| **Perché ti serve** | l'applicazione al lavoro di Alessio: UX per B2B, freelance, università | 1 paragrafo |
| **Il contesto** | chi, quando, da quale domanda nasce il lavoro | 1-2 paragrafi |
| **Cosa hanno fatto** | il metodo in linguaggio piano, senza gergo statistico | 1-2 paragrafi |
| **Cosa è emerso** | i risultati e i numeri — **solo** quelli di `keyFindings` | 1-2 paragrafi |
| **Il meccanismo** | perché la testa funziona così | 1-2 paragrafi |
| **Come si applica nel digitale** | 2-3 esempi concreti di prodotti reali | 2-3 paragrafi |
| **Limiti e cautele** | repliche, effect size, cosa lo studio *non* dice | 1-2 paragrafi |
| **Da portarti dietro** | 3 frasi brevi, una per riga (un paragrafo ciascuna) | 3 righe |
| **Fonte e approfondimenti** | citazione completa + cosa leggere accanto | 1 paragrafo |

Il conteggio parole complessivo segue `depth`:
`breve` 700-950 · `standard` 1100-1700 · `approfondito` 2300-2800 ·
`dossier` 3400-4200.

## Le regole che non si negoziano

**1. Nessuna cifra che non sia in `keyFindings` o nell'`abstract` della voce.**
È la regola che tiene in piedi tutto il progetto. `scripts/validate-articles.mjs`
controlla che ogni valore in `keyNumbers` compaia nella voce di catalogo. Se ti
serve un numero che non hai, **non scriverlo**: descrivi la direzione
dell'effetto («aumenta sensibilmente») invece di inventare una percentuale.

**2. Scrivi i limiti per davvero.** La sezione «Limiti e cautele» non è un
disclaimer di rito. Se la voce ha `notes` che segnalano una meta-analisi
contraria, una replica fallita o un numero contestato, quella informazione va
nel testo. Un articolo che presenta come solido un effetto fragile è un danno,
perché finirà in un deck cliente.

**3. `citable` è vero solo con `citationConfidence: "primaria"`.** Il badge dice
al lettore «questi numeri li puoi mettere in una presentazione». Non mentire.

**4. Non ripetere, collega.** Prima di scrivere, guarda i titoli già presenti in
`content/articles/` dello stesso cluster. Se un meccanismo è già stato spiegato,
non rispiegarlo: cita l'articolo esistente in `related` e in
«Fonte e approfondimenti», e concentrati su ciò che questo lavoro aggiunge.

## Il tono

Scrivi come scriverebbe un buon divulgatore italiano che conosce il mestiere del
design: discorsivo, preciso, senza paternalismo.

- **Prosa, non elenchi.** Niente bullet fuori da «Da portarti dietro».
  Paragrafi di 3-5 frasi.
- **Seconda persona singolare** quando parli al lettore. Mai il «noi»
  editoriale, mai l'impersonale burocratico.
- **Frasi di lunghezza variabile.** Se tutte le frasi hanno la stessa
  ampiezza il testo diventa piatto anche quando il contenuto è buono.
- **Inglese solo dove è lo standard di settore** (*default*, *onboarding*,
  *paywall*, *dark pattern*), con una glossa alla prima occorrenza. Traduci
  tutto il resto: «riprova sociale», non «social proof».
- **Il titolo italiano non è una traduzione.** «Do Defaults Save Lives?»
  diventa «Chi non sceglie ha già scelto», non «I default salvano vite?».
- **Niente aperture di riscaldamento.** Non «Nel mondo di oggi…», non
  «Immagina di…». La prima frase entra nel merito.
- **Gli esempi sono concreti e verificabili.** «Il rinnovo automatico
  preselezionato nel checkout di un SaaS» sì; «molte app usano questa tecnica»
  no. Quando puoi, usa esempi visibili in Italia o in Europa.

### Errori di tono da evitare, con esempio

| No | Sì |
|---|---|
| «Questo studio dimostra in modo definitivo che…» | «Lo studio mostra, su un campione di studenti americani, che…» |
| «Gli utenti sono irrazionali» | «La scelta segue una scorciatoia che in altri contesti funziona bene» |
| «Come designer, dovremmo sempre…» | «Se stai progettando un checkout, la leva è…» |
| «È fondamentale notare che è importante…» | (taglia: dillo e basta) |

## Coda

`content/queue.json` è l'ordine di uscita:

```jsonc
{ "generatedAt": "2026-07-27T03:00:00Z",
  "items": [ { "id": "…", "readingMinutes": 13, "depth": "approfondito",
               "relevance": "fondamentale", "topics": ["…"] } ] }
```

**Mescola le profondità.** Il selettore del giorno riempie un budget di minuti
prendendo gli elementi in ordine: se metti in fila tre `dossier`, l'utente si
trova tre giornate da un solo pezzo lungo. Alterna così: `approfondito`,
`standard`, `breve`, `standard`, `approfondito`… e tieni i `dossier` distanziati
di almeno sei posizioni. **Appendi** in coda, non riordinare quello che c'è: le
posizioni già consumate sono registrate sul telefono.

## Quanti per volta

Default **4 al giorno** (~120/mese contro ~100 letti a ritmo normale: il
margine cresce). In una sessione manuale 8-12 è il massimo ragionevole prima
che la qualità cali. Se il budget del piano si esaurisce a metà, **fermati e
committa quello che hai fatto**: una coda con due articoli buoni in più è
meglio di un lotto abbandonato a metà.
