import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_CMS_PATHS = ['/cms/login', '/cms/forgot', '/cms/reset'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_CMS_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }
  const hasSession = request.cookies.has('payload-token');
  if (!hasSession) {
    return NextResponse.redirect(new URL('/cms/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/cms/:path*',
};
