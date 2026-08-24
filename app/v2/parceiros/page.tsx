import type { Metadata } from 'next'

import PageHeader from '@/components/site/PageHeader'
import PartnerGrid from '@/components/site/PartnerGrid'
import Reveal from '@/components/site/Reveal'
import BlueprintRule from '@/components/site/BlueprintRule'
import { INSTITUTIONAL_PARTNERS, ORGANIZERS, SPONSORS } from '@/lib/content'
import { CONTACTS, EVENT, SPONSORS_ANNOUNCED } from '@/lib/siteConfig'

export const metadata: Metadata = { title: `Parceiros — ${EVENT.name}` }

// "Reúne os apoios institucionais e patrocinadores, com uma estrutura preparada
// para crescer ao longo do tempo. Pode incluir um contacto direto para empresas
// interessadas em apoiar o evento." — briefing.
//
// Não há tabela de patrocínio nesta página. A anterior prometia stands, tempos
// de palco e acessos VIP que a NEBEC nunca aprovou; o que se oferece a um
// patrocinador negoceia-se por email, não se publica antes de existir.
export default function ParceirosPage() {
  return (
    <>
      <PageHeader
        label="Parceiros"
        title="Quem torna isto possível."
        intro="O ENEEC27 acontece com o apoio de instituições e empresas que acreditam na formação dos futuros engenheiros civis portugueses."
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="section-label mb-8">Apoios Institucionais</p>
          </Reveal>
          <Reveal delay={0.06}>
            <PartnerGrid partners={INSTITUTIONAL_PARTNERS} size="lg" />
          </Reveal>

          <BlueprintRule className="my-20 opacity-80" />

          <Reveal>
            <p className="section-label mb-8">Organização</p>
          </Reveal>
          <Reveal delay={0.06}>
            <PartnerGrid partners={ORGANIZERS} />
          </Reveal>

          {/* Área de patrocinadores: oculta enquanto não houver confirmados —
              instrução explícita do briefing. Quando entrarem, aparecem numa
              grelha própria abaixo dos apoios institucionais. */}
          {SPONSORS_ANNOUNCED && SPONSORS.length > 0 && (
            <>
              <BlueprintRule className="my-20 opacity-80" />
              <Reveal>
                <p className="section-label mb-8">Patrocinadores</p>
              </Reveal>
              <Reveal delay={0.06}>
                <PartnerGrid partners={SPONSORS} />
              </Reveal>
            </>
          )}
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="card-dark p-10 md:p-14">
              <p className="section-label mb-4">Empresas</p>
              <h2 className="heading-lg text-foreground mb-5 max-w-2xl">
                Associe a sua marca ao futuro da engenharia civil.
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
                Quatro dias, {EVENT.venue}, centenas de estudantes de Engenharia Civil de
                todo o país. Se quiser apoiar o {EVENT.name}, falamos das formas de
                colaboração possíveis — apresentamos o que faz sentido para cada empresa.
              </p>
              <a
                href={`mailto:${CONTACTS.parcerias}`}
                className="inline-flex items-center px-6 py-3 bg-gold text-primary-foreground text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:bg-gold-light transition-colors"
              >
                {CONTACTS.parcerias}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
