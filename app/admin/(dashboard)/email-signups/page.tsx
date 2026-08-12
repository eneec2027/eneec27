import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { PageHeader } from '../../_components/PageHeader'
import { StatCard } from '../../_components/StatCard'
import { EmptyState } from '../../_components/EmptyState'
import { DataTable, DataRow } from '../../_components/DataTable'
import { QueryError } from '../../_components/QueryError'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-PT', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function EmailSignupsPage() {
  const { data: signups, error } = await getSupabaseAdmin()
    .from('email_signups')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <QueryError message={error.message} />

  const total = signups?.length ?? 0

  return (
    <div className="p-5 sm:p-8 space-y-8">
      <PageHeader
        title="Newsletter"
        aside={total > 0 ? `${total} ${total === 1 ? 'email' : 'emails'}` : undefined}
      />

      <StatCard label="Emails registados" value={total} primary className="max-w-[12rem]" />

      {total === 0 ? (
        <EmptyState
          title="Ainda não há emails registados"
          hint={<>A caixa de recolha está no fundo da página inicial. Quem se inscrever para ser avisado da abertura aparece aqui.</>}
        />
      ) : (
        <DataTable headers={['Email', 'Data de registo']}>
          {signups?.map(s => (
            <DataRow key={s.id}>
              <td className="py-3 px-4 font-mono text-[12px] text-foreground">{s.email}</td>
              <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground/60 tabular-nums whitespace-nowrap">
                {formatDate(s.created_at)}
              </td>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  )
}
