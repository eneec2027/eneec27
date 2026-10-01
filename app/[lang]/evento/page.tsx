import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import PageHeader from '@/components/site/PageHeader'
import Reveal from '@/components/site/Reveal'
import BlueprintRule from '@/components/site/BlueprintRule'
import TeaserVideo from '@/components/site/TeaserVideo'
import { langAlternates, routes } from '@/lib/nav'
import { getDict, isLang } from '@/lib/i18n'
import { EVENT, TEASER_VIDEO_URL, TEASER_DURATION } from '@/lib/siteConfig'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return {
    title: `${getDict(lang).evento.label} — ${EVENT.name}`,
    alternates: langAlternates(lang, '/evento'),
  }
}

// Esquadria de folha de desenho nos quatro cantos — a mesma da /descobre.
const CORNERS = [
  '-top-2 -left-2 border-t border-l',
  '-top-2 -right-2 border-t border-r',
  '-bottom-2 -left-2 border-b border-l',
  '-bottom-2 -right-2 border-b border-r',
]

// 3.2 do briefing: história do ENEEC, visão de Aveiro e mensagem de boas-vindas.
// Os três textos são da NEBEC e estão verbatim em lib/i18n.ts (pt); o inglês é
// tradução de trabalho, ainda por rever. O teaser abre a página — é para aqui
// que aponta o "Vê o teaser" do hero (#teaser).
export default async function EventoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const dict = getDict(lang)
  const d = dict.evento
  const r = routes(lang)

  // Em mobile: edição e organização lado a lado (valores curtos), datas e
  // local em linha inteira. Em desktop: edição, datas, organização, local.
  const facts = [
    { label: d.facts.edition, value: dict.event.edition, cell: 'order-1' },
    { label: d.facts.dates, value: dict.event.datesLong, cell: 'order-3 col-span-2 lg:order-2 lg:col-span-1' },
    { label: d.facts.organizer, value: EVENT.organizerFull, cell: 'order-2 lg:order-3', nowrap: true },
  ]

  return (
    <>
      <PageHeader
        lang={lang}
        label={d.label}
        title={d.title}
        intro={d.intro(dict.event.edition, EVENT.organizerFull)}
      />

      {/* Teaser e ficha: o primeiro ecrã da página */}
      <section className="pt-14 md:pt-20 pb-20 md:pb-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          {TEASER_VIDEO_URL && (
            <Reveal>
              <div id="teaser" className="scroll-mt-28">
                <div className="flex items-baseline justify-between gap-4 mb-5">
                  <h2 className="section-label">{d.teaserLabel}</h2>
                  <span className="mono text-xs text-muted-foreground tabular-nums">{TEASER_DURATION}</span>
                </div>
                <div className="relative">
                  {CORNERS.map(pos => (
                    <span key={pos} aria-hidden className={`hidden sm:block absolute ${pos} w-6 h-6 border-gold/50`} />
                  ))}
                  <div className="aspect-video w-full card-dark overflow-hidden">
                    <TeaserVideo label={d.teaserLabel} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">{d.teaserCaption}</p>
              </div>
            </Reveal>
          )}

          {/* Legenda do desenho: os factos do evento numa grelha de células,
              2 colunas em mobile e 4 em desktop. */}
          <Reveal delay={0.06}>
            <h2 className="sr-only">{d.factsLabel}</h2>
            <dl className="mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-gold-subtle rounded-sm overflow-hidden">
              {facts.map(({ label, value, cell, nowrap }) => (
                <div key={label} className={`bg-background p-4 sm:p-5 md:p-6 ${cell}`}>
                  <dt className="section-label mb-2">{label}</dt>
                  <dd className={`text-foreground font-semibold leading-snug ${nowrap ? 'whitespace-nowrap' : ''}`}>{value}</dd>
                </div>
              ))}
              <div className="bg-background p-4 sm:p-5 md:p-6 order-4 col-span-2 lg:col-span-1">
                <dt className="section-label mb-2">{d.facts.venue}</dt>
                <dd className="text-foreground font-semibold leading-snug">
                  {dict.event.department}
                  <span className="block text-sm font-normal text-muted-foreground mt-1">{dict.event.venue}</span>
                  <a
                    href={EVENT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 py-1 mono text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
                  >
                    {d.mapLink} ↗
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* História, com os dois marcos que o próprio texto dá */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-7">
            <h2 className="section-label mb-6">{d.historyLabel}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{d.history}</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <ol className="card-dark p-6 md:p-8 space-y-8">
              {d.milestones.map(({ year, text }, i) => {
                const last = i === d.milestones.length - 1
                return (
                  <li key={year} className="relative pl-8">
                    {/* Linha da cronologia entre os marcos */}
                    {!last && <span aria-hidden className="absolute left-[5px] top-4 -bottom-8 w-px bg-gold/30" />}
                    <span
                      aria-hidden
                      className={`absolute left-0 top-2.5 w-[11px] h-[11px] rounded-full border border-gold ${last ? 'bg-gold' : 'bg-transparent'}`}
                    />
                    <p className="mono text-3xl md:text-4xl font-bold text-gold tabular-nums leading-none">{year}</p>
                    <p className="text-sm text-muted-foreground mt-2">{text}</p>
                  </li>
                )
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Aveiro: o texto e um plano do próprio teaser */}
      <section className="py-20 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5 lg:order-last">
            <h2 className="section-label mb-6">{d.aveiroLabel}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{d.aveiro}</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <figure>
              <Image
                src="/evento-aveiro.jpg"
                alt={d.aveiroImageAlt}
                width={1600}
                height={900}
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                className="w-full h-auto rounded-sm border border-gold-subtle"
              />
              <figcaption className="mono text-xs tracking-wide text-muted-foreground mt-3">
                {d.aveiroImageCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Os 3 pilares: hipótese de trabalho, ainda por confirmar com a NEBEC. */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <h2 className="section-label mb-10">{d.pillarsLabel}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {d.pillars.map(({ title, description }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="relative overflow-hidden card-dark p-6 md:p-8 h-full group hover:border-gold/40 transition-colors">
                  {/* Filete de topo. Como classe de borda perdia para o .card-dark. */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-gold/50" />
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

      <section className="py-20 md:py-24 bg-background grid-bg">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="section-label mb-8">{d.welcomeLabel}</h2>
            <blockquote className="font-[family-name:var(--font-heading)] text-xl md:text-2xl leading-relaxed text-foreground border-l-2 border-gold pl-6 md:pl-8">
              {d.welcome}
            </blockquote>
            <p className="mono text-xs tracking-widest uppercase text-muted-foreground mt-6 pl-6 md:pl-8">
              {d.welcomeSignature}
            </p>
          </Reveal>

          <BlueprintRule className="my-14 opacity-80" />

          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-foreground font-semibold text-lg">{d.programaCta}</p>
              <Link
                href={r.programa}
                className="self-start sm:self-auto inline-flex items-center px-6 py-3 border border-gold/40 text-foreground/90 font-medium text-sm tracking-wide hover:border-gold hover:text-foreground transition-all rounded-sm"
              >
                {d.programaLink} →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
