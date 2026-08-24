import Link from 'next/link'

import Reveal from '@/components/site/Reveal'
import PartnerGrid from '@/components/site/PartnerGrid'
import { INSTITUTIONAL_PARTNERS, SPONSORS } from '@/lib/content'
import { SPONSORS_ANNOUNCED, CONTACTS } from '@/lib/siteConfig'
import { ROUTES } from '@/lib/nav'

// Bloco 4 do briefing. Modular por construção: acrescentar uma entrada em
// INSTITUTIONAL_PARTNERS ou SPONSORS não obriga a mexer aqui.
//
// "Enquanto ainda não existirem patrocinadores confirmados, a respetiva área
// pode ficar oculta" — briefing. É o que a flag SPONSORS_ANNOUNCED faz.
export default function Apoios() {
  return (
    <section className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="section-label mb-4">Apoios Institucionais</p>
          <h2 className="heading-lg text-foreground mb-12 max-w-2xl">
            Quem caminha connosco
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <PartnerGrid partners={INSTITUTIONAL_PARTNERS} />
        </Reveal>

        {SPONSORS_ANNOUNCED && SPONSORS.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-16">
              <p className="section-label mb-8">Patrocinadores</p>
              <PartnerGrid partners={SPONSORS} size="sm" />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.12}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={ROUTES.parceiros}
              className="inline-block py-2 mono text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
            >
              Ver todos os{'\u00A0'}parceiros →
            </Link>
            <a
              href={`mailto:${CONTACTS.parcerias}`}
              className="inline-block py-2 mono text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors"
            >
              Apoiar o ENEEC27 · {CONTACTS.parcerias}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
