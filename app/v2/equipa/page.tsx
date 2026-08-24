import type { Metadata } from 'next'
import Image from 'next/image'

import Link from 'next/link'

import PageHeader from '@/components/site/PageHeader'
import Reveal from '@/components/site/Reveal'
import BlueprintRule from '@/components/site/BlueprintRule'
import { TEAM, AMBASSADORS, type Member } from '@/lib/content'
import { ROUTES } from '@/lib/nav'
import { CONTACTS, EVENT, TEAM_ANNOUNCED, AMBASSADORS_ANNOUNCED } from '@/lib/siteConfig'

export const metadata: Metadata = { title: `Equipa & Embaixadores — ${EVENT.name}` }

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

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="card-dark p-6 flex flex-col">
          <div className="w-16 h-16 rounded-sm bg-surface border border-gold-subtle flex items-center justify-center mb-4">
            <span className="mono text-gold/30 text-lg font-bold">?</span>
          </div>
          <p className="font-semibold text-muted-foreground/50 italic">A anunciar</p>
          <p className="text-xs text-gold mono mt-1">{children}</p>
        </div>
      ))}
    </div>
  )
}

export default function EquipaPage() {
  return (
    <>
      <PageHeader
        label="Equipa & Embaixadores"
        title="Quem está a construir o ENEEC27."
        intro={`A Comissão Organizadora do ${EVENT.organizerFull} e os embaixadores que representam o encontro em cada universidade do país.`}
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="section-label mb-4">Comissão Organizadora</p>
            <h2 className="heading-lg text-foreground mb-12">A casa</h2>
          </Reveal>

          <Reveal delay={0.06}>
            {TEAM_ANNOUNCED && TEAM.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {TEAM.map(m => <PersonCard key={m.name} member={m} />)}
              </div>
            ) : (
              <>
                <EmptyState>Comissão Organizadora</EmptyState>
                <p className="text-xs text-muted-foreground mono mt-6">
                  Fotografias e funções a publicar.
                </p>
              </>
            )}
          </Reveal>

          <BlueprintRule className="my-20 opacity-80" />

          <Reveal>
            <p className="section-label mb-4">Embaixadores</p>
            <h2 className="heading-lg text-foreground mb-12">O país todo</h2>
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
                <EmptyState>Embaixador</EmptyState>
                <p className="text-xs text-muted-foreground mono mt-6">
                  Embaixadores por universidade a anunciar.
                </p>
              </>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Candidatura à Comissão Organizadora: o mesmo formulário que a
                  V1 serve em /candidatura desde maio. */}
              <div className="card-dark p-8 flex flex-col">
                <p className="text-foreground font-semibold mb-1">
                  Queres fazer parte da equipa?
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  As candidaturas à Comissão Organizadora fazem-se num formulário curto.
                </p>
                <Link
                  href={ROUTES.candidatura}
                  className="mt-auto self-start inline-flex items-center gap-2 px-5 py-3 bg-gold text-primary-foreground text-xs font-semibold tracking-widest uppercase mono rounded-sm hover:bg-gold-light transition-colors"
                >
                  Candidatar-me →
                </Link>
              </div>

              <div className="card-dark p-8 flex flex-col">
                <p className="text-foreground font-semibold mb-1">
                  Queres representar a tua universidade?
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Fala connosco — há lugar para embaixadores em todo o país.
                </p>
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
