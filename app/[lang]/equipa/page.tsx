import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import PageHeader from '@/components/site/PageHeader'
import Reveal from '@/components/site/Reveal'
import BlueprintRule from '@/components/site/BlueprintRule'
import { TEAM, AMBASSADORS, type Member } from '@/lib/content'
import { routes, langAlternates } from '@/lib/nav'
import { CONTACTS, EVENT, TEAM_ANNOUNCED, AMBASSADORS_ANNOUNCED } from '@/lib/siteConfig'
import { getDict, isLang } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  return {
    title: `${getDict(lang).equipa.label} — ${EVENT.name}`,
    alternates: langAlternates(lang, '/equipa'),
  }
}

// "Apresenta primeiro a Comissão Organizadora, com fotografia, nome e função de
// cada elemento. Depois, os Embaixadores, agrupados por universidade" — briefing.
//
// As grelhas estão construídas; faltam as fotografias e os nomes. Enquanto as
// flags forem false, cada bloco mostra o seu estado vazio em vez de gente falsa.
function PersonCard({ member }: { member: Member }) {
  return (
    <div className="card-dark overflow-hidden group hover:border-gold/40 transition-colors">
      <div className="aspect-[4/5] relative bg-surface">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="absolute inset-0 grid-bg flex items-center justify-center">
            <span className="mono text-gold/30 text-2xl font-bold">?</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="font-semibold text-foreground">{member.name}</p>
        <p className="text-xs text-gold mono mt-1">{member.role}</p>
      </div>
    </div>
  )
}

// A etiqueta do bloco já diz de quem se trata: repeti-la nos quatro cartões só
// enchia a secção de ruído. Fica a silhueta, no formato das fotografias que hão
// de vir para o lugar.
function EmptyState({ soon }: { soon: string }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="card-dark overflow-hidden">
          <div className="aspect-[4/5] relative bg-surface grid-bg flex items-center justify-center">
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1" className="text-gold/25">
              <circle cx="12" cy="8.5" r="3.5" />
              <path d="M5 20v-1a7 7 0 0 1 14 0v1" />
            </svg>
          </div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground/50 italic">{soon}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function EquipaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const d = getDict(lang).equipa
  const r = routes(lang)

  return (
    <>
      <PageHeader
        lang={lang}
        label={d.label}
        title={d.title}
        intro={d.intro(EVENT.organizerFull)}
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="section-label mb-4">{d.teamLabel}</p>
            <h2 className="heading-lg text-foreground mb-12">{d.teamTitle}</h2>
          </Reveal>

          <Reveal delay={0.06}>
            {TEAM_ANNOUNCED && TEAM.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {TEAM.map(m => <PersonCard key={m.name} member={m} />)}
              </div>
            ) : (
              <>
                <EmptyState soon={d.soon} />
                <p className="text-xs text-muted-foreground mono mt-6">{d.teamSoon}</p>
              </>
            )}
          </Reveal>

          <BlueprintRule className="my-20 opacity-80" />

          <Reveal>
            <p className="section-label mb-4">{d.ambassadorsLabel}</p>
            <h2 className="heading-lg text-foreground mb-12">{d.ambassadorsTitle}</h2>
          </Reveal>

          <Reveal delay={0.06}>
            {AMBASSADORS_ANNOUNCED && AMBASSADORS.length > 0 ? (
              <div className="space-y-16">
                {AMBASSADORS.map(group => (
                  <div key={group.university}>
                    <p className="mono text-xs tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-gold-subtle">
                      {group.university}
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {group.members.map(m => <PersonCard key={m.name} member={m} />)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <EmptyState soon={d.soon} />
                <p className="text-xs text-muted-foreground mono mt-6">{d.ambassadorsSoon}</p>
              </>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Candidatura à Comissão Organizadora: o mesmo formulário que a
                  V1 serve em /candidatura desde maio. */}
              <div className="card-dark p-8 flex flex-col">
                <p className="text-foreground font-semibold mb-1">{d.joinTitle}</p>
                <p className="text-sm text-muted-foreground mb-6">{d.joinText}</p>
                <Link
                  href={r.candidatura}
                  className="mt-auto self-start inline-flex items-center gap-2 px-5 py-3 bg-gold text-primary-foreground text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:bg-gold-light transition-colors"
                >
                  {d.joinCta}
                </Link>
              </div>

              <div className="card-dark p-8 flex flex-col">
                <p className="text-foreground font-semibold mb-1">{d.ambassadorTitle}</p>
                <p className="text-sm text-muted-foreground mb-6">{d.ambassadorText}</p>
                <a
                  href={`mailto:${CONTACTS.geral}`}
                  className="mt-auto self-start inline-flex items-center px-5 py-3 border border-gold/40 text-foreground/80 text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:border-gold hover:text-foreground transition-all"
                >
                  {CONTACTS.geral}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
