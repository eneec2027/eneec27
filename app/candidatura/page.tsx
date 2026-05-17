import ApplicationForm from '@/components/ApplicationForm'
import { CandidaturaLeftPanel } from '@/components/CandidaturaLeftPanel'

export const metadata = {
  title: "Candidatura — ENEEC'27",
  description: 'Candidata-te à equipa organizadora do ENEEC 2027 em Aveiro.',
}

export default function CandidaturaPage() {
  return (
    <div className="min-h-screen bg-[#080c14] md:grid md:grid-cols-[45%_55%]">

      <CandidaturaLeftPanel />

      {/* ── RIGHT PANEL ─────────────────────────────────────────────────── */}
      <main className="relative min-h-screen px-8 sm:px-12 py-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-gold/20 via-gold/8 to-transparent" />
        <div className="max-w-xl">
          <ApplicationForm />
        </div>
      </main>

    </div>
  )
}
