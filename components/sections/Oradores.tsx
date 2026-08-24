import Reveal from '@/components/site/Reveal'
import { SPEAKERS_ANNOUNCED } from '@/lib/siteConfig'
import { SOCIAL } from '@/lib/siteConfig'

// Os oradores estão a ser convidados — a folha "Palestras" do horário da NEBEC
// tem os contactos por preencher, o que quer dizer convites em curso, não
// confirmações. Até haver sim, a secção diz que serão anunciados.
//
// (O componente OradoresWorkshops, que existia antes, incluía um bloco de
// workshops. O horário recebido a 2026-08-24 não tem workshops nenhuns —
// anunciá-los seria contradizer o programa publicado ao lado.)
const SLOTS = ['Palestra Mola', 'Linha de Alta Velocidade', 'Roundtable — Habitação', 'Palestras de investigação']

export default function Oradores() {
  return (
    <section id="oradores" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="section-label mb-4">Oradores</p>
          <h2 className="heading-lg text-foreground mb-12">Vozes da engenharia</h2>
        </Reveal>

        <Reveal delay={0.06}>
          {SPEAKERS_ANNOUNCED ? null : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {SLOTS.map(slot => (
                  <div key={slot} className="card-dark p-6 flex flex-col">
                    <div className="w-16 h-16 rounded-sm bg-surface border border-gold-subtle flex items-center justify-center mb-4">
                      <span className="mono text-gold/30 text-lg font-bold">?</span>
                    </div>
                    <p className="font-semibold text-muted-foreground/50 italic">A anunciar</p>
                    <p className="text-xs text-gold mono mt-1">{slot}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mono mt-6">
                Oradores a confirmar. Acompanhe {SOCIAL.instagramHandle} para os anúncios.
              </p>
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}
