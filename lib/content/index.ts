/**
 * Punto di accesso ai contenuti del sito.
 *
 * I contenuti sono strutturati per lingua in `lib/content/<locale>/` così che
 * un futuro multilingua (es. tedesco per l'Alto Adige) o una migrazione a CMS
 * richiedano solo l'aggiunta di una cartella o la sostituzione di questi import,
 * senza toccare i componenti.
 */
export type Locale = 'it'

export const defaultLocale: Locale = 'it'
