// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/verify', '/invalid'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let public routes through
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  // Special handling for chat links with url token
  if (pathname.startsWith('/signup')) {
      const role = req.nextUrl.searchParams.get('role');
    if (!role || role !== 'client') {
      return NextResponse.next();
    }
    const token = req.nextUrl.searchParams.get('token');
    if (role == 'client') {
      if (!token) {
        return NextResponse.redirect(new URL('/invalid', req.url));
      }
      else {
        return NextResponse.next();
      }
    }
  }

  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
