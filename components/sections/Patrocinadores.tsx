const TIERS = [
  {
    tier: 'Ouro',
    tierEn: 'Gold',
    color: 'text-yellow-400 border-yellow-400/40',
    bgColor: 'bg-yellow-400/5',
    spots: 2,
    benefits: ['Logo no palco principal', 'Stand exclusivo na Feira de Empresas', 'Apresentação de 15 min', 'Menção em todos os materiais', 'Acesso VIP ao jantar de abertura'],
    sponsors: ['A confirmar', 'A confirmar'],
  },
  {
    tier: 'Prata',
    tierEn: 'Silver',
    color: 'text-slate-300 border-slate-300/40',
    bgColor: 'bg-slate-300/5',
    spots: 4,
    benefits: ['Logo em materiais de comunicação', 'Stand na Feira de Empresas', 'Apresentação de 5 min', 'Menção em redes sociais'],
    sponsors: ['A confirmar', 'A confirmar', 'A confirmar', 'A confirmar'],
  },
  {
    tier: 'Bronze',
    tierEn: 'Bronze',
    color: 'text-orange-600 border-orange-600/40',
    bgColor: 'bg-orange-600/5',
    spots: 6,
    benefits: ['Logo no site e materiais', 'Presença na Feira de Empresas', 'Menção na cerimónia'],
    sponsors: Array(6).fill('A confirmar'),
  },
]

export default function Patrocinadores() {
  return (
    <section id="patrocinadores" className="py-28 bg-background grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-4">Patrocinadores</p>
          <h2 className="heading-lg text-foreground mb-6">
            Quem torna isto possível
          </h2>
          <p className="text-muted-foreground max-w-xl">
            O ENEEC'27 é possível graças ao apoio de empresas e instituições que acreditam
            na formação dos futuros engenheiros civis portugueses.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {TIERS.map(({ tier, color, bgColor, sponsors, benefits }) => (
            <div key={tier} className={`rounded-sm border ${color.split(' ')[1]} ${bgColor} p-8`}>
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="md:w-48 shrink-0">
                  <p className={`mono font-bold text-lg ${color.split(' ')[0]} mb-1`}>{tier}</p>
                  <ul className="space-y-1 mt-4">
                    {benefits.map(b => (
                      <li key={b} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className={`${color.split(' ')[0]} mt-0.5`}>›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {sponsors.map((s, i) => (
                    <div
                      key={i}
                      className="aspect-[3/2] bg-surface border border-foreground/5 rounded-sm flex items-center justify-center"
                    >
                      <span className="mono text-xs text-muted-foreground/30">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsorship CTA */}
        <div className="card-dark p-8 md:p-12 text-center glow-gold">
          <p className="section-label mb-4">Quero patrocinar</p>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Associe a sua marca ao futuro<br />da engenharia civil
          </h3>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-8">
            Acesso a centenas de estudantes altamente motivados, visibilidade nacional
            e uma presença memorável em quatro dias de evento de referência.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/dossier-patrocinio-eneec27.pdf"
              className="inline-flex items-center px-7 py-3 bg-gold text-primary-foreground font-semibold text-sm tracking-widest uppercase mono hover:bg-gold-light transition-colors rounded-sm"
            >
              Dossier de Patrocínio
            </a>
            <a
              href="mailto:patrocinadores@eneec27.pt"
              className="inline-flex items-center px-7 py-3 border border-gold/40 text-foreground text-sm tracking-wide hover:border-gold transition-all rounded-sm"
            >
              Contactar a organização
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
