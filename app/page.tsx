export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-small uppercase tracking-widest text-primary">KonnectAlps — rebuild in corso</p>
        <h1 className="h1-main mt-4">
          Connettività su misura,
          <br />
          radicata nel territorio.
        </h1>
        <p className="text-base mt-6 max-w-2xl">
          Placeholder Fase 1: verifica di design tokens, tipografia e palette. Questa pagina viene
          sostituita dalla home definitiva nella Fase 5.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#" className="button button--primary">
            Richiedi una consulenza
            <span className="button__icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <a href="#" className="button button--ghost-light">
            Scopri i servizi
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {(
            [
              ['Connettività', 'bg-support-yellow'],
              ['IoT', 'bg-support-orange'],
              ['Core Network', 'bg-support-green'],
              ['Wireless', 'bg-support-lilla'],
              ['VoIP', 'bg-support-cyano'],
              ['Agent AI', 'bg-support-viola'],
              ['CyberAlps', 'bg-support-blue'],
            ] as const
          ).map(([label, bg]) => (
            <div key={label} className={`rounded-lg ${bg} p-4 text-bg-dark`}>
              <span className="text-small font-medium text-bg-dark">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
