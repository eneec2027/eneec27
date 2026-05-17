'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef, useTransition } from 'react'
import { signupEmail } from '@/app/actions/signup'

const LibraryScene   = dynamic(() => import('@/components/three/LibraryScene'),   { ssr: false })
const TidalScene     = dynamic(() => import('@/components/three/TidalScene'),     { ssr: false })
const CampusScene    = dynamic(() => import('@/components/three/CampusScene'),    { ssr: false })
const GrowthScene    = dynamic(() => import('@/components/three/GrowthScene'),    { ssr: false })
const MoliceiroScene = dynamic(() => import('@/components/three/MoliceiroScene'), { ssr: false })

// Fact index → scene component
const SCENES = [LibraryScene, TidalScene, CampusScene, GrowthScene, MoliceiroScene]

const REGISTRATION_OPENS = new Date('2026-09-01T09:00:00')

const FACTS = [
  {
    label: 'Biblioteca · Álvaro Siza Vieira, 1995',
    text: 'A Biblioteca da UA inspira-se na geometria das salinas aveirenses. Siza derivou a planta do edifício dos rectângulos das marinhas de evaporação que definem a paisagem da Ria — e insistiu em pôr livros e leitores no mesmo espaço aberto, contra a norma técnica da época.',
  },
  {
    label: 'A Tempestade que Criou a Ria · 1575',
    text: 'Em 1575, uma tempestade de inverno formou uma barra de areia na foz do porto, encerrando-o durante 230 anos. A cidade encolheu a um quarto. O braço de mar isolado transformou-se na Ria de Aveiro — criada por acidente, pela ausência de engenharia.',
  },
  {
    label: 'Campus de Santiago · Museu de Arquitectura',
    text: 'O Campus de Santiago foi construído com edifícios assinados por Álvaro Siza Vieira, Eduardo Souto de Moura e Gonçalo Byrne. Para estudantes de engenharia civil, o palco do ENEEC\'27 é em si mesmo um caso de estudo.',
  },
  {
    label: 'Universidade de Aveiro · Fundada em 1973',
    text: 'A UA abriu as suas primeiras aulas já em democracia, com apenas 46 estudantes num curso de Telecomunicações — numa área que as universidades tradicionais portuguesas ainda não contemplavam. Hoje serve dezenas de milhares de estudantes.',
  },
  {
    label: 'Moliceiros · Engenharia Vernacular',
    text: 'Os moliceiros foram desenhados de raiz no século XIX para as condições da Ria: fundo raso, canais estreitos, correntes suaves. O fundo chato, o leme alto, o casco esguio — cada detalhe é uma solução de engenharia adaptada ao território. Património UNESCO desde 2024.',
  },
]

const FACT_DISPLAY_MS  = 17000
const FACT_FADE_MS     = 550

