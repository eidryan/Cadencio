import { ScrollAnimate } from "@/components/scroll-animate"

const steps = [
  {
    label: "Fale com a gente pelo WhatsApp",
    detail: "Zero burocracia. Respondemos rápido.",
  },
  {
    label: "Configuramos seu estúdio juntos",
    detail: "Nossa equipe faz o setup com você.",
  },
  {
    label: "Comece a registrar presença",
    detail: "Funciona no celular, tablet e computador.",
  },
]

export function HowItWorks() {
  return (
    <section className="px-4 py-20 md:px-6 md:py-28" style={{ background: "#F6F5F4" }}>
      <div className="mx-auto max-w-5xl">
        <ScrollAnimate className="text-center">
          <p className="eyebrow mb-3">Como funciona</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Como funciona o beta
          </h2>
        </ScrollAnimate>

        {/* Desktop: horizontal timeline */}
        <div className="mt-14 hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connecting line */}
            <div
              className="pointer-events-none absolute top-5 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent 5%, #D1D5DB 20%, #D1D5DB 80%, transparent 95%)",
              }}
              aria-hidden="true"
            />

            {steps.map((step, i) => (
              <ScrollAnimate
                key={i}
                delay={(i * 100 + 100) as 100 | 200 | 300}
                className="relative z-10 flex flex-1 flex-col items-center text-center"
              >
                <div
                  className="flex size-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #0D7377 0%, #0A5C5F 100%)",
                    boxShadow: "0 0 0 4px #F6F5F4, 0 0 0 5px #D1D5DB",
                  }}
                >
                  {i + 1}
                </div>
                <p className="mt-4 max-w-[180px] text-sm font-semibold text-foreground">
                  {step.label}
                </p>
                <p className="mt-1.5 max-w-[160px] text-xs text-muted-foreground">
                  {step.detail}
                </p>
              </ScrollAnimate>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="mt-10 flex flex-col gap-0 md:hidden">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #0D7377 0%, #0A5C5F 100%)",
                  }}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-1 h-10 w-px bg-border" />
                )}
              </div>
              <div className="pt-1.5 pb-8">
                <p className="text-sm font-semibold text-foreground">{step.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <ScrollAnimate>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Sem instalação. Funciona no celular, tablet e computador.
          </p>
        </ScrollAnimate>
      </div>
    </section>
  )
}
