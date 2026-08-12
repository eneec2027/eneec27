'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { EVENT, EVENT_TARGET_DATE } from '@/lib/siteConfig'

// As mesmas 5 cenas da V1, na mesma ordem — ver components/V1Page.tsx
const LibraryScene   = dynamic(() => import('@/components/three/LibraryScene'),   { ssr: false })
const TidalScene     = dynamic(() => import('@/components/three/TidalScene'),     { ssr: false })
const CampusScene    = dynamic(() => import('@/components/three/CampusScene'),    { ssr: false })
const GrowthScene    = dynamic(() => import('@/components/three/GrowthScene'),    { ssr: false })
const MoliceiroScene = dynamic(() => import('@/components/three/MoliceiroScene'), { ssr: false })

const SCENES = [LibraryScene, TidalScene, CampusScene, GrowthScene, MoliceiroScene]
const SCENE_INTERVAL_MS = 9000

const TARGET_DATE = EVENT_TARGET_DATE

// Roda as cenas com o mesmo crossfade da V1.
function useRotatingScene() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [displayedScene, setDisplayed] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const id = setInterval(
      () => setSceneIdx(i => (i + 1) % SCENES.length),
      SCENE_INTERVAL_MS,
    )
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (sceneIdx === displayedScene) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFading(true)
    const t1 = setTimeout(() => setDisplayed(sceneIdx), 480)
    const t2 = setTimeout(() => setFading(false), 560)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  // displayedScene excluído de propósito — incluí-lo cancela t2 quando
  // setDisplayed dispara, deixando o overlay preto (mesmo bug da V1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx])

  return { displayedScene, fading }
}

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
      <span className="mono text-2xl sm:text-3xl md:text-4xl font-bold text-gold glow-text tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="section-label mt-1">{label}</span>
    </div>
  )
}

export default function Hero() {
  const countdown = useCountdown()
  const { displayedScene, fading } = useRotatingScene()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // Guard de hidratação do next-themes — mesmo padrão do V1Page e do Navbar.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <section id="hero" className="relative h-dvh min-h-[580px] flex flex-col overflow-hidden grid-bg">
      {/* Cena 3D — full-bleed em mobile, painel direito em desktop (padrão V1) */}
      <div className="absolute inset-0 md:left-[38%] z-0">
        {(() => { const Scene = SCENES[displayedScene]; return <Scene /> })()}
        {/* Crossfade entre cenas */}
        <div
          className="absolute inset-0 bg-background pointer-events-none"
          style={{ opacity: fading ? 1 : 0, transition: 'opacity 520ms ease' }}
        />
        {/* Mobile: base plana para o texto ser legível por cima da cena */}
        <div className="absolute inset-0 md:hidden bg-background/85 pointer-events-none" />
        {/* Desktop: esbate a aresta esquerda para o fundo da página */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-background via-background/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-background via-transparent to-background/60 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto w-full px-6 pb-20">
        <div className="max-w-2xl">
          <p className="section-label mb-4">
            {EVENT.edition} &nbsp;·&nbsp; {EVENT.city} &nbsp;·&nbsp; {EVENT.month}
          </p>

          {/* Logo em vez de texto — mesma variante por tema que a V1 */}
          <div className="mb-2">
            <Image
              src={isDark ? '/logo-dark-theme.png' : '/logo-light.jpg'}
              alt={`${EVENT.name} — ${EVENT.fullName}`}
              width={400}
              height={400}
              className="rounded-sm w-full max-w-[260px] sm:max-w-[340px] md:max-w-[400px] h-auto"
              priority
            />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-2 tracking-wide">
            Encontro Nacional de Estudantes<br className="hidden sm:block" /> de Engenharia Civil
          </p>

          <p className="mono text-gold/70 text-sm mb-10 tracking-widest">
            — Construção em Movimento —
          </p>

          {/* Countdown — gaps apertados em mobile para não transbordar */}
          <div className="flex items-start gap-3 sm:gap-6 md:gap-10 mb-10">
            <CountdownUnit value={countdown.days}    label="dias" />
            <span className="text-gold/30 text-2xl sm:text-3xl font-thin mt-1">:</span>
            <CountdownUnit value={countdown.hours}   label="horas" />
            <span className="text-gold/30 text-2xl sm:text-3xl font-thin mt-1">:</span>
            <CountdownUnit value={countdown.minutes} label="min" />
            <span className="text-gold/30 text-2xl sm:text-3xl font-thin mt-1">:</span>
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
