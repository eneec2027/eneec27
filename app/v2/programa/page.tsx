import type { Metadata } from 'next'

import PageHeader from '@/components/site/PageHeader'
import Reveal from '@/components/site/Reveal'
import Programa from '@/components/sections/Programa'
import Oradores from '@/components/sections/Oradores'
import { EVENT, SCHEDULE_ANNOUNCED } from '@/lib/siteConfig'
import { SOCIAL } from '@/lib/siteConfig'

export const metadata: Metadata = { title: `Programa — ${EVENT.name}` }

// "Concentra o programa dos quatro dias: horários, workshops, visitas técnicas e
// restantes atividades. Até estar fechado, pode surgir como 'Brevemente'" — briefing.
//
// Nada aqui inventa sessões: a timeline interactiva existe e está preservada
// atrás de SCHEDULE_ANNOUNCED, tal como os workshops atrás de WORKSHOPS_ANNOUNCED.
export default function ProgramaPage() {
  return (
    <>
      <PageHeader
        label="Programa"
        title={SCHEDULE_ANNOUNCED ? 'Quatro dias de engenharia.' : 'Brevemente.'}
        intro={
          SCHEDULE_ANNOUNCED
            ? 'Palestras, feira de empresas, visitas técnicas e convívio, de quarta a sábado. Os temas e oradores por fechar são anunciados à medida que forem confirmados.'
            : 'O programa dos quatro dias — conferências, workshops, visitas técnicas e momentos de convívio — está a ser fechado. Anunciamos cada peça assim que estiver confirmada.'
        }
      />

      {!SCHEDULE_ANNOUNCED && (
        <section className="pt-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2 mono text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors"
              >
                Acompanhar os anúncios em{'\u00A0'}{SOCIAL.instagramHandle} →
              </a>
            </Reveal>
          </div>
        </section>
      )}

      <Programa />
      <Oradores />
    </>
  )
}
