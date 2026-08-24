import Hero from '@/components/sections/Hero'
import OQueE from '@/components/sections/OQueE'
import Numeros from '@/components/sections/Numeros'
import Apoios from '@/components/sections/Apoios'

// Homepage na estrutura do briefing: impacto inicial, o que é o ENEEC27,
// razões para vir, apoios institucionais.
export default function HomePage() {
  return (
    <>
      <Hero />
      <OQueE />
      <Numeros />
      <Apoios />
    </>
  )
}
