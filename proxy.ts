import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/adminAuth'
import { DEFAULT_LANG, isLang } from '@/lib/i18n'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // O site esteve em pré-visualização sob /v2/<lang> até 2026-08-24. Os links
  // que ficaram por aí — mensagens, separadores abertos — continuam a chegar
  // ao sítio certo em vez de darem 404.
  if (pathname === '/v2' || pathname.startsWith('/v2/')) {
    const rest = pathname.slice('/v2'.length)
    const [, first] = rest.split('/')
    const url = request.nextUrl.clone()
    url.pathname = first && isLang(first) ? rest : `/${DEFAULT_LANG}${rest}`
    return NextResponse.redirect(url)
  }

  // Allow login page through
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('admin_session')?.value
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret || !token || !await verifySessionToken(token, secret)) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/v2/:path*', '/v2'],
}
