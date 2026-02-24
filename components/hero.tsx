import { Check } from "lucide-react"

const WHATSAPP_LINK =
  "https://wa.me/55XXXXXXXXXXX?text=Oi%2C%20quero%20conhecer%20o%20Cadencio"

const schedule: { day: string; classes: { name: string; done?: boolean }[] }[] = [
  {
    day: "Seg",
    classes: [
      { name: "Jazz 09h", done: true },
      { name: "Ballet 14h" },
      { name: "Pilates 18h", done: true },
    ],
  },
  {
    day: "Ter",
    classes: [
      { name: "Yoga 08h", done: true },
      {},
      { name: "Luta 19h" },
    ],
  },
  {
    day: "Qua",
    classes: [
      {},
      { name: "Pilates 10h", done: true },
      { name: "Jazz 17h" },
    ],
  },
  {
    day: "Qui",
    classes: [
      { name: "Ballet 09h" },
      { name: "Yoga 14h", done: true },
      {},
    ],
  },
  {
    day: "Sex",
    classes: [
      { name: "Luta 08h" },
      {},
      { name: "Pilates 18h" },
    ],
  },
]

function ScheduleMockup() {
  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-border bg-card p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">
          Grade da Semana
        </span>
        <span className="text-xs text-muted-foreground">24/02 - 28/02</span>
      </div>

      {/* Desktop: all 5 columns */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-2">
        {schedule.map((col) => (
          <div key={col.day} className="flex flex-col gap-2">
            <span className="text-center text-xs font-semibold text-muted-foreground">
              {col.day}
            </span>
            {col.classes.map((cls, i) =>
              cls.name ? (
                <div
                  key={i}
                  className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1"
                >
                  <span className="text-xs font-medium text-primary">
                    {cls.name}
                  </span>
                  {cls.done && (
                    <Check className="size-3 text-primary" aria-hidden="true" />
                  )}
                </div>
              ) : (
                <div
                  key={i}
                  className="rounded-full bg-muted px-2.5 py-1"
                >
                  <span className="invisible text-xs">-</span>
                </div>
              )
            )}
          </div>
        ))}
      </div>

      {/* Mobile: 3 columns with fade */}
      <div className="relative md:hidden">
        <div className="grid grid-cols-3 gap-2">
          {schedule.slice(0, 3).map((col) => (
            <div key={col.day} className="flex flex-col gap-2">
              <span className="text-center text-xs font-semibold text-muted-foreground">
                {col.day}
              </span>
              {col.classes.map((cls, i) =>
                cls.name ? (
                  <div
                    key={i}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1"
                  >
                    <span className="text-[11px] font-medium text-primary">
                      {cls.name}
                    </span>
                    {cls.done && (
                      <Check className="size-3 text-primary" aria-hidden="true" />
                    )}
                  </div>
                ) : (
                  <div
                    key={i}
                    className="rounded-full bg-muted px-2 py-1"
                  >
                    <span className="invisible text-[11px]">-</span>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-card to-transparent" />
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-20">
      {/* Gradient blob */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[300px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(13,115,119,0.15)_0%,_rgba(91,181,184,0.08)_40%,_transparent_70%)] blur-3xl md:h-[400px] md:w-[600px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-[28px] font-extrabold leading-tight text-foreground md:text-5xl md:leading-tight">
          Seu estúdio organizado, sem papel, sem planilha.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
          Controle de presença, turmas e alunos num só lugar — feito para quem
          administra estúdio, não para quem entende de tecnologia.
        </p>
        <div className="mt-8">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-[#0A5C5F] md:w-auto"
          >
            Quero experimentar
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            Beta gratuito para os primeiros estúdios.
          </p>
        </div>
      </div>
      <div className="relative z-10">
        <ScheduleMockup />
      </div>
    </section>
  )
}
