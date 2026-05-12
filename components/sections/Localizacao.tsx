const VENUE_INFO = [
  { label: 'Local', value: 'Universidade de Aveiro' },
  { label: 'Cidade', value: 'Aveiro, Portugal' },
  { label: 'Datas', value: '15–18 Março 2027' },
  { label: 'Acesso', value: 'A25 / IC2 · AP 5 min a pé' },
]

const TRANSPORT = [
  {
    icon: '🚆',
    title: 'Comboio',
    desc: 'Estação de Aveiro a 10 min a pé. Ligações diretas de Lisboa, Porto e Coimbra.',
  },
  {
    icon: '🚗',
    title: 'Automóvel',
    desc: 'A25 saída Aveiro Sul. Parque de estacionamento gratuito no campus da UA.',
  },
  {
    icon: '✈️',
    title: 'Avião',
    desc: 'Aeroporto Francisco Sá Carneiro (Porto) a ~70 km. Transfers disponíveis.',
  },
]

export default function Localizacao() {
  return (
    <section id="localizacao" className="py-28 bg-[#080c14] grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-4">Localização</p>
          <h2 className="heading-lg text-foreground">
            Aveiro, Cidade Canal
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map placeholder */}
          <div className="aspect-[4/3] card-dark flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold text-lg">📍</span>
              </div>
              <p className="text-muted-foreground text-sm">Mapa interativo</p>
              <p className="mono text-xs text-muted-foreground/50 mt-1">a integrar brevemente</p>
              <a
                href="https://maps.google.com/?q=Universidade+de+Aveiro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-4 text-xs text-gold mono hover:text-gold-light transition-colors border border-gold/30 px-4 py-2 rounded-sm"
              >
                Abrir no Google Maps →
              </a>
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="space-y-4 mb-10">
              {VENUE_INFO.map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-4 py-3 border-b border-gold-subtle">
                  <span className="section-label w-20 shrink-0">{label}</span>
                  <span className="text-foreground text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>

            <p className="section-label mb-6">Como chegar</p>
            <div className="space-y-4">
              {TRANSPORT.map(({ icon, title, desc }) => (
                <div key={title} className="card-dark p-5 flex gap-4">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 card-dark p-5 border-gold/20">
              <p className="section-label mb-2">Alojamento</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Alojamento protocolar disponível para participantes de fora de Aveiro.
                Detalhes disponibilizados após inscrição confirmada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
