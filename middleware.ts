import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get('host')
  const protocol = request.headers.get('x-forwarded-proto') || 'http'

  // Redirect http to https or www to non-www
  if ((protocol === 'http' && process.env.NODE_ENV === 'production') || (host && host.startsWith('www.'))) {
    const newHost = host ? host.replace('www.', '') : url.host
    url.protocol = 'https'
    url.host = newHost
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

// Only run middleware on pages, not on static files or API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
