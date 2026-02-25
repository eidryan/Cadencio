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
    <div className="float-bob mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/5 md:p-7">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary" />
          <span className="text-sm font-bold tracking-tight text-foreground">
            Grade da Semana
          </span>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          24/02 – 28/02
        </span>
      </div>

      {/* Desktop: all 5 columns */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-3">
        {schedule.map((col) => (
          <div key={col.day} className="flex flex-col gap-2">
            <span className="text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {col.day}
            </span>
            {col.classes.map((cls, i) =>
              cls.name ? (
                <div
                  key={i}
                  className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1.5"
                >
                  <span className="text-xs font-medium text-primary leading-none">
                    {cls.name}
                  </span>
                  {cls.done && (
                    <Check className="ml-auto size-3 shrink-0 text-primary" aria-hidden="true" />
                  )}
                </div>
              ) : (
                <div
                  key={i}
                  className="rounded-full bg-muted/50 px-2.5 py-1.5"
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
              <span className="text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {col.day}
              </span>
              {col.classes.map((cls, i) =>
                cls.name ? (
                  <div
                    key={i}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1.5"
                  >
                    <span className="text-[11px] font-medium text-primary leading-none">
                      {cls.name}
                    </span>
                    {cls.done && (
                      <Check className="ml-auto size-3 shrink-0 text-primary" aria-hidden="true" />
                    )}
                  </div>
                ) : (
                  <div key={i} className="rounded-full bg-muted/50 px-2 py-1.5">
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
    <section className="relative overflow-hidden px-4 pb-20 pt-16 md:px-6 md:pb-32 md:pt-24">
      {/* Animated gradient blobs */}
      <div
        className="hero-blob-1 pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(13,115,119,0.13) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div
        className="hero-blob-2 pointer-events-none absolute bottom-0 right-[-100px] h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(107,63,197,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-20 left-[-80px] h-[300px] w-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(13,115,119,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <div className="size-1.5 rounded-full bg-primary" />
          <span className="eyebrow text-[11px]">Beta gratuito — vagas limitadas</span>
        </div>

        <h1 className="text-balance text-[36px] font-light leading-[1.15] tracking-tight text-foreground md:text-[64px]">
          Seu estúdio organizado,{" "}
          <span className="gradient-text font-normal">
            sem papel, sem planilha.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
          Controle de presença, turmas e alunos num só lugar — feito para quem
          administra estúdio, não para quem entende de tecnologia.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex w-full items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-[#0A5C5F] transition-colors sm:w-auto"
          >
            Quero experimentar
          </a>
          <p className="text-sm text-muted-foreground">
            Beta gratuito · Sem cartão
          </p>
        </div>
      </div>

      <ScheduleMockup />
    </section>
  )
}
