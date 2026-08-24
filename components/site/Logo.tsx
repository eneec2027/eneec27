'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { EVENT } from '@/lib/siteConfig'

// Regra de aplicação do briefing: versão azul sobre fundos claros, versão lilás
// sobre fundo azul/escuro, fotografia ou vídeo. 'h' é a composição horizontal
// V2 (header e rodapé); 'mark' é a V1, quadrada, para o hero.
type Variant = 'h' | 'mark'

const SRC: Record<Variant, { light: string; dark: string }> = {
  h:    { light: '/logos/eneec-h-light.png',    dark: '/logos/eneec-h-dark.png' },
  mark: { light: '/logos/eneec-mark-light.png', dark: '/logos/eneec-mark-dark.png' },
}

// Rácios reais dos ficheiros processados, para o next/image não precisar de os medir.
const RATIO: Record<Variant, number> = { h: 1400 / 294, mark: 800 / 495 }

interface Props {
  variant?: Variant
  height: number
  className?: string
  priority?: boolean
  /** Força a variante lilás — para logo sobre vídeo ou fotografia. */
  forceDark?: boolean
}

export default function Logo({ variant = 'h', height, className = '', priority, forceDark }: Props) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  const width = Math.round(height * RATIO[variant])
  const isDark = forceDark || (mounted && resolvedTheme === 'dark')

  // Antes de hidratar não se sabe o tema: reservar o espaço evita o salto.
  if (!mounted && !forceDark) {
    return <div className={className} style={{ width, height }} aria-hidden />
  }

  return (
    <Image
      src={isDark ? SRC[variant].dark : SRC[variant].light}
      alt={`${EVENT.name} — ${EVENT.fullName}`}
      width={width * 2}
      height={height * 2}
      style={{ height, width: 'auto' }}
      className={className}
      priority={priority}
    />
  )
}
