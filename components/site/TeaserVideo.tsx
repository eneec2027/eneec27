'use client'

import { useRef, useState } from 'react'

import { TEASER_VIDEO_URL, TEASER_POSTER_URL, TEASER_DURATION } from '@/lib/siteConfig'

// O leitor do teaser (/evento; também na /descobre guardada). Antes do play
// mostra a capa — o logo completo, o frame dos 48,5 s — e um botão de play
// nosso, no canto inferior esquerdo para não tapar o logo. Os controlos
// nativos só aparecem depois de carregar; no fim volta à capa.
// preload="metadata" para não descarregar os 17 MB antes de alguém carregar.
export default function TeaserVideo({ label, playLabel }: { label: string; playLabel?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  if (!TEASER_VIDEO_URL) return null

  function play() {
    setStarted(true)
    ref.current?.play().catch(() => setStarted(false))
  }

  function reset() {
    setStarted(false)
    // load() repõe o vídeo no início e volta a mostrar o poster.
    ref.current?.load()
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={ref}
        src={TEASER_VIDEO_URL}
        poster={TEASER_POSTER_URL}
        preload="metadata"
        controls={started}
        playsInline
        aria-label={label}
        onPlay={() => setStarted(true)}
        onEnded={reset}
        className="w-full h-full object-cover"
      />

      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label={playLabel ?? label}
          className="group absolute inset-0 flex items-end justify-start p-3 sm:p-6 md:p-8 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
        >
          <span className="flex items-center gap-3 sm:gap-4">
            <span className="relative flex items-center justify-center w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-gold glow-gold transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border border-gold/60 motion-safe:animate-ping [animation-duration:2.6s]"
              />
              <svg viewBox="0 0 12 12" aria-hidden className="w-4 h-4 sm:w-5 sm:h-5 translate-x-px fill-primary-foreground">
                <path d="M2.5 1.5v9l8-4.5z" />
              </svg>
            </span>
            {/* Em telemóvel o logo ocupa quase a largura toda: fica só o círculo. */}
            <span aria-hidden className="hidden sm:flex flex-col items-start text-left">
              <span className="mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-white">
                {playLabel ?? label}
              </span>
              <span className="mono text-xs text-white/60 tabular-nums mt-0.5">{TEASER_DURATION}</span>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
