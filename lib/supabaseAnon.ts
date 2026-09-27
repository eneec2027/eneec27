import { createClient } from '@supabase/supabase-js'

// O cliente com a chave anon — o mesmo papel que os formulários públicos usam.
// Partilhado entre a recolha de emails e o health check, de propósito: o health
// check só prova alguma coisa se escrever exactamente pelo mesmo caminho (mesma
// chave, mesma policy de RLS) que um visitante do site.
export function getSupabaseAnon() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
}
