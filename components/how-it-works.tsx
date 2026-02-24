const steps = [
  {
    title: "Fale com a gente pelo WhatsApp",
    subtitle: "Sem formulário, sem espera.",
  },
  {
    title: "Configuramos seu estúdio juntos",
    subtitle: "Turmas, horários e alunos — tudo pronto.",
  },
  {
    title: "Comece a registrar presença",
    subtitle: "No celular, tablet ou computador.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Como funciona o beta
        </h2>

        {/* Desktop: horizontal steps */}
        <div className="mt-12 hidden md:flex md:items-start md:justify-center md:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start">
              <div className="flex flex-col items-center text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-md shadow-primary/10">
                  {i + 1}
                </div>
                <p className="mt-3 max-w-[180px] text-sm font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="mt-1 max-w-[180px] text-xs text-muted-foreground">
                  {step.subtitle}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="mt-6 w-24 border-t-2 border-border/20 lg:w-32" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical steps */}
        <div className="mt-10 flex flex-col items-start gap-0 md:hidden">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-md shadow-primary/10">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="h-10 border-l-2 border-border/20" />
                )}
              </div>
              <div className="pt-2 pb-4">
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Sem instalação. Funciona no celular, tablet e computador.
        </p>
      </div>
    </section>
  )
}
