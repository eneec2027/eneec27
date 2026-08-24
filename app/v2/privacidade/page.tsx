import type { Metadata } from 'next'

import PageHeader from '@/components/site/PageHeader'
import { CONTACTS, EVENT } from '@/lib/siteConfig'

export const metadata: Metadata = { title: `Política de Privacidade — ${EVENT.name}` }

// O briefing pede um link permanente no rodapé, porque a newsletter e o aviso de
// Early Birds recolhem email. Esta página descreve o que o site faz hoje — nada
// mais. ⚠️ Falta revisão de quem responde pelo tratamento de dados na NEBEC.
const SECTIONS = [
  {
    title: 'Que dados recolhemos',
    body: [
      'Endereço de e-mail, quando o submetes num dos formulários deste site: a subscrição de novidades e o aviso de abertura dos Early Birds.',
      'Nos formulários de candidatura à equipa organizadora, os dados que preenches no próprio formulário (nome, contacto, curso e a informação que escreveres nos campos livres).',
      'Não usamos cookies de publicidade nem partilhamos dados com terceiros para fins de marketing.',
    ],
  },
  {
    title: 'Para que servem',
    body: [
      'O e-mail é usado exclusivamente para te enviar novidades do ENEEC27 e para te avisar quando abrirem as inscrições.',
      'Os dados de candidatura são usados apenas para avaliar a candidatura à Comissão Organizadora.',
    ],
  },
  {
    title: 'Onde ficam guardados',
    body: [
      'Numa base de dados alojada no Supabase, acessível apenas à organização do ENEEC27.',
    ],
  },
  {
    title: 'Durante quanto tempo',
    body: [
      'Até ao fim do ENEEC27 ou até pedires a remoção, o que acontecer primeiro.',
    ],
  },
  {
    title: 'Os teus direitos',
    body: [
      `Podes pedir a qualquer momento acesso, correção ou eliminação dos teus dados, escrevendo para ${CONTACTS.geral}. Respondemos e eliminamos sem necessidade de justificação.`,
    ],
  },
  {
    title: 'Responsável pelo tratamento',
    body: [
      `${EVENT.organizerFull} — ${EVENT.department}, ${EVENT.venue}. ${EVENT.address}.`,
    ],
  },
]

export default function PrivacidadePage() {
  return (
    <>
      <PageHeader
        label="Privacidade"
        title="Política de Privacidade."
        intro="O que recolhemos, porquê, e como pedires que apaguemos."
      />

      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {SECTIONS.map(({ title, body }) => (
            <div key={title}>
              <h2 className="section-label mb-4">{title}</h2>
              <div className="space-y-3">
                {body.map(p => (
                  <p key={p} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          ))}

          <p className="mono text-xs text-muted-foreground/60 pt-8 border-t border-gold-subtle">
            Última atualização: agosto de 2026.
          </p>
        </div>
      </section>
    </>
  )
}
