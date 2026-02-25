"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function DiagnosticShuffler() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut", duration: 0.8 } })

      tl.to(".card-1", { y: -80, opacity: 0, scale: 0.95 })
        .to(".card-2", { y: -16, scale: 1, opacity: 1, zIndex: 3 }, "<")
        .to(".card-3", { y: 0, scale: 0.95, opacity: 0.7, zIndex: 2 }, "<")
        .set(".card-1", { y: 16, scale: 0.9, opacity: 0.4, zIndex: 1 })

        .to(".card-2", { y: -80, opacity: 0, scale: 0.95 }, "+=1.5")
        .to(".card-3", { y: -16, scale: 1, opacity: 1, zIndex: 3 }, "<")
        .to(".card-1", { y: 0, scale: 0.95, opacity: 0.7, zIndex: 2 }, "<")
        .set(".card-2", { y: 16, scale: 0.9, opacity: 0.4, zIndex: 1 })

        .to(".card-3", { y: -80, opacity: 0, scale: 0.95 }, "+=1.5")
        .to(".card-1", { y: -16, scale: 1, opacity: 1, zIndex: 3 }, "<")
        .to(".card-2", { y: 0, scale: 0.95, opacity: 0.7, zIndex: 2 }, "<")
        .set(".card-3", { y: 16, scale: 0.9, opacity: 0.4, zIndex: 1 })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-48 mt-8 flex items-end justify-center pb-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`card-${i} absolute w-[200px] bg-white rounded-2xl p-4 shadow-xl border border-[#E8E4DD]`}
          style={{
            y: i === 1 ? -16 : i === 2 ? 0 : 16,
            scale: i === 1 ? 1 : i === 2 ? 0.95 : 0.9,
            opacity: i === 1 ? 1 : i === 2 ? 0.7 : 0.4,
            zIndex: 4 - i
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono font-medium text-[#78716C]">ALUNO_0{i}</span>
            <div className="w-2 h-2 rounded-full bg-[#CC5833]" />
          </div>
          <div className="h-1.5 w-3/4 bg-[#E8E4DD] rounded-full mb-2" />
          <div className="h-1.5 w-1/2 bg-[#E8E4DD] rounded-full" />
        </div>
      ))}
    </div>
  )
}

