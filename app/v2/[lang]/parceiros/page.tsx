import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageHeader from '@/components/site/PageHeader'
import PartnerGrid from '@/components/site/PartnerGrid'
import Reveal from '@/components/site/Reveal'
import BlueprintRule from '@/components/site/BlueprintRule'
import { INSTITUTIONAL_PARTNERS, ORGANIZERS, SPONSORS } from '@/lib/content'
import { CONTACTS, EVENT, SPONSORS_ANNOUNCED } from '@/lib/siteConfig'
import { getDict, isLang } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return { title: `${getDict(lang).parceiros.label} — ${EVENT.name}` }
}

// "Reúne os apoios institucionais e patrocinadores, com uma estrutura preparada
// para crescer ao longo do tempo. Pode incluir um contacto direto para empresas
// interessadas em apoiar o evento." — briefing.
//
// Não há tabela de patrocínio nesta página. A anterior prometia stands, tempos
// de palco e acessos VIP que a NEBEC nunca aprovou; o que se oferece a um
// patrocinador negoceia-se por email, não se publica antes de existir.
export default async function ParceirosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const dict = getDict(lang)
  const d = dict.parceiros

  return (
    <>
      <PageHeader lang={lang} label={d.label} title={d.title} intro={d.intro} />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="section-label mb-8">{d.institutional}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <PartnerGrid partners={INSTITUTIONAL_PARTNERS} size="lg" />
          </Reveal>

          <BlueprintRule className="my-20 opacity-80" />

          <Reveal>
            <p className="section-label mb-8">{d.organization}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <PartnerGrid partners={ORGANIZERS} />
          </Reveal>

          {/* Área de patrocinadores: oculta enquanto não houver confirmados —
              instrução explícita do briefing. */}
          {SPONSORS_ANNOUNCED && SPONSORS.length > 0 && (
            <>
              <BlueprintRule className="my-20 opacity-80" />
              <Reveal>
                <p className="section-label mb-8">{d.sponsors}</p>
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
              <p className="section-label mb-4">{d.companiesLabel}</p>
              <h2 className="heading-lg text-foreground mb-5 max-w-2xl">{d.companiesTitle}</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
                {d.companiesText(dict.event.venue)}
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
