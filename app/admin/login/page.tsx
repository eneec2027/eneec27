'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import { loginAction } from './action'
import { EVENT } from '@/lib/siteConfig'

export default function AdminLoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null)

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-sidebar px-6 py-12">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--border-dim) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      {/* Vinheta: puxa o olho ao centro sem escurecer a malha de fundo. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(8,12,20,0.7) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="flex justify-center mb-9">
          <Image src="/logo-dark-theme.png" alt="" width={112} height={112} priority className="rounded-sm" />
        </div>

        <div className="relative bg-background border border-border rounded-sm p-7 sm:p-8">
          {/* Miras nos vértices — a folha marcada antes de se desenhar nela. */}
          <span aria-hidden className="bp-crosshair -left-[14px] -top-[14px]" />
          <span aria-hidden className="bp-crosshair -right-[14px] -bottom-[14px]" />

          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold mb-1.5">
            Painel de administração
          </p>
          <h1 className="font-heading text-xl text-foreground mb-1">Entrar</h1>
          <p className="text-muted-foreground/70 text-[13px] leading-relaxed mb-7">
            Acesso à equipa organizadora do {EVENT.name}.
          </p>

          <form action={action} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                aria-describedby={state?.error ? 'login-error' : undefined}
                className="w-full px-4 py-2.5 bg-input border border-border text-foreground text-sm font-mono placeholder:text-muted-foreground/30 rounded-sm transition-colors focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30"
                placeholder="••••••••"
              />
            </div>

            {state?.error ? (
              <p
                id="login-error"
                role="alert"
                className="flex items-start gap-2 font-mono text-[11px] text-red-400 leading-relaxed"
              >
                <span aria-hidden className="mt-[3px] h-[9px] w-[2px] shrink-0 bg-red-400/70" />
                {state.error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 bg-gold text-primary-foreground font-mono text-[10px] uppercase tracking-[0.16em] rounded-sm transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isPending ? 'A entrar…' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* A mesma legenda da barra lateral, reduzida a uma linha. */}
        <p className="text-center font-mono text-[9px] text-muted-foreground/35 mt-6 tracking-[0.16em] uppercase">
          {EVENT.edition} · {EVENT.city} · {EVENT.month}
        </p>
      </div>
    </div>
  )
}
