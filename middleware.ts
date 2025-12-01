import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const RedirectedRoutes = ['/api/authors', '/api/books', '/api/loans'];
const ProtectedRoutes = ['/', '/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);

  if (ProtectedRoutes.includes(pathname) && !sessionCookie) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (RedirectedRoutes.includes(pathname) && !sessionCookie) {
    return NextResponse.json({ error: 'Not logged In' });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/api/authors/:path*',
    '/api/books/:path*',
    '/api/loans/:path*',
  ],
};
