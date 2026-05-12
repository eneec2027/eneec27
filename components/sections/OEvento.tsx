const PILLARS = [
  {
    number: '01',
    title: 'Conhecimento Técnico',
    description:
      'Conferências, workshops e visitas técnicas que aprofundam a formação académica e expõem os estudantes ao estado da arte da engenharia civil.',
  },
  {
    number: '02',
    title: 'Networking Profissional',
    description:
      'Contacto direto com empresas, engenheiros seniores e instituições, criando pontes entre a academia e o mercado de trabalho.',
  },
  {
    number: '03',
    title: 'Cultura de Engenharia',
    description:
      'Debate de ideias, troca de experiências entre estudantes de todo o país e celebração da identidade coletiva da engenharia civil portuguesa.',
  },
]

const PAST_EDITIONS = ['ENEEC\'26', 'ENEEC\'25', 'ENEEC\'24', 'ENEEC\'23', 'ENEEC\'22']

export default function OEvento() {
  return (
    <section id="evento" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className="section-label mb-4">O Evento</p>
          <h2 className="heading-lg text-foreground mb-6">
            O que é o ENEEC?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            O Encontro Nacional de Estudantes de Engenharia Civil é o maior evento estudantil
            da área em Portugal. Há mais de duas décadas reúne centenas de estudantes,
            profissionais e empresas numa semana intensa de aprendizagem, debate e ligação.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Em 2027, a 27.ª edição acontece em Aveiro, organizada pelo NEBEC — Núcleo
            de Estudantes de Engenharia Civil da Universidade de Aveiro. O tema:{' '}
            <span className="text-gold mono">Construção em Movimento</span>.
          </p>
        </div>

        <div className="gold-divider mb-20" />

        {/* 3 Pillars */}
        <div className="mb-20">
          <p className="section-label mb-10">Os 3 Pilares</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map(({ number, title, description }) => (
              <div key={number} className="card-dark p-8 group hover:border-gold/40 transition-colors">
                <p className="mono text-gold/40 text-4xl font-bold mb-4 group-hover:text-gold/60 transition-colors">
                  {number}
                </p>
                <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="gold-divider mb-16" />

        {/* Past editions */}
        <div>
          <p className="section-label mb-8">Edições Anteriores</p>
          <div className="flex flex-wrap gap-3">
            {PAST_EDITIONS.map(edition => (
              <span
                key={edition}
                className="mono text-xs px-4 py-2 border border-gold-subtle text-muted-foreground rounded-sm hover:border-gold/40 hover:text-foreground transition-all cursor-default"
              >
                {edition}
              </span>
            ))}
            <span className="mono text-xs px-4 py-2 text-muted-foreground/40 cursor-default">
              e mais…
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
