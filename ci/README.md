# Workflow da attivare a mano

I file in `ci/workflows/` sono workflow GitHub Actions pronti all'uso, ma **non
sono ancora attivi**: vanno spostati in `.github/workflows/`.

## Perché non ci sono già

Le credenziali della sessione Claude Code che li ha scritti non hanno lo scope
`workflow`, e nemmeno la GitHub App ha il permesso *Workflows: write*. GitHub
rifiuta quindi sia il push via git:

```
refusing to allow an OAuth App to create or update workflow
.github/workflows/harvest-catalog.yml without `workflow` scope
```

sia la scrittura via API (un 404 che maschera il permesso mancante). Non è un
problema del contenuto dei file: è un limite di autorizzazione, e va sbloccato
da una persona.

## Come attivarli

Una delle due, indifferente:

**A — dal browser (30 secondi).** Su GitHub, per ogni file in `ci/workflows/`:
apri il file, *Copy raw contents*, poi *Add file → Create new file*, incolla e
salva come `.github/workflows/<nome>.yml`.

**B — da locale.**

```sh
git clone <repo> && cd claude-project
git checkout claude/behavioral-psychology-daily-app-grnxnp
mkdir -p .github/workflows && cp ci/workflows/*.yml .github/workflows/
git add .github/workflows && git commit -m "Attiva i workflow" && git push
```

## Cosa succede appena sono attivi

| Workflow | Quando | Cosa fa |
|---|---|---|
| `harvest-catalog.yml` | lunedì 02:00 (Europe/Rome), o a mano | Pesca fonti nuove da Crossref, OpenAlex e arXiv e le mette in `content/catalog/_pending.json` |

**Prima cosa da fare dopo l'attivazione:** lanciare il raccolto a mano
(*Actions → Raccolto fonti → Run workflow*) con `dry_run` attivo. È la
verifica che nella sessione di sviluppo non è stato possibile fare, perché la
policy di rete di quell'ambiente blocca `api.openalex.org` e
`api.crossref.org` con un 403. Nel log devi vedere righe `✓ openalex ...` con
un numero di candidate maggiore di zero, e nel riepilogo una percentuale di
abstract alta. Se vedi `✗ ... HTTP 403` anche sul runner, allora il problema è
altrove e va indagato.

## Un limite di GitHub da conoscere

I trigger `schedule` funzionano **solo dal branch di default**. Finché questo
branch non è quello di default (o non è stato mergiato), il cron settimanale
non parte da sé: va lanciato con *Run workflow*. I trigger `push` e
`workflow_dispatch` invece funzionano su qualsiasi branch.
