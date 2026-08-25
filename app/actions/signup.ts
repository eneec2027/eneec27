'use server'

import { createClient } from '@supabase/supabase-js'

import { SIGNUP_SOURCES, type SignupSource } from '@/lib/signupSources'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
}

export async function signupEmail(
  email: string,
  source: SignupSource = 'v1_teaser',
): Promise<{ ok: boolean; error?: string }> {
  const trimmed = email.trim().toLowerCase()

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, error: 'Email inválido.' }
  }

  const safeSource: SignupSource = SIGNUP_SOURCES.includes(source) ? source : 'v1_teaser'

  const { error } = await getSupabase()
    .from('email_signups')
    .insert({ email: trimmed, source: safeSource })

  if (error) {
    // Duplicate email — treat as success so we don't leak which emails exist.
    // Nota: `email` é único na tabela, portanto quem já subscreveu a newsletter
    // e depois pede aviso dos Early Birds não fica registado no segundo interesse.
    if (error.code === '23505') return { ok: true }
    return { ok: false, error: 'Erro ao guardar. Tenta novamente.' }
  }

  return { ok: true }
}
