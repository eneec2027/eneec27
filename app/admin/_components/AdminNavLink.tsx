'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface AdminNavLinkProps {
  href: string
  children: React.ReactNode
}

export function AdminNavLink({ href, children }: AdminNavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative flex items-center gap-2.5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em]',
        'transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 focus-visible:ring-inset',
        isActive
          ? 'text-gold bg-[color:var(--gold)]/[0.06]'
          : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.02]',
      )}
    >
      {/* Marca de folha activa na aresta, como o separador de um dossiê. */}
      <span
        aria-hidden
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full bg-gold transition-all',
          isActive ? 'h-5 opacity-100' : 'h-0 opacity-0',
        )}
      />
      {children}
    </Link>
  )
}
