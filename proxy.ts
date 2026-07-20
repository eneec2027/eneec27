import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/adminAuth'

export async function proxy(request: NextRequest) {
  // Allow login page through
  if (request.nextUrl.pathname === '/admin/login') {
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
  matcher: ['/admin/:path*'],
}
