export function SocialProof() {
  const modalities = [
    { label: "Dança", emoji: "💃" },
    { label: "Pilates", emoji: "🧘" },
    { label: "Ballet", emoji: "🩰" },
    { label: "Artes Marciais", emoji: "🥋" },
    { label: "Yoga", emoji: "🪷" },
    { label: "Ritmos", emoji: "🎵" },
  ]

  return (
    <section className="relative bg-white border-y border-gray-100 py-5 overflow-hidden">
      {/* Subtle diagonal stripe */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #0D7377 0, #0D7377 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="shrink-0 text-center md:text-left">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-1">
              Confiado por
            </p>
            <p className="text-sm font-semibold text-gray-700">
              Estúdios de dança, pilates e artes marciais no Rio
            </p>
          </div>

          <div className="w-px h-8 bg-gray-100 hidden md:block shrink-0" />

          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            {modalities.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-sm text-sm text-gray-600 font-medium hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 transition-all duration-150"
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          <div className="ml-auto hidden lg:flex items-center gap-3 shrink-0">
            <div className="flex -space-x-2">
              {["#0D7377", "#8B5CF6", "#FF6B6B", "#FFD93D"].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: c }}
                >
                  {["MC", "DS", "RL", "FP"][i]}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">+40 estúdios</span> no beta
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
