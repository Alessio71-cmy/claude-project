import { describe, expect, it } from 'vitest'
import {
  abstractFromInvertedIndex,
  cleanAbstract,
  dedupe,
  makeId,
  mapCrossrefItem,
  mapOpenAlexWork,
  mapType,
  normaliseDoi,
  normaliseTitle,
  parseArxivEntries,
} from './harvest-lib.mjs'

/** Costruisce un indice invertito da una frase, come fa OpenAlex. */
function invert(sentence) {
  const index = {}
  sentence.split(' ').forEach((word, i) => {
    ;(index[word] ??= []).push(i)
  })
  return index
}

const ABSTRACT_LUNGO =
  'Defaults have a large effect on organ donation rates because most people do not actively choose either way and simply accept whatever option is already selected for them.'

describe('abstractFromInvertedIndex', () => {
  it('ricostruisce la frase nell’ordine giusto', () => {
    expect(abstractFromInvertedIndex(invert(ABSTRACT_LUNGO))).toBe(ABSTRACT_LUNGO)
  })

  it('rimette a posto le parole ripetute', () => {
    // "the" compare tre volte in posizioni diverse: se l'inversione fosse
    // sbagliata, le occorrenze finirebbero tutte nello stesso posto.
    const frase =
      'the effect of the default option is larger than the effect that designers usually expect from it'
    expect(abstractFromInvertedIndex(invert(frase))).toBe(frase)
  })

  it('scarta i buchi invece di renderli come undefined', () => {
    const conBuco = { alpha: [0], gamma: [2] } // posizione 1 mai assegnata
    // Troppo corto per superare la soglia di cleanAbstract, ma non deve
    // contenere "undefined" da nessuna parte.
    const out = abstractFromInvertedIndex(conBuco) ?? ''
    expect(out).not.toContain('undefined')
  })

  it('regge input assenti o malformati', () => {
    expect(abstractFromInvertedIndex(null)).toBeUndefined()
    expect(abstractFromInvertedIndex(undefined)).toBeUndefined()
    expect(abstractFromInvertedIndex({ parola: 'non un array' })).toBeUndefined()
    expect(abstractFromInvertedIndex({ x: [-1] })).toBeUndefined()
  })
})

describe('cleanAbstract', () => {
  it('toglie il markup JATS di Crossref', () => {
    const jats = `<jats:p>${ABSTRACT_LUNGO}</jats:p>`
    expect(cleanAbstract(jats)).toBe(ABSTRACT_LUNGO)
  })

  it('toglie il prefisso "Abstract" che molti editori includono', () => {
    expect(cleanAbstract(`Abstract: ${ABSTRACT_LUNGO}`)).toBe(ABSTRACT_LUNGO)
  })

  it('decodifica le entità senza creare doppie decodifiche', () => {
    const out = cleanAbstract(
      'Participants read &quot;you are free to choose&quot; and then decided whether to accept the request &amp; donate.',
    )
    expect(out).toContain('"you are free to choose"')
    expect(out).toContain('& donate')
  })

  it('scarta gli abstract troppo corti per essere utili', () => {
    expect(cleanAbstract('Breve.')).toBeUndefined()
  })
})

describe('normalizzazione', () => {
  it('normalizza i DOI a forma canonica', () => {
    expect(normaliseDoi('https://doi.org/10.1126/SCIENCE.1091721')).toBe('10.1126/science.1091721')
    expect(normaliseDoi('http://dx.doi.org/10.1234/ABC')).toBe('10.1234/abc')
    expect(normaliseDoi('10.1234/abc')).toBe('10.1234/abc')
    expect(normaliseDoi(null)).toBeNull()
    expect(normaliseDoi('')).toBeNull()
  })

  it('spoglia i titoli di accenti e punteggiatura per confrontarli', () => {
    expect(normaliseTitle('Do Defaults Save Lives?')).toBe('do defaults save lives')
    // Due grafie dello stesso lavoro devono collassare nella stessa chiave,
    // altrimenti la deduplicazione non funziona.
    expect(normaliseTitle('Évocation de la liberté')).toBe(normaliseTitle('Evocation de la liberte'))
  })

  it('costruisce id leggibili da entrambe le forme di autore', () => {
    expect(makeId(['Johnson, Eric J.'], 2003, 'Do Defaults Save Lives?')).toBe(
      'johnson-2003-do-defaults-save-lives',
    )
    expect(makeId(['Eric J. Johnson'], 2003, 'Do Defaults Save Lives?')).toBe(
      'johnson-2003-do-defaults-save-lives',
    )
  })

  it('non produce id vuoti quando i metadati mancano', () => {
    expect(makeId([], null, 'Titolo')).toBe('anon-sd-titolo')
  })

  it('mappa i tipi delle API sui tipi dello schema', () => {
    expect(mapType('journal-article')).toBe('studio')
    expect(mapType('proceedings-article')).toBe('paper')
    expect(mapType('book-chapter')).toBe('libro')
    expect(mapType('posted-content')).toBe('paper')
    expect(mapType('monograph')).toBe('libro')
    expect(mapType(undefined)).toBe('paper')
  })
})

