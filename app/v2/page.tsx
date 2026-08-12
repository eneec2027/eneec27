import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import OEvento from '@/components/sections/OEvento'
import Programa from '@/components/sections/Programa'
import OradoresWorkshops from '@/components/sections/OradoresWorkshops'
import Localizacao from '@/components/sections/Localizacao'
import FeiraDEmpresas from '@/components/sections/FeiraDEmpresas'
import Patrocinadores from '@/components/sections/Patrocinadores'
import Inscricoes from '@/components/sections/Inscricoes'

// Rota de pré-visualização da V2. A homepage (`/`) continua a servir a V1.
// Quando a V2 for para o ar, mover este conteúdo para `app/page.tsx`.
export const metadata = {
  robots: { index: false, follow: false },
}

export default function V2Preview() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <OEvento />
        <Programa />
        <OradoresWorkshops />
        <Localizacao />
        <FeiraDEmpresas />
        <Patrocinadores />
        <Inscricoes />
      </main>
      <Footer />
    </>
  )
}
