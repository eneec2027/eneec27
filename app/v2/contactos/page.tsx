import type { Metadata } from 'next'

import PageHeader from '@/components/site/PageHeader'
import Reveal from '@/components/site/Reveal'
import { CONTACTS, EVENT, SOCIAL } from '@/lib/siteConfig'

export const metadata: Metadata = { title: `Contactos — ${EVENT.name}` }

// "Reúne os e-mails oficiais, redes sociais e localização do Departamento de
// Engenharia Civil / Universidade de Aveiro" — briefing.
//
// Sobre transportes: só o que é verificável. A versão anterior desta informação
// prometia "parque gratuito", "transfers" e uma estação "a 10 minutos a pé" —
// nada disso estava confirmado.
const EMAILS = [
  { label: 'E-mail geral', value: CONTACTS.geral },
  { label: 'Patrocínios / parcerias', value: CONTACTS.parcerias },
  { label: 'Candidaturas à equipa', value: CONTACTS.logistica },
]

export default function ContactosPage() {
  return (
    <>
      <PageHeader
        label="Contactos"
        title="Falar connosco."
        intro="Para dúvidas, propostas de parceria ou imprensa — respondemos a todos."
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <p className="section-label mb-8">E-mails oficiais</p>
              <ul className="space-y-px">
                {EMAILS.map(({ label, value }) => (
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
              <p className="section-label mb-8 mt-16">Redes sociais</p>
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
                      Evento oficial do ENEEC27
                    </a>
                  ) : (
                    <span className="text-muted-foreground/60 italic">a publicar</span>
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
                    <span className="text-muted-foreground/60 italic">brevemente</span>
                  )}
                </li>
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.06}>
              <p className="section-label mb-8">Onde acontece</p>
              <div className="card-dark p-8">
                <p className="text-foreground font-semibold mb-1">{EVENT.department}</p>
                <p className="text-muted-foreground">{EVENT.venue}</p>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  {EVENT.address}
                </p>
                <p className="mono text-xs text-gold mt-6 tracking-widest uppercase">
                  {EVENT.dates} · 2027
                </p>
                <a
                  href={EVENT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-6 text-xs text-gold mono hover:text-gold-light transition-colors border border-gold/30 px-4 py-2 rounded-sm"
                >
                  Abrir no Google{'\u00A0'}Maps →
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="section-label mb-8 mt-16">Como chegar</p>
              <div className="space-y-4">
                <div className="card-dark p-5">
                  <p className="text-sm font-semibold text-foreground mb-1">Comboio</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Estação de Aveiro, na linha do Norte, com ligações a Lisboa, Porto e
                    Coimbra. Do centro ao Campus de Santiago há autocarro urbano.
                  </p>
                </div>
                <div className="card-dark p-5">
                  <p className="text-sm font-semibold text-foreground mb-1">Automóvel</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A1 e A25 servem Aveiro. O campus tem estacionamento à superfície.
                  </p>
                </div>
                <div className="card-dark p-5">
                  <p className="text-sm font-semibold text-foreground mb-1">Avião</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Aeroporto Francisco Sá Carneiro (Porto), a cerca de 70 km, com ligação
                    de metro e comboio até Aveiro.
                  </p>
                </div>
                <p className="text-xs text-muted-foreground/70 mono leading-relaxed">
                  Alojamento e transportes do evento: informação a anunciar com a abertura
                  das inscrições.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
