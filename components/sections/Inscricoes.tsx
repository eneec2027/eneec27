'use client'

// ⚠️ Não está ligada a nenhuma rota. Enquanto os Early Birds não tiverem data, o
// site vive em pré-lançamento: o CTA é "Descobre o ENEEC27" e a recolha de
// interesse faz-se pelo rodapé e por /descobre — ver EARLY_BIRDS_OPEN em
// lib/siteConfig.ts. As modalidades de bilhete abaixo nunca foram confirmadas
// pela NEBEC; ficam vazias até serem.

import { useState } from 'react'

const TICKET_TYPES: {
  id: string
  label: string
  price: string
  unit: string
  description: string
  highlight: boolean
}[] = []

// As respostas do FAQ são compromissos, não descrições: preços, política de
// selecção de workshops, alojamento e certificados só podem ser afirmados
// depois de a NEBEC os aprovar. Até lá, dizer que serão anunciados.
const FAQS = [
  {
    q: 'Quando abrem as inscrições?',
    a: 'A data de abertura das inscrições será anunciada nas nossas redes sociais. Subscreve a newsletter para ser notificado em primeira mão.',
  },
  {
    q: 'Os workshops estão incluídos na inscrição?',
    a: 'As condições de acesso aos workshops ainda estão a ser definidas e serão anunciadas com o programa.',
  },
  {
    q: 'Há alojamento disponível?',
    a: 'As opções de alojamento estão a ser trabalhadas e serão anunciadas antes da abertura das inscrições.',
  },
  {
    q: 'Posso obter certificado de participação?',
    a: 'As condições de emissão de certificados serão anunciadas com os detalhes da inscrição.',
  },
  {
    q: 'Aceitam participantes de universidades estrangeiras?',
    a: 'O ENEEC é um encontro nacional e decorre em português. As condições de participação de estudantes estrangeiros serão anunciadas com os detalhes da inscrição.',
  },
]

export default function Inscricoes() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="inscricoes" className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-4">Inscrições</p>
          <h2 className="heading-lg text-foreground mb-6">
            Reserva o teu lugar
          </h2>
          <p className="text-muted-foreground max-w-xl">
            As inscrições abrem em breve. Consulta as opções de passe e os detalhes
            de cada modalidade abaixo.
          </p>
        </div>

        {/* Ticket cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TICKET_TYPES.map(({ id, label, price, unit, description, highlight }) => (
            <div
              key={id}
              className={`rounded-sm p-8 flex flex-col transition-all ${
                highlight
                  ? 'bg-gold/5 border border-gold/50 glow-gold'
                  : 'card-dark hover:border-gold/30'
              }`}
            >
              {highlight && (
                <span className="mono text-xs text-primary-foreground bg-gold px-3 py-1 rounded-sm self-start mb-4 font-semibold tracking-widest uppercase">
                  Recomendado
                </span>
              )}
              <p className="text-lg font-bold text-foreground mb-2">{label}</p>
              <div className="mb-4">
                <span className="mono text-3xl font-bold text-gold">{price}</span>
                {unit && <span className="text-muted-foreground text-sm mono ml-1">{unit}</span>}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{description}</p>
              <button
                disabled
                className="mt-auto w-full py-3 text-xs font-semibold tracking-widest uppercase mono rounded-sm border border-gold/30 text-muted-foreground cursor-not-allowed"
              >
                Em breve
              </button>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="card-dark p-8 mb-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-foreground mb-1">Recebe as novidades primeiro</p>
            <p className="text-sm text-muted-foreground">Newsletter — sem spam. Apenas o essencial.</p>
          </div>
          <form
            onSubmit={e => e.preventDefault()}
            className="flex gap-2 w-full md:w-auto"
          >
            <input
              type="email"
              placeholder="o.teu@email.pt"
              className="flex-1 min-w-0 md:w-64 px-4 py-2.5 bg-surface border border-gold-subtle rounded-sm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-gold text-primary-foreground text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:bg-gold-light transition-colors shrink-0"
            >
              Subscrever
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div>
          <p className="section-label mb-8">FAQ</p>
          <div className="space-y-2 max-w-3xl">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="card-dark overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-medium text-foreground">{q}</span>
                  <span className={`text-gold mono text-lg shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-gold-subtle">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-4">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
