'use client'

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'

// Estado de entrada de um elemento ao entrar no ecrã.
//
// Começa VISÍVEL de propósito: se o HTML servido viesse escondido, quem não
// corre JavaScript ficava com uma página em branco. O estado escondido é
// aplicado no cliente, antes da primeira pintura, e só ao que está fora do ecrã.
export type RevealState = 'visible' | 'hidden'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function useReveal<T extends HTMLElement>(): [RefObject<T | null>, RevealState] {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState>('visible')

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Já visível ao carregar (hero, topo das páginas): não animar.
    if (el.getBoundingClientRect().top < window.innerHeight - 60) return

    setState('hidden')

    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setState('visible')
          io.disconnect()
        }
      },
      { rootMargin: '-60px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, state]
}