function RotatingFact({ onIndex }: { onIndex?: (i: number) => void }) {
  const [idx, setIdx]         = useState(0)
  const [visible, setVisible] = useState(true)
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null)

  const advance = useRef((manual = false) => {
    setVisible(false)
    setTimeout(() => {
      setIdx(i => (i + 1) % FACTS.length)
      setVisible(true)
    }, manual ? FACT_FADE_MS : FACT_FADE_MS)
  })

  const startCycle = useRef(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(
      () => advance.current(false),
      FACT_DISPLAY_MS + FACT_FADE_MS
    )
  })

  useEffect(() => {
    startCycle.current()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const handleNext = () => {
    advance.current(true)
    startCycle.current()  // reset the auto-advance timer
  }

  useEffect(() => {
    onIndex?.(idx)
  }, [idx, onIndex])

  const fact = FACTS[idx]

  return (
    <div className="flex gap-4 items-stretch" style={{ minHeight: 220 }}>

      {/* Vertical axis — line + rotated label */}
      <div className="flex flex-col items-center gap-0 flex-shrink-0">
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
        <span
          className="mono text-[0.52rem] text-gold/45 tracking-[0.25em] uppercase my-2"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            opacity:    visible ? 1 : 0,
            transition: `opacity ${FACT_FADE_MS}ms ease`,
          }}
        >
          {fact.label}
        </span>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
      </div>

      {/* Fact text + dots */}
      <div className="flex flex-col justify-center gap-4">
        <p
          className="text-sm font-semibold text-foreground/75 leading-relaxed max-w-[13rem]"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(6px)',
            transition: `opacity ${FACT_FADE_MS}ms ease, transform ${FACT_FADE_MS}ms ease`,
          }}
        >
          {fact.text}
        </p>

        {/* Progress dots + next arrow */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {FACTS.map((_, i) => (
              <div
                key={i}
                style={{
                  width:        i === idx ? 14 : 4,
                  height:       3,
                  borderRadius: 2,
                  background:   i === idx ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.12)',
                  transition:   'all 0.4s ease',
                }}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            aria-label="Próximo facto"
            className="pointer-events-auto flex items-center justify-center w-5 h-5 rounded-full border border-gold/30 text-gold/50 hover:border-gold/70 hover:text-gold transition-all duration-200"
            style={{ fontSize: 9, lineHeight: 1 }}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

function useCountdown(target: Date) {
  const [delta, setDelta] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, ready: false })

  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) {
        setDelta({ days: 0, hours: 0, minutes: 0, seconds: 0, ready: true })
        return
      }
      setDelta({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        ready: true,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return delta
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const INSTAGRAM_URL = '#'
const LINKEDIN_URL  = '#'
const FACEBOOK_URL  = '#'
const CONTACT_EMAIL = 'geral.eneec@ua.pt'
const SPONSOR_EMAIL = 'parcerias.eneec@ua.pt'

export default function V1Page() {
  const countdown = useCountdown(REGISTRATION_OPENS)
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')
  const [isPending, startTransition] = useTransition()
  const [sceneIdx, setSceneIdx]       = useState(0)
  const [displayedScene, setDisplayed] = useState(0)
  const [fading, setFading]            = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sceneIdx === displayedScene) return
    setFading(true)
    const t1 = setTimeout(() => setDisplayed(sceneIdx), 480)
    const t2 = setTimeout(() => setFading(false), 560)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  // displayedScene intentionally excluded — including it causes cleanup
  // to cancel t2 when setDisplayed fires, leaving the overlay black
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Introduz um email válido.')
      inputRef.current?.focus()
      return
    }
    setError('')
    startTransition(async () => {
      const result = await signupEmail(trimmed)
      if (result.ok) {
        setSubmitted(true)
      } else {
        setError(result.error ?? 'Erro ao guardar. Tenta novamente.')
      }
    })
  }

  return (
    <div className="relative h-screen min-h-[580px] w-full overflow-hidden bg-[#080c14]">

      {/* ─── 3D SCENE ───────────────────────────────────────────
          Mobile: full-screen background
          Desktop: right panel (left-[46%])                      */}
      <div className="absolute inset-0 md:left-[40%] z-0">
        {(() => { const Scene = SCENES[displayedScene]; return <Scene /> })()}
        {/* Scene transition fade overlay */}
        <div
          className="absolute inset-0 bg-[#080c14] pointer-events-none"
          style={{ opacity: fading ? 1 : 0, transition: 'opacity 520ms ease' }}
        />
        {/* Mobile only: flat dark base so text is legible */}
        <div className="absolute inset-0 md:hidden bg-[#080c14]/70 pointer-events-none" />
        {/* Desktop: soft feather on the left edge only */}
        <div className="absolute inset-y-0 left-0 w-[30%] hidden md:block bg-gradient-to-r from-[#080c14] to-transparent pointer-events-none" />
      </div>

      {/* ─── CONTENT PANEL ──────────────────────────────────────
          Solid dark background — ensures nothing bleeds through  */}
      <div className="relative z-10 flex flex-col h-full md:w-[46%] px-8 sm:px-14 md:bg-[#080c14]">
        {/* Subtle grid only on desktop panel */}
        <div className="hidden md:block absolute inset-0 grid-bg opacity-50 pointer-events-none" />

        {/* Top bar */}
        <div className="flex items-center justify-between pt-8 pb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-[3px] h-5 bg-gold rounded-full" />
            <span className="mono font-bold text-gold tracking-[0.25em] text-xs uppercase">
              ENEEC<span className="text-foreground/30">'</span>27
            </span>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mono text-[0.65rem] text-muted-foreground/50 hover:text-gold transition-colors tracking-wide hidden sm:block"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        {/* Main content — vertically centered */}
        <div className="flex-1 flex flex-col justify-center">

          {/* Edition / location meta */}
          <div className="flex items-center gap-4 mb-4 md:mb-7">
            <span className="mono text-[0.6rem] text-gold/70 tracking-[0.3em] uppercase">15.ª Edição</span>
            <div className="h-px w-8 bg-gold/30" />
            <span className="mono text-[0.6rem] text-muted-foreground/70 tracking-[0.2em] uppercase">
              Aveiro · Abril 2027
            </span>
          </div>

          {/* Hero heading */}
          <h1
            className="font-bold leading-[0.92] tracking-tight mb-5"
            style={{ fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)' }}
          >
            <span className="block text-foreground">ENEEC</span>
            <span className="block text-gold glow-text">'27</span>
          </h1>

          {/* Tagline rule */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold/60" />
            <p className="mono text-[0.65rem] text-gold/80 tracking-[0.28em] uppercase">
              Construção em Movimento
            </p>
          </div>

          <p className="text-foreground/80 text-base font-semibold leading-relaxed mb-5 md:mb-9 max-w-[26rem]">
            O maior encontro de estudantes de Engenharia Civil em Portugal.
            Uma semana de conferências, workshops e networking em Aveiro.
          </p>

          {/* Countdown */}
          {countdown.ready && (
            <div className="mb-5 md:mb-9">
              <p className="mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-3 md:mb-4">
                Inscrições abrem em
              </p>
              <div className="flex items-end gap-1.5">
                {[
                  { v: countdown.days,    l: 'dias' },
                  { v: countdown.hours,   l: 'h'    },
                  { v: countdown.minutes, l: 'min'  },
                  { v: countdown.seconds, l: 'seg'  },
                ].map(({ v, l }, i) => (
                  <div key={l} className="flex items-end gap-1.5">
                    {i > 0 && (
                      <span className="text-gold/15 font-thin pb-[1.4rem] text-lg select-none">:</span>
                    )}
                    <div className="flex flex-col items-center">
                      <div
                        className="bg-[#0d1220] border border-gold/10 rounded-sm text-center"
                        style={{ padding: '0.4rem 0.75rem', minWidth: '3rem' }}
                      >
                        <span
                          className="mono font-bold text-gold tabular-nums"
                          style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)' }}
                        >
                          {String(v).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="mono text-[0.52rem] text-muted-foreground/25 tracking-widest uppercase mt-1">
                        {l}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email capture */}
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="max-w-[22rem]">
              <p className="mono text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                Sê o primeiro a saber
              </p>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="o.teu@email.pt"
                  aria-label="Email"
                  className="flex-1 min-w-0 px-4 py-2.5 bg-[#0d1220]/90 border border-gold/10 text-sm text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:border-gold/35 transition-colors mono rounded-sm"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="shrink-0 px-5 py-2.5 bg-gold text-[#080c14] text-sm font-bold mono rounded-sm hover:bg-gold-light transition-colors glow-gold disabled:opacity-50"
                >
                  {isPending ? '...' : '→'}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-400 mono">{error}</p>
              )}
            </form>
          ) : (
            <div className="max-w-[22rem] px-5 py-3.5 border border-gold/20 bg-gold/5 rounded-sm">
              <p className="text-foreground text-sm">Ótimo! Vais ser dos primeiros a saber.</p>
            </div>
          )}
        </div>

        {/* Fala connosco */}
        <div className="mt-4 md:mt-8 mb-4 md:mb-6">
          <p className="mono text-[0.58rem] text-gold/50 tracking-[0.2em] uppercase mb-3">
            Patrocinadores
          </p>
          <a
            href={`mailto:${SPONSOR_EMAIL}`}
            className="inline-flex items-center gap-3 px-5 py-2.5 border border-gold/60 text-gold font-bold text-sm mono tracking-widest uppercase hover:bg-gold hover:text-[#080c14] transition-all duration-200 rounded-sm glow-gold"
          >
            Fala connosco →
          </a>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pb-8 pt-0">
          <div className="flex items-center gap-5">
            <a href={INSTAGRAM_URL} aria-label="Instagram"
              className="text-muted-foreground/40 hover:text-gold transition-colors">
              <IconInstagram />
            </a>
            <a href={LINKEDIN_URL} aria-label="LinkedIn"
              className="text-muted-foreground/40 hover:text-gold transition-colors">
              <IconLinkedIn />
            </a>
            <a href={FACEBOOK_URL} aria-label="Facebook"
              className="text-muted-foreground/40 hover:text-gold transition-colors">
              <IconFacebook />
            </a>
          </div>
        </div>
      </div>


      {/* ─── ROTATING FACTS — overlaid on 3D scene ──────────── */}
      <div className="hidden md:block absolute z-20"
        style={{ left: '38%', top: '50%', transform: 'translateY(-50%)', maxWidth: '22rem', pointerEvents: 'none' }}>
        <RotatingFact onIndex={setSceneIdx} />
      </div>

      {/* ─── DESKTOP 3D PANEL ANNOTATIONS ───────────────────── */}
      <div className="hidden md:block absolute top-8 right-8 z-20 text-right pointer-events-none">
        <p className="mono text-[0.5rem] text-gold/55 tracking-[0.25em] uppercase">Universidade de Aveiro</p>
      </div>
      <div className="hidden md:block absolute bottom-8 right-8 z-20 text-right pointer-events-none">
        <p className="mono text-[0.5rem] text-gold/20 tracking-[0.25em] uppercase">Biblioteca · Campus de Santiago</p>
      </div>

      {/* ─── SCROLL INDICATOR ───────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 md:left-[23%] -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold/25" />
        <span className="mono text-[0.5rem] text-muted-foreground/25 tracking-[0.3em] uppercase">scroll</span>
      </div>
    </div>
  )
}
