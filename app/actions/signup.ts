'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function signupEmail(email: string): Promise<{ ok: boolean; error?: string }> {
  const trimmed = email.trim().toLowerCase()

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, error: 'Email inválido.' }
  }

  const { error } = await supabase
    .from('email_signups')
    .insert({ email: trimmed, source: 'v1_teaser' })

  if (error) {
    // Duplicate email — treat as success so we don't leak which emails exist
    if (error.code === '23505') return { ok: true }
    return { ok: false, error: 'Erro ao guardar. Tenta novamente.' }
  }

  return { ok: true }
}
