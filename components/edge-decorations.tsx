"use client"

export function EdgeDecorations() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden hidden lg:block"
      style={{ zIndex: 40 }}
      aria-hidden="true"
    >
      {/* Left side */}

      {/* Teal abstract polygon */}
      <div
        className="absolute opacity-20"
        style={{
          left: 14,
          top: "20%",
          width: 44,
          color: "#24AEB5",
          animation: "driftPath1 18s ease-in-out infinite",
        }}
      >
        <svg viewBox="0 0 50 50" fill="currentColor">
          <polygon points="25,2 48,20 40,48 10,48 2,20" />
          <polygon points="25,12 36,24 30,42 20,42 14,24" opacity="0.45" />
        </svg>
      </div>

      {/* Coral triangle cluster */}
      <div
        className="absolute opacity-20"
        style={{
          left: 28,
          top: "48%",
          width: 30,
          color: "#FF6B6B",
          animation: "driftPath2 15s ease-in-out infinite",
          animationDelay: "-4s",
        }}
      >
        <svg viewBox="0 0 40 40" fill="currentColor">
          <polygon points="20,2 38,35 2,35" />
          <polygon points="20,12 30,30 10,30" opacity="0.4" />
        </svg>
      </div>

      {/* Violet diamond */}
      <div
        className="absolute opacity-20"
        style={{
          left: 18,
          top: "74%",
          width: 34,
          color: "#8B5CF6",
          animation: "driftPath3 20s ease-in-out infinite",
          animationDelay: "-8s",
        }}
      >
        <svg viewBox="0 0 40 52" fill="currentColor">
          <polygon points="20,0 40,26 20,52 0,26" />
          <polygon points="20,8 32,26 20,44 8,26" opacity="0.4" />
        </svg>
      </div>

      {/* Right side */}

      {/* Mint arrow */}
      <div
        className="absolute opacity-20"
        style={{
          right: 18,
          top: "24%",
          width: 38,
          color: "#6EE7B7",
          animation: "driftPath2 17s ease-in-out infinite reverse",
          animationDelay: "-2s",
        }}
      >
        <svg viewBox="0 0 50 36" fill="currentColor">
          <polygon points="0,18 26,2 26,10 50,10 50,26 26,26 26,34" />
        </svg>
      </div>

      {/* Gold star */}
      <div
        className="absolute opacity-15"
        style={{
          right: 32,
          top: "55%",
          width: 32,
          color: "#FFD93D",
          animation: "driftPath1 16s ease-in-out infinite reverse",
          animationDelay: "-6s",
        }}
      >
        <svg viewBox="0 0 40 40" fill="currentColor">
          <polygon points="20,0 24,15 40,15 27,24 32,40 20,30 8,40 13,24 0,15 16,15" />
        </svg>
      </div>

      {/* Teal angular bird */}
      <div
        className="absolute opacity-20"
        style={{
          right: 14,
          top: "80%",
          width: 40,
          color: "#45CCD1",
          animation: "driftPath3 19s ease-in-out infinite reverse",
          animationDelay: "-10s",
        }}
      >
        <svg viewBox="0 0 50 30" fill="currentColor">
          <polygon points="0,15 20,0 25,10 50,8 25,15 50,22 25,20 20,30" />
        </svg>
      </div>
    </div>
  )
}
