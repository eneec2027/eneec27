'use server'

import { createClient } from '@supabase/supabase-js'
import { applicationSchema, type ApplicationInput } from '@/lib/applicationSchema'
import { SECTOR_SLUGS, type Sector } from '@/lib/sectors'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error } = await getSupabase()
    .rpc('check_email_exists', { p_email: email })
  if (error) return false
  return data === true
}

export async function submitApplication(
  data: ApplicationInput
): Promise<{ ok: boolean; error?: string }> {
  const parsed = applicationSchema.safeParse(data)
  if (!parsed.success) {
    return { ok: false, error: 'Dados inválidos. Verifica o formulário.' }
  }

  const d = parsed.data

  const { error } = await getSupabase().from('applications').insert({
    full_name:       d.full_name.trim(),
    email:           d.email.toLowerCase().trim(),
    phone:           d.phone.trim(),
    university:      d.university.trim(),
    course:          d.course.trim(),
    academic_year:   d.academic_year,
    has_event_xp:    d.has_event_xp,
    event_xp_desc:   d.event_xp_desc?.trim() || null,
    availability:    d.availability,
    can_travel:      d.can_travel,
    sector_prefs:    d.sector_prefs,
    motivation:      d.motivation.trim(),
    differentiation: d.differentiation.trim(),
    how_found_out:   d.how_found_out,
    sector_answers:  d.sector_answers,
  })

  if (error) {
    if (error.code === '23505') {
      return { ok: false, error: 'Já existe uma candidatura com este email.' }
    }
    return { ok: false, error: 'Erro ao submeter. Tenta novamente.' }
  }

  return { ok: true }
}
