import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import PageHeader from '@/components/site/PageHeader'
import Reveal from '@/components/site/Reveal'
import { routes } from '@/lib/nav'
import { CONTACTS, EVENT, SOCIAL } from '@/lib/siteConfig'
import { getDict, isLang } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return { title: `${getDict(lang).contactos.label} — ${EVENT.name}` }
}

// "Reúne os e-mails oficiais, redes sociais e localização do Departamento de
// Engenharia Civil / Universidade de Aveiro" — briefing.
//
// Sobre transportes: só o que é verificável. A versão anterior desta informação
// prometia "parque gratuito", "transfers" e uma estação "a 10 minutos a pé" —
// nada disso estava confirmado.
export default async function ContactosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const dict = getDict(lang)
  const d = dict.contactos
  const r = routes(lang)

  const emails = [
    { label: d.emailGeneral, value: CONTACTS.geral },
    { label: d.emailSponsors, value: CONTACTS.parcerias },
    { label: d.emailApplications, value: CONTACTS.logistica },
  ]

  return (
    <>
      <PageHeader lang={lang} label={d.label} title={d.title} intro={d.intro} />

      {/* Os dois caminhos de entrada que a V1 já tinha: candidatar-se à equipa
          organizadora e falar connosco sobre patrocínios. */}
      <section className="pt-16 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal>
            <div className="card-dark p-8 h-full flex flex-col">
              <p className="section-label mb-3">{d.teamLabel}</p>
              <h2 className="text-xl font-semibold text-foreground mb-2">{d.teamTitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{d.teamText}</p>
              <Link
                href={r.candidatura}
                className="mt-auto inline-flex items-center gap-2 self-start px-5 py-3 bg-gold text-primary-foreground text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:bg-gold-light transition-colors"
              >
                {d.teamCta}
              </Link>
              <p className="text-xs text-muted-foreground/70 mt-4">
                {d.teamDoubts}{' '}
                <a href={`mailto:${CONTACTS.logistica}`} className="inline-block py-1 text-gold hover:underline">
                  {CONTACTS.logistica}
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="card-dark p-8 h-full flex flex-col">
              <p className="section-label mb-3">{d.sponsorLabel}</p>
              <h2 className="text-xl font-semibold text-foreground mb-2">{d.sponsorTitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {d.sponsorText(dict.event.venue)}
              </p>
              <a
                href={`mailto:${CONTACTS.parcerias}`}
                className="mt-auto inline-flex items-center gap-2 self-start px-5 py-3 border border-gold/50 text-gold text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:bg-gold hover:text-primary-foreground transition-all"
              >
                {d.sponsorCta}
              </a>
              <p className="text-xs text-muted-foreground/70 mt-4">{CONTACTS.parcerias}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <p className="section-label mb-8">{d.emailsLabel}</p>
              <ul className="space-y-px">
                {emails.map(({ label, value }) => (
                  <li
                    key={value}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 border-b border-gold-subtle"
                  >
                    <span className="section-label sm:w-52 shrink-0">{label}</span>
                    <a
                      href={`mailto:${value}`}
                      className="text-foreground hover:text-gold transition-colors py-1"
                    >
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="section-label mb-8 mt-16">{d.socialLabel}</p>
              <ul className="space-y-px">
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 border-b border-gold-subtle">
                  <span className="section-label sm:w-52 shrink-0">Instagram</span>
                  <span className="flex flex-wrap gap-x-3">
                    <a
                      href={SOCIAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-2 text-foreground hover:text-gold transition-colors"
                    >
                      {SOCIAL.instagramHandle}
                    </a>
                    <span className="text-muted-foreground/50">·</span>
                    <a
                      href={SOCIAL.instagramNebec}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-2 text-foreground hover:text-gold transition-colors"
                    >
                      {SOCIAL.instagramNebecHandle}
                    </a>
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 border-b border-gold-subtle">
                  <span className="section-label sm:w-52 shrink-0">LinkedIn</span>
                  {SOCIAL.linkedin !== '#' ? (
                    <a
                      href={SOCIAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-gold transition-colors"
                    >
                      {d.linkedinText}
                    </a>
                  ) : (
                    <span className="text-muted-foreground/60 italic">{d.soon}</span>
                  )}
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 border-b border-gold-subtle">
                  <span className="section-label sm:w-52 shrink-0">TikTok</span>
                  {SOCIAL.tiktok !== '#' ? (
                    <a
                      href={SOCIAL.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-gold transition-colors"
                    >
                      TikTok
                    </a>
                  ) : (
                    <span className="text-muted-foreground/60 italic">{d.soonTikTok}</span>
                  )}
                </li>
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.06}>
              <p className="section-label mb-8">{d.whereLabel}</p>
              <div className="card-dark p-8">
                <p className="text-foreground font-semibold mb-1">{dict.event.department}</p>
                <p className="text-muted-foreground">{dict.event.venue}</p>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{EVENT.address}</p>
                <p className="mono text-xs text-gold mt-6 tracking-widest uppercase">
                  {dict.event.dates} · 2027
                </p>
                <a
                  href={EVENT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-6 text-xs text-gold mono hover:text-gold-light transition-colors border border-gold/30 px-4 py-2 rounded-sm"
                >
                  {d.maps}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="section-label mb-8 mt-16">{d.howLabel}</p>
              <div className="space-y-4">
                {d.transport.map(({ title, text }) => (
                  <div key={title} className="card-dark p-5">
                    <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground/70 mono leading-relaxed">{d.lodgingNote}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
