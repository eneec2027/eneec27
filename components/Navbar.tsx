'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const NAV_LINKS = [
  { label: 'O Evento', href: '#evento' },
  { label: 'Programa', href: '#programa' },
  { label: 'Oradores', href: '#oradores' },
  { label: 'Localização', href: '#localizacao' },
  { label: 'Empresas', href: '#empresas' },
  { label: 'Patrocinadores', href: '#patrocinadores' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-gold-subtle' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="#hero" className="flex items-center shrink-0">
          {mounted ? (
            <Image
              src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.jpg'}
              alt="ENEEC'27"
              width={44}
              height={44}
              className="rounded-sm"
              priority
            />
          ) : (
            <div className="w-11 h-11 rounded-sm bg-surface" />
          )}
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Alternar tema"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <a
            href="#inscricoes"
            className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-200 rounded-sm mono"
          >
            Inscrições
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Alternar tema"
              className="p-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}
          <button
            className="text-foreground/60 hover:text-foreground transition-colors"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
          >
            <div className="w-5 space-y-1">
              <span className={`block h-px bg-current transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-px bg-current transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-gold-subtle px-6 pb-6 pt-2">
          <ul className="space-y-4">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#inscricoes"
                onClick={() => setOpen(false)}
                className="inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-gold text-gold mono rounded-sm"
              >
                Inscrições
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
