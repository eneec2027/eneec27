'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import { loginAction } from './action'

export default function AdminLoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-sidebar">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--border-dim) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="flex justify-center mb-10">
          <Image src="/logo-dark.png" alt="ENEEC'27" width={120} height={120} className="rounded-sm" />
        </div>

        <div className="bg-background border border-border rounded-sm p-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold mb-1">
            Painel de Administração
          </p>
          <h1 className="font-heading text-xl text-foreground mb-7">
            Entrar
          </h1>

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
                className="w-full px-4 py-2.5 bg-input border border-border text-foreground text-sm font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:border-gold/50 transition-colors rounded-sm"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <p role="alert" className="font-mono text-[11px] text-red-400">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 bg-gold text-primary-foreground font-mono text-[10px] uppercase tracking-[0.16em] hover:opacity-90 transition-opacity disabled:opacity-50 rounded-sm"
            >
              {isPending ? '...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="text-center font-mono text-[9px] text-muted-foreground/30 mt-6 tracking-widest uppercase">
          ENEEC'27 · Acesso Restrito
        </p>
      </div>
    </div>
  )
}
