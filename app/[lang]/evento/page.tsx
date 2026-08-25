import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageHeader from '@/components/site/PageHeader'
import Reveal from '@/components/site/Reveal'
import BlueprintRule from '@/components/site/BlueprintRule'
import { langAlternates } from '@/lib/nav'
import { getDict, isLang } from '@/lib/i18n'
import { EVENT } from '@/lib/siteConfig'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return {
    title: `${getDict(lang).evento.label} — ${EVENT.name}`,
    alternates: langAlternates(lang, '/evento'),
  }
}

// 3.2 do briefing: história do ENEEC, visão de Aveiro e mensagem de boas-vindas.
// Os três textos são da NEBEC e estão verbatim em lib/i18n.ts (pt); o inglês é
// tradução de trabalho, ainda por rever.
export default async function EventoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const dict = getDict(lang)
  const d = dict.evento

  return (
    <>
      <PageHeader
        lang={lang}
        label={d.label}
        title={d.title}
        intro={d.intro(dict.event.edition, EVENT.organizerFull)}
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-6 lg:gap-16">
            <Reveal>
              <h2 className="section-label lg:pt-2">{d.historyLabel}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{d.history}</p>
            </Reveal>
          </div>

          <BlueprintRule className="my-20 opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-6 lg:gap-16">
            <Reveal>
              <h2 className="section-label lg:pt-2">{d.aveiroLabel}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{d.aveiro}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Os 3 pilares: hipótese de trabalho, ainda por confirmar com a NEBEC. */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="section-label mb-10">{d.pillarsLabel}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {d.pillars.map(({ title, description }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="card-dark p-8 h-full group hover:border-gold/40 transition-colors">
                  <p className="mono text-gold/40 text-4xl font-bold mb-4 group-hover:text-gold/60 transition-colors">
                    {String(i + 1).padStart(2, '0')}
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
            <p className="section-label mb-8">{d.welcomeLabel}</p>
            <blockquote className="font-[family-name:var(--font-heading)] text-xl md:text-2xl leading-relaxed text-foreground border-l-2 border-gold pl-6 md:pl-8">
              {d.welcome}
            </blockquote>
            <p className="mono text-xs tracking-widest uppercase text-muted-foreground mt-6 pl-6 md:pl-8">
              {d.welcomeSignature}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
