import Link from 'next/link'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { SECTORS, SECTOR_SLUGS } from '@/lib/sectors'

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

  if (error) {
    return (
      <div className="p-8">
        <p className="font-mono text-sm text-red-400">Erro: {error.message}</p>
      </div>
    )
  }

  const total = applications?.length ?? 0

  const sectorCounts: Record<string, number> = {}
  for (const app of applications ?? []) {
    for (const s of (app.sector_prefs as string[]) ?? []) {
      sectorCounts[s] = (sectorCounts[s] ?? 0) + 1
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold mb-1">ENEEC'27 · Admin</p>
        <h1 className="font-heading text-2xl text-foreground">Candidaturas</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="col-span-2 sm:col-span-1 bg-surface border border-border rounded-sm p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground mb-1">Total</p>
          <p className="font-mono text-3xl font-bold text-gold">{total}</p>
        </div>
        {SECTORS.map(sector => (
          <div key={sector} className="bg-surface border border-border rounded-sm p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground mb-1 leading-tight">
              {SECTOR_SLUGS[sector]}
            </p>
            <p className="font-mono text-xl font-bold text-foreground">{sectorCounts[sector] ?? 0}</p>
          </div>
        ))}
      </div>

      {total === 0 ? (
        <p className="font-mono text-sm text-muted-foreground">Ainda não há candidaturas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                {['Nome', 'Email', 'Universidade', 'Setores', 'Data'].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/70">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications?.map(app => (
                <tr key={app.id} className="border-b border-border/40 hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-4">
                    <Link href={`/admin/candidaturas/${app.id}`} className="text-foreground hover:text-gold transition-colors font-medium">
                      {app.full_name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground">{app.email}</td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{app.university}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {((app.sector_prefs as string[]) ?? []).slice(0, 3).map((s: string) => (
                        <span key={s} className="font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm bg-gold/10 text-gold border border-gold/20">
                          {SECTOR_SLUGS[s as typeof SECTORS[number]] ?? s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground/60 whitespace-nowrap">
                    {formatDate(app.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
