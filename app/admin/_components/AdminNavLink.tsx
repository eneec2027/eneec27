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
      className={cn(
        'relative flex items-center gap-2.5 px-4 py-2.5 text-[10px] font-mono uppercase tracking-[0.14em] transition-colors',
        isActive
          ? 'text-gold'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-gold rounded-full" />
      )}
      {children}
    </Link>
  )
}
