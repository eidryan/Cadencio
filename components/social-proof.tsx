export function SocialProof() {
  return (
    <section className="border-y border-border bg-[#0D7377]/[0.03] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Usado por estúdios no Rio de Janeiro
        </p>
        <div className="mx-auto mt-8 max-w-xl">
          <span
            className="text-8xl font-bold leading-none text-primary opacity-20 select-none"
            aria-hidden="true"
          >
            {'\u201C'}
          </span>
          <blockquote className="-mt-4 text-lg italic leading-relaxed text-foreground md:text-xl">
            O Cadencio organizou o que a gente nunca conseguiu organizar em
            anos. Hoje sei exatamente quem faltou e quem está em risco de
            cancelar.
          </blockquote>
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="h-[2px] w-10 bg-primary" />
            <p className="text-sm font-semibold text-foreground">
              Claudia, Gestora — Vertico Kiness, Rio de Janeiro
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