describe('mapOpenAlexWork', () => {
  const work = {
    id: 'https://openalex.org/W2000000001',
    doi: 'https://doi.org/10.1126/science.1091721',
    display_name: 'Do Defaults Save Lives?',
    publication_year: 2003,
    cited_by_count: 2841,
    type: 'journal-article',
    authorships: [
      { author: { display_name: 'Eric J. Johnson' } },
      { author: { display_name: 'Daniel G. Goldstein' } },
    ],
    open_access: { is_oa: true, oa_url: 'https://example.org/defaults.pdf' },
    primary_location: {
      landing_page_url: 'https://science.org/doi/10.1126/science.1091721',
      source: { display_name: 'Science' },
    },
    abstract_inverted_index: invert(ABSTRACT_LUNGO),
  }

  it('estrae tutti i campi che servono al catalogo', () => {
    const e = mapOpenAlexWork(work, 'choice-architecture-nudge')
    expect(e).toMatchObject({
      id: 'johnson-2003-do-defaults-save-lives',
      titleOriginal: 'Do Defaults Save Lives?',
      authors: ['Eric J. Johnson', 'Daniel G. Goldstein'],
      year: 2003,
      type: 'studio',
      venue: 'Science',
      doi: '10.1126/science.1091721',
      openAccess: true,
      citedBy: 2841,
      topics: ['choice-architecture-nudge'],
      harvestedFrom: 'openalex',
    })
    expect(e.abstract).toBe(ABSTRACT_LUNGO)
  })

  it('preferisce l’URL open access alla landing page a pagamento', () => {
    expect(mapOpenAlexWork(work, 'x').sourceUrl).toBe('https://example.org/defaults.pdf')
  })

  it('ricade sulla landing page quando non c’è open access', () => {
    const chiuso = { ...work, open_access: { is_oa: false } }
    expect(mapOpenAlexWork(chiuso, 'x').sourceUrl).toBe(
      'https://science.org/doi/10.1126/science.1091721',
    )
  })

  it('ricade su doi.org quando non c’è nessun URL', () => {
    const nudo = { ...work, open_access: {}, primary_location: {} }
    expect(mapOpenAlexWork(nudo, 'x').sourceUrl).toBe('https://doi.org/10.1126/science.1091721')
  })

  it('scarta i lavori senza titolo, anno o modo di raggiungerli', () => {
    expect(mapOpenAlexWork({ ...work, display_name: null }, 'x')).toBeNull()
    expect(mapOpenAlexWork({ ...work, publication_year: null }, 'x')).toBeNull()
    expect(
      mapOpenAlexWork({ ...work, doi: null, open_access: {}, primary_location: {} }, 'x'),
    ).toBeNull()
  })
})

describe('mapCrossrefItem', () => {
  const item = {
    DOI: '10.1086/209563',
    title: ['When Choice is Demotivating'],
    author: [
      { family: 'Iyengar', given: 'Sheena S.' },
      { family: 'Lepper', given: 'Mark R.' },
    ],
    issued: { 'date-parts': [[2000, 12]] },
    'is-referenced-by-count': 4200,
    URL: 'https://doi.org/10.1086/209563',
    abstract: `<jats:p>${ABSTRACT_LUNGO}</jats:p>`,
    'container-title': ['Journal of Personality and Social Psychology'],
    type: 'journal-article',
  }

  it('estrae i campi e formatta gli autori come "Cognome, Nome"', () => {
    const e = mapCrossrefItem(item, 'choice-architecture-nudge', 100)
    expect(e).toMatchObject({
      titleOriginal: 'When Choice is Demotivating',
      authors: ['Iyengar, Sheena S.', 'Lepper, Mark R.'],
      year: 2000,
      citedBy: 4200,
      doi: '10.1086/209563',
      harvestedFrom: 'crossref',
    })
    expect(e.abstract).toBe(ABSTRACT_LUNGO)
  })

  it('applica il filtro sulle citazioni, che Crossref non fa lato server', () => {
    expect(mapCrossrefItem(item, 'x', 5000)).toBeNull()
    expect(mapCrossrefItem(item, 'x', 4000)).not.toBeNull()
  })

  it('scarta le voci senza anno', () => {
    expect(mapCrossrefItem({ ...item, issued: {} }, 'x', 0)).toBeNull()
  })
})

