'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { safeCompare, createSessionToken } from '@/lib/adminAuth'

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const password = (formData.get('password') as string) ?? ''
  const envPassword = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!envPassword || !secret) {
    return { error: 'Configuração do servidor incompleta.' }
  }

  const valid = await safeCompare(password, envPassword, secret)
  if (!valid) {
    return { error: 'Password incorrecta.' }
  }

  const token = await createSessionToken(secret)
  const cookieStore = await cookies()
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/admin',
  })

  redirect('/admin/candidaturas')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin/login')
}
