const steps = [
  "Fale com a gente pelo WhatsApp",
  "Configuramos seu estúdio juntos",
  "Comece a registrar presença",
]

export function HowItWorks() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Como funciona o beta
        </h2>

        {/* Desktop: horizontal steps */}
        <div className="mt-12 hidden md:flex md:items-start md:justify-center md:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start">
              <div className="flex flex-col items-center text-center">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <p className="mt-3 max-w-[180px] text-sm font-semibold text-foreground">
                  {step}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="mt-5 w-24 border-t-2 border-dashed border-border lg:w-32" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical steps */}
        <div className="mt-10 flex flex-col items-start gap-0 md:hidden">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="h-10 border-l-2 border-dashed border-border" />
                )}
              </div>
              <p className="pt-2 text-sm font-semibold text-foreground">
                {step}
              </p>
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