describe('parseArxivEntries', () => {
  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <id>http://arxiv.org/abs/2301.01234v1</id>
    <published>2023-01-03T18:00:00Z</published>
    <title>Dark Patterns in Consent Interfaces:
      A Large-Scale Audit</title>
    <summary>${ABSTRACT_LUNGO}</summary>
    <author><name>Anna Rossi</name></author>
    <author><name>Marco Bianchi</name></author>
    <arxiv:doi xmlns:arxiv="http://arxiv.org/schemas/atom">10.1145/3555555</arxiv:doi>
  </entry>
  <entry>
    <id>http://arxiv.org/abs/2302.09999v2</id>
    <published>2023-02-20T09:00:00Z</published>
    <title>Attention Capture Damaging Patterns</title>
    <summary>${ABSTRACT_LUNGO}</summary>
    <author><name>Luca Verdi</name></author>
  </entry>
</feed>`

  it('estrae tutte le voci del feed', () => {
    const out = parseArxivEntries(atom, 'dark-pattern-etica')
    expect(out).toHaveLength(2)
  })

  it('normalizza i titoli spezzati su più righe', () => {
    const [primo] = parseArxivEntries(atom, 'dark-pattern-etica')
    expect(primo.titleOriginal).toBe('Dark Patterns in Consent Interfaces: A Large-Scale Audit')
  })

  it('raccoglie autori, anno, DOI quando c’è, e lo omette quando non c’è', () => {
    const [primo, secondo] = parseArxivEntries(atom, 'dark-pattern-etica')
    expect(primo.authors).toEqual(['Anna Rossi', 'Marco Bianchi'])
    expect(primo.year).toBe(2023)
    expect(primo.doi).toBe('10.1145/3555555')
    expect(primo.sourceUrl).toBe('http://arxiv.org/abs/2301.01234v1')
    expect(secondo.doi).toBeUndefined()
  })

  it('non si rompe su un feed vuoto', () => {
    expect(parseArxivEntries('<feed></feed>', 'x')).toEqual([])
    expect(parseArxivEntries('', 'x')).toEqual([])
  })
})

describe('dedupe', () => {
  function seenVuoto() {
    return { doi: new Set(), title: new Set(), ids: new Set() }
  }

  it('scarta chi ha lo stesso DOI di una voce già nota', () => {
    const seen = seenVuoto()
    seen.doi.add('10.1126/science.1091721')
    const { kept, duplicates } = dedupe(
      [{ id: 'a', titleOriginal: 'Titolo Nuovo', doi: '10.1126/SCIENCE.1091721' }],
      seen,
    )
    expect(kept).toHaveLength(0)
    expect(duplicates).toBe(1)
  })

  it('scarta chi ha lo stesso titolo anche senza DOI', () => {
    const seen = seenVuoto()
    seen.title.add(normaliseTitle('Do Defaults Save Lives?'))
    const { kept } = dedupe([{ id: 'a', titleOriginal: 'do defaults save lives' }], seen)
    expect(kept).toHaveLength(0)
  })

  it('scarta i doppioni interni alla stessa corsa', () => {
    const { kept, duplicates } = dedupe(
      [
        { id: 'a', titleOriginal: 'Stesso Lavoro', doi: '10.1/x' },
        { id: 'b', titleOriginal: 'Stesso Lavoro', doi: '10.1/x' },
      ],
      seenVuoto(),
    )
    expect(kept).toHaveLength(1)
    expect(duplicates).toBe(1)
  })

  it('risolve le collisioni di id con un suffisso', () => {
    const { kept } = dedupe(
      [
        { id: 'rossi-2020-studio', titleOriginal: 'Primo' },
        { id: 'rossi-2020-studio', titleOriginal: 'Secondo' },
        { id: 'rossi-2020-studio', titleOriginal: 'Terzo' },
      ],
      seenVuoto(),
    )
    expect(kept.map((k) => k.id)).toEqual([
      'rossi-2020-studio',
      'rossi-2020-studio-2',
      'rossi-2020-studio-3',
    ])
  })
})
