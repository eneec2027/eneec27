'use client'

import { useState } from 'react'

type Area = 'todas' | 'construção' | 'estruturas' | 'infraestruturas' | 'consultoria' | 'gestão'

interface Company {
  name: string
  area: Exclude<Area, 'todas'>
  description: string
}

const AREAS: { label: string; value: Area }[] = [
  { label: 'Todas', value: 'todas' },
  { label: 'Construção', value: 'construção' },
  { label: 'Estruturas', value: 'estruturas' },
  { label: 'Infraestruturas', value: 'infraestruturas' },
  { label: 'Consultoria', value: 'consultoria' },
  { label: 'Gestão', value: 'gestão' },
]

const COMPANIES: Company[] = [
  { name: 'A confirmar', area: 'construção', description: 'Empresa de construção civil e obras públicas.' },
  { name: 'A confirmar', area: 'estruturas', description: 'Projeto e dimensionamento de estruturas.' },
  { name: 'A confirmar', area: 'infraestruturas', description: 'Infraestruturas rodoviárias e hidráulicas.' },
  { name: 'A confirmar', area: 'consultoria', description: 'Consultoria técnica e gestão de projeto.' },
  { name: 'A confirmar', area: 'gestão', description: 'Gestão e fiscalização de obras.' },
  { name: 'A confirmar', area: 'construção', description: 'Reabilitação e conservação de edifícios.' },
  { name: 'A confirmar', area: 'estruturas', description: 'Estruturas metálicas e mistas.' },
  { name: 'A confirmar', area: 'infraestruturas', description: 'Portos, aeroportos e obras marítimas.' },
]

const AREA_COLORS: Record<Exclude<Area, 'todas'>, string> = {
  construção:       'text-amber-400 border-amber-400/30 bg-amber-400/5',
  estruturas:       'text-cyan border-cyan/30 bg-cyan/5',
  infraestruturas:  'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  consultoria:      'text-purple-400 border-purple-400/30 bg-purple-400/5',
  gestão:           'text-rose-400 border-rose-400/30 bg-rose-400/5',
}

export default function FeiraDEmpresas() {
  const [activeArea, setActiveArea] = useState<Area>('todas')

  const filtered = COMPANIES.filter(c => activeArea === 'todas' || c.area === activeArea)

  return (
    <section id="empresas" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="section-label mb-4">Feira de Empresas</p>
            <h2 className="heading-lg text-foreground">
              O mercado de trabalho<br />ao teu alcance
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Duas sessões abertas ao longo do Dia 3. Candidaturas espontâneas,
            apresentação de projetos e contacto direto com recrutadores.
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-10">
          {AREAS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveArea(value)}
              className={`px-4 py-1.5 rounded-sm text-xs tracking-wider transition-all mono border ${
                activeArea === value
                  ? 'border-gold text-gold'
                  : 'border-gold-subtle text-muted-foreground hover:border-gold/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((company, i) => (
            <div key={i} className="card-dark p-6 group hover:border-gold/40 transition-colors flex flex-col gap-4">
              {/* Logo placeholder */}
              <div className="h-12 bg-surface border border-gold-subtle rounded-sm flex items-center justify-center">
                <span className="mono text-muted-foreground/30 text-xs">{company.name}</span>
              </div>
              <div>
                <span className={`mono text-xs px-2.5 py-1 rounded-sm border ${AREA_COLORS[company.area]}`}>
                  {company.area}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{company.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 card-dark p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">A tua empresa quer marcar presença?</p>
            <p className="text-xs text-muted-foreground">Consulta o dossier de patrocínio ou entra em contacto.</p>
          </div>
          <a
            href="mailto:empresas@eneec27.pt"
            className="shrink-0 inline-flex items-center px-5 py-2.5 border border-gold text-gold text-xs mono tracking-widest uppercase hover:bg-gold hover:text-primary-foreground transition-all rounded-sm"
          >
            Contactar →
          </a>
        </div>
      </div>
    </section>
  )
}
