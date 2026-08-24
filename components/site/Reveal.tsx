'use client'

import type { ReactNode } from 'react'
import { useReveal } from './useReveal'

// "A homepage pode ganhar movimento à medida que o utilizador percorre a página,
// com animações subtis" — briefing. Subtil quer dizer: entra uma vez, curto, e
// desliga com prefers-reduced-motion.
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const [ref, state] = useReveal<HTMLDivElement>()
  const hidden = state === 'hidden'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'translateY(18px)' : 'none',
        transition: `opacity 550ms cubic-bezier(.22,1,.36,1) ${delay}s, transform 550ms cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
