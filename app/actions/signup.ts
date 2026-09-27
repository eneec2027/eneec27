'use server'

import { sendAlert } from '@/lib/alert'
import { SIGNUP_SOURCES, type SignupSource } from '@/lib/signupSources'
import { getSupabaseAnon } from '@/lib/supabaseAnon'

export async function signupEmail(
  email: string,
  source: SignupSource = 'v1_teaser',
): Promise<{ ok: boolean; error?: string }> {
  const trimmed = email.trim().toLowerCase()

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, error: 'Email inválido.' }
  }

  const safeSource: SignupSource = SIGNUP_SOURCES.includes(source) ? source : 'v1_teaser'

  const { error } = await getSupabaseAnon()
    .from('email_signups')
    .insert({ email: trimmed, source: safeSource })

  if (error) {
    // Duplicate email — treat as success so we don't leak which emails exist.
    // Nota: `email` é único na tabela, portanto quem já subscreveu a newsletter
    // e depois pede aviso dos Early Birds não fica registado no segundo interesse.
    if (error.code === '23505') return { ok: true }

    // Daqui para baixo não é o visitante que errou: é a base de dados que não
    // guardou. A mensagem para o browser continua genérica, mas a falha deixa de
    // ser engolida — fica nos logs e chega por email. Foi por não chegar a
    // lado nenhum que a paragem de 01/09 durou quatro dias.
    const detail = `${error.code || 'sem código'} — ${error.message}`
    console.error(`[signupEmail] insert falhou (source=${safeSource}): ${detail}`)
    await sendAlert(
      'Um email não foi guardado',
      `Um visitante tentou deixar o email (source=${safeSource}) e a base de dados recusou.\n\n` +
      `Erro: ${detail}\n\n` +
      `Se o erro fala em DNS ou "fetch failed", o projecto Supabase provavelmente pausou.`,
    )
    return { ok: false, error: 'Erro ao guardar. Tenta novamente.' }
  }

  return { ok: true }
}
