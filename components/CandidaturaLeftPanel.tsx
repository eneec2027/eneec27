'use client'

import {
  Handshake,
  Microscope,
  Megaphone,
  Package,
  Palette,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SECTORS, SECTOR_SHORT, type Sector } from '@/lib/sectors'

const SECTOR_ICONS: Record<Sector, LucideIcon> = {
  'Relações Institucionais & Empresariais': Handshake,
  'Científico & Pedagógico':               Microscope,
  'Comunicação & Marketing':               Megaphone,
  'Logística':                             Package,
  'Cultural':                              Palette,
  'Financeiro':                            TrendingUp,
}

export function CandidaturaLeftPanel() {
  return (
    <aside className={cn(
      'relative flex flex-col px-8 sm:px-12 pt-8 pb-10 overflow-hidden',
      'border-b border-gold/8',
      'md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-b-0 md:border-r md:border-gold/8'
    )}>

      {/* Animated ambient orb */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gold pointer-events-none blur-3xl"
        style={{ animation: 'orb-drift 9s ease-in-out infinite' }}
      />

      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between mb-10 md:mb-14">
        <div className="flex items-center gap-2.5">
          <div className="w-[3px] h-5 bg-gold rounded-full" style={{ animation: 'gold-pulse 3s ease-in-out infinite' }} />
          <span className="mono font-bold text-gold tracking-[0.25em] text-xs uppercase">
            ENEEC<span className="text-foreground/30">'</span>27
          </span>
        </div>
        <a
          href="/"
          className="mono text-[0.58rem] text-muted-foreground/35 hover:text-gold transition-colors tracking-[0.2em] uppercase"
        >
          ← Início
        </a>
      </nav>

      {/* Heading block */}
      <div className="relative z-10 mb-8 md:mb-10">
        <p
          className="mono text-[0.55rem] text-gold/50 tracking-[0.35em] uppercase mb-4"
          style={{ opacity: 0, animation: 'dept-enter 0.5s ease 0ms forwards' }}
        >
          NEBEC · 15.ª Edição
        </p>

        <h1
          className="font-bold leading-[0.88] tracking-tight mb-5"
          style={{
            fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
            opacity: 0,
            animation: 'dept-enter 0.6s ease 80ms forwards',
          }}
        >
          <span className="block text-foreground">Equipa</span>
          <span className="block text-gold glow-text">Organizadora</span>
        </h1>

        {/* Animated accent line */}
        <div
          className="flex items-center gap-3 mb-5"
          style={{ opacity: 0, animation: 'dept-enter 0.5s ease 160ms forwards' }}
        >
          <div
            className="h-px w-10 bg-gold/50 origin-left"
            style={{ animation: 'line-grow 0.6s ease 240ms both' }}
          />
          <p className="mono text-[0.58rem] text-gold/70 tracking-[0.25em] uppercase">
            Construção em Movimento
          </p>
        </div>

        <p
          className="text-sm text-foreground/55 leading-relaxed max-w-sm"
          style={{ opacity: 0, animation: 'dept-enter 0.5s ease 200ms forwards' }}
        >
          Candidata-te à equipa que vai organizar o maior encontro de estudantes
          de Engenharia Civil em Portugal. Aveiro, Abril 2027.
        </p>
      </div>

      {/* Departments */}
      <div className="relative z-10 flex-1">
        <p
          className="mono text-[0.55rem] text-gold/40 tracking-[0.25em] uppercase mb-4"
          style={{ opacity: 0, animation: 'dept-enter 0.5s ease 260ms forwards' }}
        >
          Departamentos
        </p>

        <div className="space-y-0">
          {SECTORS.map((sector, i) => {
            const Icon = SECTOR_ICONS[sector]
            return (
              <div
                key={sector}
                className={cn('group flex items-start gap-3 py-3 border-b border-gold/6 cursor-default relative overflow-hidden transition-all duration-300 hover:border-gold/20')}
                style={{
                  opacity: 0,
                  animation: 'dept-enter 0.5s ease forwards',
                  animationDelay: `${320 + i * 70}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gold/4 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                <div className={cn('relative z-10 flex-shrink-0 w-8 h-8 rounded-sm border border-gold/15 bg-gold/5 flex items-center justify-center transition-all duration-300 group-hover:border-gold/45 group-hover:bg-gold/12')}>
                  <Icon size={14} className="text-gold/40 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                </div>

                <div className="relative z-10 pt-0.5">
                  <p className={cn('text-xs font-semibold text-foreground/65 leading-snug mono mb-0.5 transition-colors duration-300 group-hover:text-foreground/90')}>
                    {sector}
                  </p>
                  <p className={cn('text-[0.63rem] text-muted-foreground/35 leading-snug transition-colors duration-300 group-hover:text-muted-foreground/55')}>
                    {SECTOR_SHORT[sector]}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 mt-8 pt-6 border-t border-gold/8 space-y-3"
        style={{ opacity: 0, animation: 'dept-enter 0.5s ease 780ms forwards' }}
      >
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {[
            ['Aveiro',     'local'],
            ['Abril 2027', 'data' ],
            ['~10 min',    'duração'],
          ].map(([v, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="mono font-semibold text-gold/70 text-xs">{v}</span>
              <span className="mono text-[0.5rem] text-muted-foreground/30 tracking-widest uppercase">{l}</span>
            </div>
          ))}
        </div>
        <p className="mono text-[0.55rem] text-muted-foreground/25">
          Dúvidas?{' '}
          <a href="mailto:logistica.eneec@ua.pt" className="text-gold/40 hover:text-gold transition-colors">
            logistica.eneec@ua.pt
          </a>
        </p>
      </div>
    </aside>
  )
}
