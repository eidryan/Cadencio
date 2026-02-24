export function SocialProof() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Usado por estúdios no Rio de Janeiro
        </p>
        <div className="mx-auto mt-8 max-w-xl">
          <span
            className="text-5xl leading-none font-bold text-primary select-none"
            aria-hidden="true"
          >
            {'\u201C'}
          </span>
          <blockquote className="-mt-4 text-base leading-relaxed text-foreground md:text-lg">
            O Cadencio organizou o que a gente nunca conseguiu organizar em
            anos. Hoje sei exatamente quem faltou e quem está em risco de
            cancelar.
          </blockquote>
          <p className="mt-4 text-sm font-semibold text-foreground">
            Claudia, Gestora — Vertico Kiness, Rio de Janeiro
          </p>
        </div>
      </div>
    </section>
  )
}
