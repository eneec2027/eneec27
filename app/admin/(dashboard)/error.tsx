'use client'

import { useEffect } from 'react'

/**
 * Rede de segurança do dashboard. O caso real que isto apanha é o
 * `getSupabaseAdmin` a atirar quando faltam as variáveis de ambiente — sem
 * isto, o utilizador via o ecrã de erro genérico do Next, sem dizer o quê.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[admin]', error)
  }, [error])

  return (
    <div className="p-5 sm:p-8">
      <div className="border border-red-400/25 bg-red-400/[0.04] rounded-sm p-5 sm:p-6 max-w-xl">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-red-400/80 mb-2">
          O painel não carregou
        </p>
        <p className="text-foreground text-sm leading-relaxed mb-4">
          Tenta outra vez. Se continuar, é o acesso à base de dados que está em
          baixo — o site público continua a funcionar.
        </p>
        <p className="font-mono text-[11px] text-muted-foreground/70 break-words mb-5">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gold text-primary-foreground font-mono text-[10px] uppercase tracking-[0.16em] rounded-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Tentar de novo
        </button>
      </div>
    </div>
  )
}
