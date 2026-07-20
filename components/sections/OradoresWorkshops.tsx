const SPEAKERS = [
  { name: 'A anunciar', role: 'Orador Principal', org: '', placeholder: true },
  { name: 'A anunciar', role: 'Conferência Técnica', org: '', placeholder: true },
  { name: 'A anunciar', role: 'Mesa Redonda', org: '', placeholder: true },
  { name: 'A anunciar', role: 'Workshop Keynote', org: '', placeholder: true },
]

const WORKSHOPS = [
  {
    title: 'BIM para Iniciantes',
    duration: '3h',
    spots: 30,
    filled: 0,
    tags: ['BIM', 'Autodesk', 'Revit'],
    description: 'Introdução prática ao Building Information Modeling. Maquete 3D de edifício simples com Revit.',
  },
  {
    title: 'Patologia do Betão',
    duration: '3h',
    spots: 25,
    filled: 0,
    tags: ['Betão', 'Inspeção', 'Reabilitação'],
    description: 'Identificação de patologias correntes em estruturas de betão armado e metodologias de inspeção.',
  },
  {
    title: 'Geotecnia Avançada',
    duration: '3h',
    spots: 20,
    filled: 0,
    tags: ['Geotecnia', 'Fundações', 'SPT'],
    description: 'Ensaios de campo, interpretação de resultados e dimensionamento de fundações.',
  },
  {
    title: 'Sustentabilidade na Construção',
    duration: '2h',
    spots: 40,
    filled: 0,
    tags: ['LEED', 'Carbono', 'Ciclo de Vida'],
    description: 'Critérios de sustentabilidade, certificações e análise de ciclo de vida de edifícios.',
  },
]

export default function OradoresWorkshops() {
  return (
    <section id="oradores" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6">

        {/* Speakers */}
        <div className="mb-24">
          <p className="section-label mb-4">Oradores</p>
          <h2 className="heading-lg text-foreground mb-12">
            Vozes da engenharia
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPEAKERS.map((speaker, i) => (
              <div key={i} className="card-dark p-6 flex flex-col">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-sm bg-surface border border-gold-subtle flex items-center justify-center mb-4">
                  <span className="mono text-gold/30 text-lg font-bold">?</span>
                </div>
                <p className={`font-semibold mb-1 ${speaker.placeholder ? 'text-muted-foreground/50 italic' : 'text-foreground'}`}>
                  {speaker.name}
                </p>
                <p className="text-xs text-gold mono mb-1">{speaker.role}</p>
                {speaker.org && <p className="text-xs text-muted-foreground">{speaker.org}</p>}
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mono mt-6">
            Oradores a confirmar. Acompanhe as nossas redes sociais para anúncios.
          </p>
        </div>

        <div className="gold-divider mb-24" />

        {/* Workshops */}
        <div>
          <p className="section-label mb-4">Workshops</p>
          <h2 className="heading-lg text-foreground mb-12">
            Mãos à obra
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WORKSHOPS.map((ws, i) => (
              <div key={i} className="card-dark p-7 group hover:border-gold/40 transition-colors flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-base font-semibold text-foreground">{ws.title}</h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="mono text-xs text-gold border border-gold/30 px-2 py-1 rounded-sm">
                      {ws.duration}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{ws.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {ws.tags.map(tag => (
                    <span key={tag} className="mono text-xs px-2.5 py-1 bg-surface border border-gold-subtle text-muted-foreground rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs mono text-muted-foreground mb-2">
                    <span>Vagas: {ws.spots - ws.filled}/{ws.spots}</span>
                    <span>{ws.filled === 0 ? 'Inscrições brevemente' : `${ws.filled} inscritos`}</span>
                  </div>
                  <div className="h-1 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all"
                      style={{ width: `${(ws.filled / ws.spots) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
