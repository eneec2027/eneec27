import type { Metadata } from 'next'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Toda a V2 vive sob /v2 enquanto não substituir a V1 em produção, e sob
// noindex — é revisão interna, não é lançamento. Ver o vault, briefing-conteudos.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
