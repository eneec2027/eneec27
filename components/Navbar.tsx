'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

import Logo from '@/components/site/Logo'
import { navItems, routes, swapLang } from '@/lib/nav'
import { EARLY_BIRDS_OPEN } from '@/lib/siteConfig'
import { getDict, LANGS, LANG_LABEL, LANG_NAME, type Lang } from '@/lib/i18n'

// Fora do componente de propósito: declarada dentro do render, a troca de
// língua era recriada a cada pintura e perdia estado.
function LangSwitch({
  lang,
  pathname,
  label,
  className = '',
}: {
  lang: Lang
  pathname: string
  label: string
  className?: string
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={label}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-muted-foreground/30 mx-1 text-xs">/</span>}
          {l === lang ? (
            <span className="mono text-xs tracking-widest text-gold" aria-current="true">
              {LANG_LABEL[l]}
            </span>
          ) : (
            <Link
              href={swapLang(pathname, l)}
              hrefLang={l}
              title={LANG_NAME[l]}
              className="mono text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {LANG_LABEL[l]}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}

export default function Navbar({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const items = navItems(lang)
  const r = routes(lang)

  // CTA de pré-lançamento do briefing. Quando os Early Birds abrirem, a flag
  // muda e o botão passa a "Garantir Bilhete" em todo o site.
  const cta = {
    label: EARLY_BIRDS_OPEN ? d.cta.ticket : d.cta.discover,
    short: EARLY_BIRDS_OPEN ? d.cta.ticketShort : d.cta.discoverShort,
    href: r.descobre,
  }

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
    href === r.home ? pathname === href : pathname.startsWith(href)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-background/92 backdrop-blur-md border-b border-gold-subtle'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between gap-3 xl:gap-6">
        <Link href={r.home} className="shrink-0" aria-label={d.nav.inicio}>
          <Logo variant="h" height={56} sizeClassName="h-11 sm:h-12 lg:h-10 xl:h-14 w-auto" priority />
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-7">
          {items.map(({ label, href, short }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block py-2 text-sm tracking-wide transition-colors ${
                  isActive(href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="xl:hidden">{short ?? label}</span>
                <span className="hidden xl:inline">{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <LangSwitch lang={lang} pathname={pathname} label={d.nav.language} />
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={d.nav.theme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-sm"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <Link
            href={cta.href}
            className="inline-flex items-center px-3 xl:px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-gold text-primary-foreground hover:bg-gold-light transition-colors rounded-sm mono whitespace-nowrap"
          >
            <span className="xl:hidden">{cta.short}</span>
            <span className="hidden xl:inline">{cta.label}</span>
          </Link>
        </div>

        {/* Mobile toggle — o selector de língua vive dentro do menu, não aqui:
            a 360px o logótipo, PT/EN, tema e menu não cabiam na mesma linha. */}
        <div className="lg:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={d.nav.theme}
              className="p-3 -m-1 text-foreground/60 hover:text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button
            className="text-foreground/60 hover:text-foreground transition-colors p-3 -m-1"
            onClick={() => setOpen(o => !o)}
            aria-label={d.nav.menu}
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
          <div className="flex items-center justify-between py-3 mb-1 border-b border-gold-subtle">
            <span className="section-label">{d.nav.language}</span>
            <LangSwitch lang={lang} pathname={pathname} label={d.nav.language} />
          </div>

          <ul className="divide-y divide-gold-subtle">
            {items.map(({ label, href }) => (
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
                href={cta.href}
                onClick={() => setOpen(false)}
                className="flex justify-center px-4 py-3.5 text-xs font-semibold tracking-widest uppercase bg-gold text-primary-foreground mono rounded-sm"
              >
                {cta.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
