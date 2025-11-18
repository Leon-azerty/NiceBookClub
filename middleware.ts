import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const ProtectedRoutes = ['/', '/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);

  if (ProtectedRoutes.includes(pathname) && !sessionCookie) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/', '/profile'],
};
