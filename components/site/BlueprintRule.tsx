'use client'

import { useReveal } from './useReveal'

// "Linhas técnicas, grelhas estruturais ou traços inspirados em plantas de
// construção a desenharem-se ao longo da página" — briefing. Uma viga sobre dois
// apoios, com linha de cota, que se desenha ao entrar no ecrã.
//
// O traço desenha-se com stroke-dashoffset; sem JavaScript fica simplesmente
// desenhado, que é o estado final.
const LEN = 1200

export default function BlueprintRule({ className = '' }: { className?: string }) {
  const [ref, state] = useReveal<HTMLDivElement>()
  const hidden = state === 'hidden'

  const draw = (length: number, delay: number) => ({
    strokeDasharray: length,
    strokeDashoffset: hidden ? length : 0,
    transition: `stroke-dashoffset 1000ms ease-in-out ${delay}ms`,
  })

  return (
    <div ref={ref} className={`w-full ${className}`} aria-hidden>
      <svg viewBox="0 0 1200 40" className="w-full h-8" fill="none" preserveAspectRatio="none">
        {/* Viga */}
        <line x1="0" y1="14" x2={LEN} y2="14" stroke="var(--bp-line)" strokeWidth="1" style={draw(LEN, 0)} />
        {/* Apoios */}
        {[240, 960].map(x => (
          <path
            key={x}
            d={`M ${x - 9} 26 L ${x} 14 L ${x + 9} 26`}
            stroke="var(--gold)"
            strokeWidth="1"
            fill="none"
            style={draw(40, 700)}
          />
        ))}
        {/* Linha de cota */}
        <line
          x1="240" y1="34" x2="960" y2="34"
          stroke="var(--bp-line)" strokeWidth="1"
          style={{ ...draw(720, 900), opacity: hidden ? 0 : 1, transition: `stroke-dashoffset 900ms ease-in-out 900ms, opacity 400ms ease 900ms` }}
        />
      </svg>
    </div>
  )
}
