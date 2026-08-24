'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

import Logo from '@/components/site/Logo'
import { NAV_ITEMS, ROUTES } from '@/lib/nav'
import { EARLY_BIRDS_OPEN } from '@/lib/siteConfig'

// CTA de pré-lançamento do briefing. Quando os Early Birds abrirem, a flag muda
// e o botão passa a "Garantir Bilhete" em todo o site.
const CTA = EARLY_BIRDS_OPEN
  ? { label: 'Garantir Bilhete', href: ROUTES.descobre }
  : { label: 'Descobre o ENEEC27', href: ROUTES.descobre }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    // Guard de hidratação do next-themes — mesmo padrão do V1Page e do Hero.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const handler = () => setScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isActive = (href: string) =>
    href === ROUTES.home ? pathname === href : pathname.startsWith(href)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-background/92 backdrop-blur-md border-b border-gold-subtle'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between gap-6">
        <Link href={ROUTES.home} className="shrink-0" aria-label="Início">
          {/* O lockup horizontal traz a linha "Encontro Nacional de Estudantes de
              Engenharia Civil" ao lado da marca: abaixo de ~44px de altura essa
              linha deixa de se ler. Daí a barra ser mais alta do que o habitual. */}
          <Logo variant="h" height={56} sizeClassName="h-11 sm:h-12 lg:h-13 xl:h-14 w-auto" priority />
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map(({ label, href, short }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive(href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="xl:hidden">{short ?? label}</span>
                <span className="hidden xl:inline">{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Alternar tema"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <Link
            href={CTA.href}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-gold text-primary-foreground hover:bg-gold-light transition-colors rounded-sm mono"
          >
            {CTA.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Alternar tema"
              className="p-3 -m-1 text-foreground/60 hover:text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button
            className="text-foreground/60 hover:text-foreground transition-colors p-3 -m-1"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <div className="w-6 space-y-1.5">
              <span className={`block h-px bg-current transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-px bg-current transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background/97 backdrop-blur-md border-b border-gold-subtle px-6 pb-8 pt-2">
          <ul className="divide-y divide-gold-subtle">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block text-base py-2.5 transition-colors ${
                    isActive(href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <Link
                href={CTA.href}
                onClick={() => setOpen(false)}
                className="flex justify-center px-4 py-3.5 text-xs font-semibold tracking-widest uppercase bg-gold text-primary-foreground mono rounded-sm"
              >
                {CTA.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
