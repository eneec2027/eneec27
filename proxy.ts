import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/adminAuth'
import { DEFAULT_LANG, isLang } from '@/lib/i18n'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // A V2 passou a viver sob /v2/<lang> a 2026-08-24. Os caminhos antigos
  // (/v2/programa) apanham a língua por omissão em vez de darem 404.
  if (pathname.startsWith('/v2/')) {
    const [, , first, ...rest] = pathname.split('/')
    if (first && !isLang(first)) {
      const url = request.nextUrl.clone()
      url.pathname = ['/v2', DEFAULT_LANG, first, ...rest].join('/')
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
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
  matcher: ['/admin/:path*', '/v2/:path*'],
}
