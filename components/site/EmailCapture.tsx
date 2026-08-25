'use client'

import { useState } from 'react'
import Link from 'next/link'

import { signupEmail } from '@/app/actions/signup'
import type { SignupSource } from '@/lib/signupSources'
import { routes } from '@/lib/nav'
import { getDict, type Lang } from '@/lib/i18n'

interface Props {
  lang: Lang
  source: SignupSource
  label: string
  cta: string
  hint?: string
  className?: string
}

export default function EmailCapture({ lang, source, label, cta, hint, className = '' }: Props) {
  const d = getDict(lang).form
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
      // O servidor responde em português; a mensagem mostrada segue a língua da página.
      setError(res.error === 'Email inválido.' ? d.invalid : d.error)
    }
  }

  return (
    <div className={className}>
      <p className="section-label mb-3">{label}</p>

      {state === 'done' ? (
        <p className="text-sm text-foreground">{d.done}</p>
      ) : (
        <form onSubmit={onSubmit} className="flex gap-2">
          {/* min-w-0: sem isto o input não encolhe abaixo da largura intrínseca
              e abre scroll horizontal em mobile. Já aconteceu uma vez. */}
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={d.placeholder}
            aria-label={label}
            className="flex-1 min-w-0 bg-transparent border border-gold-subtle focus:border-gold/60 outline-none rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors"
          />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="shrink-0 px-4 py-2 bg-gold text-primary-foreground text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {state === 'sending' ? d.sending : cta}
          </button>
        </form>
      )}

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

      {hint && state !== 'done' && (
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          {hint}{' '}
          <Link
            href={routes(lang).privacidade}
            className="inline-block py-1 underline hover:text-gold transition-colors"
          >
            {d.privacyLink}
          </Link>
          .
        </p>
      )}
    </div>
  )
}
