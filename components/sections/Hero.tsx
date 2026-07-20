'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const BuildingScene = dynamic(() => import('@/components/three/BuildingScene'), { ssr: false })

const TARGET_DATE = new Date('2027-03-15T09:00:00')

function useCountdown() {
  const [delta, setDelta] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function tick() {
      const diff = TARGET_DATE.getTime() - Date.now()
      if (diff <= 0) return
      setDelta({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return delta
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="mono text-3xl md:text-4xl font-bold text-gold glow-text tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="section-label mt-1">{label}</span>
    </div>
  )
}

export default function Hero() {
  const countdown = useCountdown()

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex flex-col overflow-hidden grid-bg">
      {/* 3D scene — right half */}
      <div className="absolute inset-y-0 right-0 w-[65%] z-0">
        <BuildingScene />
        {/* Blend left edge into page background */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
        {/* Fade out at top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto w-full px-6 pb-20">
        <div className="max-w-2xl">
          <p className="section-label mb-4">
            27.ª Edição &nbsp;·&nbsp; Aveiro &nbsp;·&nbsp; Março 2027
          </p>

          <h1 className="heading-xl text-foreground mb-2">
            ENEEC<span className="text-gold">'27</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-2 tracking-wide">
            Encontro Nacional de Estudantes<br className="hidden sm:block" /> de Engenharia Civil
          </p>

          <p className="mono text-gold/70 text-sm mb-10 tracking-widest">
            — Construção em Movimento —
          </p>

          {/* Countdown */}
          <div className="flex items-start gap-6 md:gap-10 mb-10">
            <CountdownUnit value={countdown.days}    label="dias" />
            <span className="text-gold/30 text-3xl font-thin mt-1">:</span>
            <CountdownUnit value={countdown.hours}   label="horas" />
            <span className="text-gold/30 text-3xl font-thin mt-1">:</span>
            <CountdownUnit value={countdown.minutes} label="min" />
            <span className="text-gold/30 text-3xl font-thin mt-1">:</span>
            <CountdownUnit value={countdown.seconds} label="seg" />
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#inscricoes"
              className="inline-flex items-center px-7 py-3 bg-gold text-primary-foreground font-semibold text-sm tracking-widest uppercase mono hover:bg-gold-light transition-colors rounded-sm glow-gold"
            >
              Inscrever-me
            </a>
            <a
              href="#evento"
              className="inline-flex items-center px-7 py-3 border border-gold/40 text-foreground/80 font-medium text-sm tracking-wide hover:border-gold hover:text-foreground transition-all rounded-sm"
            >
              Saber mais
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/40" />
        <span className="section-label" style={{ writingMode: 'vertical-rl' }}>scroll</span>
      </div>
    </section>
  )
}
