'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { EVENT, EVENT_TARGET_DATE, EARLY_BIRDS_OPEN } from '@/lib/siteConfig'
import { HERO_HEADLINE_INDEX } from '@/lib/content'
import { routes } from '@/lib/nav'
import { getDict, type Lang } from '@/lib/i18n'

// As mesmas 5 cenas da V1, na mesma ordem — ver components/V1Page.tsx
const LibraryScene   = dynamic(() => import('@/components/three/LibraryScene'),   { ssr: false })
const TidalScene     = dynamic(() => import('@/components/three/TidalScene'),     { ssr: false })
const CampusScene    = dynamic(() => import('@/components/three/CampusScene'),    { ssr: false })
const GrowthScene    = dynamic(() => import('@/components/three/GrowthScene'),    { ssr: false })
const MoliceiroScene = dynamic(() => import('@/components/three/MoliceiroScene'), { ssr: false })

const SCENES = [LibraryScene, TidalScene, CampusScene, GrowthScene, MoliceiroScene]
const SCENE_INTERVAL_MS = 9000

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
      const diff = EVENT_TARGET_DATE.getTime() - Date.now()
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

export default function Hero({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const r = routes(lang)
  const headline = d.home.heroHeadlines[HERO_HEADLINE_INDEX]
  const countdown = useCountdown()
  const { displayedScene, fading } = useRotatingScene()

  return (
    <section id="hero" className="relative min-h-dvh flex flex-col overflow-hidden grid-bg">
      {/* Cena 3D — full-bleed em mobile, painel direito em desktop (padrão V1) */}
      <div className="absolute inset-0 md:left-[38%] z-0">
        {(() => { const Scene = SCENES[displayedScene]; return <Scene /> })()}
        <div
          className="absolute inset-0 bg-background pointer-events-none"
          style={{ opacity: fading ? 1 : 0, transition: 'opacity 520ms ease' }}
        />
        {/* Mobile: base plana para o texto ser legível por cima da cena */}
        <div className="absolute inset-0 md:hidden bg-background/88 pointer-events-none" />
        {/* Desktop: esbate a aresta esquerda para o fundo da página */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-background via-background/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-background via-transparent to-background/60 pointer-events-none" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col justify-end grow max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          <p className="section-label mb-6">
            {d.event.edition} &nbsp;·&nbsp; {EVENT.city} &nbsp;·&nbsp; {EVENT.organizerFull}
          </p>

          {/* Bloco 1 do briefing: frase de impacto. As três opções vivem em
              lib/content.ts — HERO_HEADLINE_INDEX escolhe. */}
          <h1 className="heading-xl text-foreground mb-8 text-balance">{headline}</h1>

          {/* "Data e local, sempre bem visíveis" — briefing */}
          <p className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-0.5 text-lg md:text-xl mb-10">
            <span className="text-gold font-semibold">{d.event.dates}</span>
            <span className="hidden sm:inline text-muted-foreground/50">·</span>
            <span className="text-foreground/90">{d.event.venue}</span>
          </p>

          {/* Countdown — gaps apertados em mobile para não transbordar */}
          <div className="flex items-start gap-3 sm:gap-6 md:gap-10 mb-10">
            <CountdownUnit value={countdown.days}    label={d.countdown.days} />
            <span className="text-gold/30 text-2xl sm:text-3xl font-thin mt-1">:</span>
            <CountdownUnit value={countdown.hours}   label={d.countdown.hours} />
            <span className="text-gold/30 text-2xl sm:text-3xl font-thin mt-1">:</span>
            <CountdownUnit value={countdown.minutes} label={d.countdown.minutes} />
            <span className="text-gold/30 text-2xl sm:text-3xl font-thin mt-1">:</span>
            <CountdownUnit value={countdown.seconds} label={d.countdown.seconds} />
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={r.descobre}
              className="inline-flex items-center px-7 py-3 bg-gold text-primary-foreground font-semibold text-sm tracking-widest uppercase mono hover:bg-gold-light transition-colors rounded-sm glow-gold"
            >
              {EARLY_BIRDS_OPEN ? d.cta.ticket : d.cta.discover}
            </Link>
            <Link
              href={r.evento}
              className="inline-flex items-center px-7 py-3 border border-gold/40 text-foreground/80 font-medium text-sm tracking-wide hover:border-gold hover:text-foreground transition-all rounded-sm"
            >
              {d.cta.event}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 z-10 hidden sm:flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/40" />
        <span className="section-label" style={{ writingMode: 'vertical-rl' }}>{d.cta.scroll}</span>
      </div>
    </section>
  )
}
