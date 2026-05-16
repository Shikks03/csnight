import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.split('/')[2] // /staff/[slug]
  const adminSlug = process.env.ADMIN_PATH_SLUG

  if (slug !== adminSlug) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/staff/:slug*'],
}
