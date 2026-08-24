'use client'

import { useState } from 'react'
import { signupEmail, type SignupSource } from '@/app/actions/signup'
import { ROUTES } from '@/lib/nav'
import Link from 'next/link'

interface Props {
  source: SignupSource
  label: string
  cta: string
  hint?: string
  className?: string
}

export default function EmailCapture({ source, label, cta, hint, className = '' }: Props) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    setError(null)
    const res = await signupEmail(email, source)
    if (res.ok) {
      setState('done')
      setEmail('')
    } else {
      setState('idle')
      setError(res.error ?? 'Erro ao guardar. Tenta novamente.')
    }
  }

  return (
    <div className={className}>
      <p className="section-label mb-3">{label}</p>

      {state === 'done' ? (
        <p className="text-sm text-foreground">Ótimo! Vais ser dos primeiros a saber.</p>
      ) : (
        <form onSubmit={onSubmit} className="flex gap-2">
          {/* min-w-0: sem isto o input não encolhe abaixo da largura intrínseca
              e abre scroll horizontal em mobile. Já aconteceu uma vez. */}
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="o.teu@email.pt"
            aria-label={label}
            className="flex-1 min-w-0 bg-transparent border border-gold-subtle focus:border-gold/60 outline-none rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors"
          />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="shrink-0 px-4 py-2 bg-gold text-primary-foreground text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {state === 'sending' ? '…' : cta}
          </button>
        </form>
      )}

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

      {hint && state !== 'done' && (
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          {hint}{' '}
          <Link href={ROUTES.privacidade} className="inline-block py-1 underline hover:text-gold transition-colors">
            Política de Privacidade
          </Link>
          .
        </p>
      )}
    </div>
  )
}