function TelemetryTypewriter() {
  const [lines, setLines] = useState<string[]>([])
  const logs = [
    "SIG_RCV: ATTENDANCE_OK",
    "SYS: UPDATING_RECORDS_DB",
    "USR_ACK: 21_PRESENT_3_ABSENT",
    "SYNC: CLOUD_REPLICA_VERIFIED",
    "SIG_RCV: HEARTBEAT_NOMINAL",
    "MEM: ALLOCATING_REPORT_CACHE",
    "NET: PACKET_LOSS_0.00%",
  ]
  const logsRef = useRef(logs)

  useEffect(() => {
    let index = 0
    // start with 3 initial logs
    const initialLogs = [
      `[SysInit] BOOT_SEQ_START`,
      `[SysInit] ESTABLISHING_LINK`,
      `[SysInit] AWAITING_TELEMETRY...`
    ]
    setLines(initialLogs)

    const interval = setInterval(() => {
      setLines(prev => {
        const next = [...prev, `[${new Date().toISOString().split('T')[1].slice(0, 12)}] ${logsRef.current[index % logsRef.current.length]}`]
        return next.slice(-6)
      })
      index++
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-8 bg-[#1A1A1A] p-4 rounded-2xl h-48 overflow-hidden font-mono text-[10px] text-[#CC5833] flex flex-col justify-end shadow-inner relative border border-[#2E4036]">
      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#1A1A1A] to-transparent z-10" />
      <div className="flex flex-col gap-1 z-0">
        {lines.map((line, i) => (
          <div key={i} className="opacity-80 break-all">{line}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  )
}

function CursorScheduler() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 })

      tl.set(".scheduler-cursor", { x: 0, y: 0, scale: 1 })
        .to(".scheduler-cursor", { x: 80, y: 35, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to(".scheduler-cursor", { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(".schedule-slot-1", { backgroundColor: "#CC5833", duration: 0.2 }, "-=0.2")
        .to(".scheduler-cursor", { x: 140, y: 75, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to(".scheduler-cursor", { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(".schedule-slot-2", { backgroundColor: "#2E4036", duration: 0.2 }, "-=0.2")
        .to(".scheduler-cursor", { x: 200, y: 15, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to(".scheduler-cursor", { opacity: 0, duration: 0.5 })
        .set(".schedule-slot-1, .schedule-slot-2", { backgroundColor: "#E8E4DD", delay: 0.5 })
        .set(".scheduler-cursor", { opacity: 1, x: 0, y: 0 })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative mt-8 bg-white p-4 rounded-2xl h-48 border border-[#E8E4DD] flex flex-col gap-2 shadow-sm overflow-hidden">
      <div className="grid grid-cols-4 gap-2 flex-1 relative z-0">
        <div className="col-span-1 border-r border-[#E8E4DD] flex flex-col gap-2 text-[9px] font-mono pr-2">
          <div className="flex-1 flex items-center justify-end text-[#78716C]">09:00</div>
          <div className="flex-1 flex items-center justify-end text-[#78716C]">10:00</div>
          <div className="flex-1 flex items-center justify-end text-[#78716C]">11:00</div>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-2">
          <div className="bg-[#F5F5F4] rounded-lg relative"><div className="absolute inset-x-2 top-2 bottom-6 bg-[#E8E4DD] rounded-md opacity-40" /></div>
          <div className="bg-[#F5F5F4] rounded-lg relative"><div className="schedule-slot-1 absolute inset-x-2 top-4 bottom-4 bg-[#E8E4DD] rounded-md opacity-90 transition-colors" /></div>
          <div className="bg-[#F5F5F4] rounded-lg relative"><div className="schedule-slot-2 absolute inset-x-2 top-6 bottom-2 bg-[#E8E4DD] rounded-md opacity-90 transition-colors" /></div>
        </div>
      </div>

      <svg className="scheduler-cursor absolute top-4 left-4 w-6 h-6 drop-shadow-lg z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 3.21V20.8C5.5 21.46 6.27 21.82 6.78 21.4L11.43 17.51C11.66 17.32 11.95 17.21 12.25 17.21H19.5C20.15 17.21 20.5 16.44 20.08 15.96L6.84 2.87C6.42 2.45 5.5 2.75 5.5 3.21Z" fill="#1A1A1A" />
        <path d="M5.5 3.21V20.8C5.5 21.46 6.27 21.82 6.78 21.4L11.43 17.51C11.66 17.32 11.95 17.21 12.25 17.21H19.5C20.15 17.21 20.5 16.44 20.08 15.96L6.84 2.87C6.42 2.45 5.5 2.75 5.5 3.21Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function FeaturesPrimary() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="funcionalidades" className="py-24 lg:py-32 bg-[#F2F0E9] relative z-10 border-b border-[#E8E4DD]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={containerRef}>
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CC5833]" />
            <span className="text-xs font-mono font-semibold tracking-widest text-[#CC5833] uppercase">
              Artefatos Funcionais
            </span>
          </div>
          <h3 className="text-[40px] md:text-5xl lg:text-6xl font-sans font-extrabold text-[#1A1A1A] leading-[1.05] tracking-tight mb-6">
            Não é um software.<br />É um <span className="font-cormorant italic font-normal text-[48px] md:text-6xl lg:text-[72px] text-[#2E4036]">ecossistema.</span>
          </h3>
          <p className="text-lg text-[#1A1A1A]/70 leading-relaxed font-medium max-w-2xl">
            Substitua a desordem do papel e do WhatsApp por um processo de telemetria elegante. Construído para ser invisível, ultra-rápido e altamente inteligente.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Card 1 */}
          <div className="feature-card col-span-1 bg-[#F2F0E9] border border-[#E8E4DD] rounded-[2rem] p-8 md:p-10 shadow-xl shadow-black-[0.03] flex flex-col justify-between overflow-hidden relative group hover:border-[#CC5833]/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-[1rem] border border-[#E8E4DD] flex items-center justify-center mb-6 bg-white shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#CC5833]" />
              </div>
              <h4 className="text-2xl font-bold text-[#1A1A1A] mb-3 leading-tight tracking-tight">Presença em 1 clique</h4>
              <p className="text-[#1A1A1A]/70 font-medium leading-relaxed text-[15px]">Registro de frequência instantâneo sem fricção. Seus dados injetados na nuvem na hora.</p>
            </div>
            <DiagnosticShuffler />
          </div>

          {/* Card 2 */}
          <div className="feature-card col-span-1 bg-[#F2F0E9] border border-[#E8E4DD] rounded-[2rem] p-8 md:p-10 shadow-xl shadow-black-[0.03] flex flex-col justify-between overflow-hidden relative group hover:border-[#2E4036]/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-[1rem] border border-[#E8E4DD] flex items-center justify-center mb-6 bg-white shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2E4036]" />
              </div>
              <h4 className="text-2xl font-bold text-[#1A1A1A] mb-3 leading-tight tracking-tight">Histórico completo</h4>
              <p className="text-[#1A1A1A]/70 font-medium leading-relaxed text-[15px]">Todo evento de telemetria arquivado. Monitoramento contínuo sem perder nenhum dado vital do seu estúdio.</p>
            </div>
            <TelemetryTypewriter />
          </div>

          {/* Card 3 */}
          <div className="feature-card col-span-1 bg-[#F2F0E9] border border-[#E8E4DD] rounded-[2rem] p-8 md:p-10 shadow-xl shadow-black-[0.03] flex flex-col justify-between overflow-hidden relative group hover:border-[#D29D52]/40 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-[1rem] border border-[#E8E4DD] flex items-center justify-center mb-6 bg-white shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D29D52]" />
              </div>
              <h4 className="text-2xl font-bold text-[#1A1A1A] mb-3 leading-tight tracking-tight">Gestão de turmas</h4>
              <p className="text-[#1A1A1A]/70 font-medium leading-relaxed text-[15px]">Escalonamento de horários visual. Adicione alunos, profissionais e configure a grade em poucos cliques.</p>
            </div>
            <CursorScheduler />
          </div>

        </div>
      </div>
    </section>
  )
}
