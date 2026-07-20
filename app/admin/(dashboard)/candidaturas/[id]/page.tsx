import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { SECTORS, SECTOR_SLUGS, SECTOR_QUESTIONS, type Sector } from '@/lib/sectors'

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground mb-1">{label}</p>
      <p className="text-foreground text-sm leading-relaxed">{value ?? '—'}</p>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-border rounded-sm p-6 space-y-5">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">{title}</p>
      {children}
    </section>
  )
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-PT', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function CandidaturaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: app, error } = await getSupabaseAdmin()
    .from('applications')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !app) notFound()

  const sectorPrefs = (app.sector_prefs as string[]) ?? []
  const sectorAnswers = (app.sector_answers as Record<string, { q1: string; q2: string; q3: string }>) ?? {}

  return (
    <div className="p-8 max-w-3xl space-y-6">
      <div>
        <Link href="/admin/candidaturas" className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground hover:text-gold transition-colors mb-4">
          <ArrowLeft size={11} />
          Candidaturas
        </Link>
        <h1 className="font-heading text-2xl text-foreground">{app.full_name}</h1>
        <p className="font-mono text-[10px] text-muted-foreground/60 mt-1">{formatDate(app.created_at)}</p>
      </div>

      <Block title="01 · Perfil">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email" value={app.email} />
          <Field label="Telemóvel" value={app.phone} />
          <Field label="Universidade" value={app.university} />
          <Field label="Curso" value={app.course} />
          <Field label="Ano curricular" value={app.academic_year} />
          <Field label="Disponibilidade semanal" value={app.availability} />
          <Field label="Deslocação a Aveiro" value={app.can_travel} />
        </div>
      </Block>

      <Block title="02 · Experiência em Eventos">
        <Field label="Tem experiência?" value={app.has_event_xp ? 'Sim' : 'Não'} />
        {app.has_event_xp && app.event_xp_desc && (
          <Field label="Descrição" value={app.event_xp_desc} />
        )}
      </Block>

      <Block title="03 · Motivação">
        <Field label="Motivação" value={app.motivation} />
        <Field label="Diferenciação" value={app.differentiation} />
        <Field label="Como soube do ENEEC" value={app.how_found_out} />
      </Block>

      <Block title="04 · Setores Escolhidos">
        <div className="flex flex-wrap gap-2">
          {sectorPrefs.map((s: string, i: number) => (
            <span key={s} className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-gold/10 text-gold rounded-sm border border-gold/20">
              <span className="opacity-40">{i + 1}.</span>
              {s}
            </span>
          ))}
        </div>
      </Block>

      {sectorPrefs.length > 0 && (
        <Block title="05 · Respostas por Setor">
          <div className="space-y-8">
            {sectorPrefs.map((sectorName: string) => {
              const slug = SECTOR_SLUGS[sectorName as Sector]
              const answers = sectorAnswers[slug]
              const questions = SECTOR_QUESTIONS[sectorName as Sector]
              if (!questions) return null
              return (
                <div key={slug} className="space-y-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground border-b border-border/40 pb-2">
                    {sectorName}
                  </p>
                  {questions.map((q, qi) => {
                    const key = `q${qi + 1}` as 'q1' | 'q2' | 'q3'
                    return (
                      <div key={qi} className="space-y-1">
                        <p className="font-mono text-[9px] text-muted-foreground/70 leading-relaxed">{q}</p>
                        <p className="text-foreground text-sm leading-relaxed pl-3 border-l border-gold/25">
                          {answers?.[key] ?? <span className="text-muted-foreground/40 italic">Sem resposta</span>}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </Block>
      )}
    </div>
  )
}
