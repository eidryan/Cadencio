"use client"

import { useEffect, useRef } from "react"

const BIRD_CONFIGS = [
  { baseY: 110, amplitude: 85, frequency: 2.4, phase: 0,   speedMult: 1.0,  color: "#24AEB5", w: 50, h: 30 },
  { baseY: 195, amplitude: 65, frequency: 3.0, phase: 0.4, speedMult: 0.82, color: "#FF6B6B", w: 38, h: 23 },
  { baseY: 155, amplitude: 75, frequency: 2.1, phase: 0.7, speedMult: 1.12, color: "#8B5CF6", w: 44, h: 26 },
  { baseY: 270, amplitude: 55, frequency: 3.4, phase: 1.0, speedMult: 0.73, color: "#6EE7B7", w: 32, h: 19 },
  { baseY: 230, amplitude: 70, frequency: 2.7, phase: 1.3, speedMult: 0.93, color: "#0D7377", w: 40, h: 24 },
]

function BirdSVG() {
  return (
    <svg viewBox="0 0 60 35" className="w-full h-full" aria-hidden="true">
      <polygon points="15,17 35,8 55,17 35,26" fill="currentColor" />
      <polygon className="bird-wing-l" points="15,17 0,5 20,14" fill="currentColor" opacity="0.72" />
      <polygon className="bird-wing-r" points="55,17 60,5 50,14" fill="currentColor" opacity="0.72" />
      <polygon points="15,17 5,17 10,22" fill="currentColor" opacity="0.45" />
    </svg>
  )
}

export function ScrollBirds() {
  const birdsRef = useRef<(HTMLDivElement | null)[]>([])
  const animatedScrollY = useRef(0)
  const lastScrollY = useRef(0)
  const scrollVelocity = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }
    function easeOutQuart(t: number) {
      return 1 - Math.pow(1 - t, 4)
    }

    function update() {
      const targetScrollY = window.scrollY
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)

      animatedScrollY.current = lerp(animatedScrollY.current, targetScrollY, 0.08)
      const scrollProgress = Math.min(animatedScrollY.current / maxScroll, 1)

      scrollVelocity.current = lerp(
        scrollVelocity.current,
        Math.abs(targetScrollY - lastScrollY.current),
        0.1
      )

      const scrollDirection = targetScrollY >= lastScrollY.current ? 1 : -1

      birdsRef.current.forEach((bird, i) => {
        if (!bird) return
        const config = BIRD_CONFIGS[i]

        const adjustedProgress = Math.max(
          0,
          Math.min(1, (scrollProgress - i * 0.08) / 0.8)
        )
        const easedProgress = easeOutQuart(adjustedProgress)

        const startX = -90
        const endX = window.innerWidth + 90
        const x = startX + (endX - startX) * easedProgress * config.speedMult

        const primaryWave =
          Math.sin(easedProgress * Math.PI * config.frequency + config.phase) *
          config.amplitude
        const secondaryWave =
          Math.sin(
            easedProgress * Math.PI * config.frequency * 2 + config.phase
          ) *
          (config.amplitude * 0.28)
        const y = config.baseY + primaryWave + secondaryWave

        const baseRotation = scrollDirection * (2 + scrollVelocity.current * 0.25)
        const waveRotation =
          Math.cos(easedProgress * Math.PI * config.frequency) * 7
        const rotation = baseRotation + waveRotation

        let opacity = 0
        if (adjustedProgress > 0.02 && adjustedProgress < 0.98) {
          const fadeIn = Math.min(adjustedProgress * 10, 1)
          const fadeOut = Math.min((1 - adjustedProgress) * 10, 1)
          opacity = Math.min(fadeIn, fadeOut) * 0.55
        }

        bird.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rotation.toFixed(1)}deg)`
        bird.style.opacity = opacity.toFixed(3)

        const flapDuration = Math.max(0.14, 0.4 - scrollVelocity.current * 0.018)
        bird.querySelectorAll<SVGElement>(".bird-wing-l,.bird-wing-r").forEach(
          (wing) => {
            ;(wing as HTMLElement).style.animationDuration = `${flapDuration}s`
          }
        )
      })

      lastScrollY.current = targetScrollY
      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 60 }}
      aria-hidden="true"
    >
      {BIRD_CONFIGS.map((config, i) => (
        <div
          key={i}
          ref={(el) => {
            birdsRef.current[i] = el
          }}
          className="absolute opacity-0 will-change-transform"
          style={{
            width: config.w,
            height: config.h,
            color: config.color,
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
          }}
        >
          <BirdSVG />
        </div>
      ))}
    </div>
  )
}
