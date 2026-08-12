import { createClient } from '@supabase/supabase-js'

// Server-side only — never import in client components
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Sem isto o `createClient` atira "supabaseKey is required", que não diz qual
  // é a chave nem onde falta. A service-role key existe em Production e
  // Development, não em Preview — de propósito, porque daria acesso total à
  // base de dados a partir de qualquer URL de preview.
  if (!url || !serviceRoleKey) {
    const missing = [
      !url && 'NEXT_PUBLIC_SUPABASE_URL',
      !serviceRoleKey && 'SUPABASE_SERVICE_ROLE_KEY',
    ].filter(Boolean).join(' e ')
    throw new Error(
      `O painel de administração não está configurado neste ambiente: falta ${missing}.`,
    )
  }

  return createClient(url, serviceRoleKey)
}
