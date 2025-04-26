import { NextResponse, type NextRequest } from 'next/server';

import authConfig from '@/auth.config';
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/routes';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

function isApiAuth(pathname: string): boolean {
  return pathname.startsWith(apiAuthPrefix);
}

function isPublic(pathname: string): boolean {
  return publicRoutes.includes(pathname);
}

function isAuth(pathname: string): boolean {
  return authRoutes.includes(pathname);
}

function getLoginRedirectUrl(nextUrl: URL): URL {
  const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
  return new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl);
}

export default auth((req: NextRequest) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const session = req.auth;
  const isLoggedIn = !!session;

  if (isApiAuth(pathname)) return;

  if (isAuth(pathname)) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublic(pathname)) {
    return NextResponse.redirect(getLoginRedirectUrl(nextUrl));
  }

  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
