import Link from 'next/link'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { SECTORS, SECTOR_LABEL, type Sector } from '@/lib/sectors'
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

export default async function CandidaturasPage() {
  const { data: applications, error } = await getSupabaseAdmin()
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <QueryError message={error.message} />

  const total = applications?.length ?? 0

  const sectorCounts: Record<string, number> = {}
  for (const app of applications ?? []) {
    for (const s of (app.sector_prefs as string[]) ?? []) {
      sectorCounts[s] = (sectorCounts[s] ?? 0) + 1
    }
  }

  return (
    <div className="p-5 sm:p-8 space-y-8">
      <PageHeader
        title="Candidaturas"
        aside={total > 0 ? `${total} ${total === 1 ? 'registo' : 'registos'}` : undefined}
      />

      {/* Sete cartões: o total e os seis setores. Em ecrã largo cabem numa
          linha só — repartidos por quatro colunas ficavam gigantes e com um
          buraco na segunda linha. */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <StatCard label="Total" value={total} primary className="col-span-2 sm:col-span-1" />
        {SECTORS.map(sector => (
          <StatCard key={sector} label={SECTOR_LABEL[sector]} value={sectorCounts[sector] ?? 0} />
        ))}
      </div>

      {total === 0 ? (
        <EmptyState
          title="Ainda não há candidaturas"
          hint={<>O formulário está aberto em eneec.pt/candidatura. As candidaturas aparecem aqui assim que forem submetidas.</>}
        />
      ) : (
        <DataTable headers={['Nome', 'Email', 'Universidade', 'Setores', 'Data']}>
          {applications?.map(app => (
            <DataRow key={app.id}>
              <td className="py-3 px-4 whitespace-nowrap">
                <Link
                  href={`/admin/candidaturas/${app.id}`}
                  className="text-foreground hover:text-gold transition-colors font-medium focus-visible:outline-none focus-visible:text-gold focus-visible:underline"
                >
                  {app.full_name}
                </Link>
              </td>
              <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground">{app.email}</td>
              <td className="py-3 px-4 text-muted-foreground text-xs">{app.university}</td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {((app.sector_prefs as string[]) ?? []).slice(0, 3).map((s: string) => (
                    <span key={s} className="font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm bg-gold/10 text-gold border border-gold/20 whitespace-nowrap">
                      {SECTOR_LABEL[s as Sector] ?? s}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground/60 whitespace-nowrap tabular-nums">
                {formatDate(app.created_at)}
              </td>
            </DataRow>
          ))}
        </DataTable>
      )}
    </div>
  )
}
