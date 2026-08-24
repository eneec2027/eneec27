import type { Metadata } from 'next'

import PageHeader from '@/components/site/PageHeader'
import Reveal from '@/components/site/Reveal'
import BlueprintRule from '@/components/site/BlueprintRule'
import { EVENT_HISTORY, AVEIRO_VISION, WELCOME_MESSAGE, PILLARS } from '@/lib/content'
import { EVENT } from '@/lib/siteConfig'

export const metadata: Metadata = { title: `O Evento — ${EVENT.name}` }

// 3.2 do briefing: história do ENEEC, visão de Aveiro e mensagem de boas-vindas.
// Os três textos são da NEBEC e estão verbatim em lib/content.ts.
export default function EventoPage() {
  return (
    <>
      <PageHeader
        label="O Evento"
        title="O ENEEC regressa a Aveiro."
        intro={`${EVENT.edition} do ${EVENT.fullName}, organizada pelo ${EVENT.organizerFull}.`}
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-6 lg:gap-16">
            <Reveal>
              <h2 className="section-label lg:pt-2">A história do ENEEC</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {EVENT_HISTORY}
              </p>
            </Reveal>
          </div>

          <BlueprintRule className="my-20 opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-6 lg:gap-16">
            <Reveal>
              <h2 className="section-label lg:pt-2">A visão de Aveiro</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {AVEIRO_VISION}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Os 3 pilares: hipótese de trabalho, ainda por confirmar com a NEBEC —
          ver lib/content.ts. Descrevem o que o evento faz, não prometem nada. */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="section-label mb-10">Os 3 Pilares</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map(({ number, title, description }, i) => (
              <Reveal key={number} delay={i * 0.08}>
                <div className="card-dark p-8 h-full group hover:border-gold/40 transition-colors">
                  <p className="mono text-gold/40 text-4xl font-bold mb-4 group-hover:text-gold/60 transition-colors">
                    {number}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background grid-bg">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="section-label mb-8">Mensagem de boas-vindas</p>
            <blockquote className="font-[family-name:var(--font-heading)] text-xl md:text-2xl leading-relaxed text-foreground border-l-2 border-gold pl-6 md:pl-8">
              {WELCOME_MESSAGE}
            </blockquote>
            <p className="mono text-xs tracking-widest uppercase text-muted-foreground mt-6 pl-6 md:pl-8">
              Comissão Organizadora do {EVENT.name}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
