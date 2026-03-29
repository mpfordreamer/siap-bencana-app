import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/dashboard');
  const isLoginPath = request.nextUrl.pathname === '/login';
  
  // Custom simple PIN auth cookie check
  const hasAuthCookie = request.cookies.has('admin_auth');

  // Protect dashboard routes
  if (isAdminPath && !hasAuthCookie) {
    const loginUrl = new URL('/login', request.url);
    // Add a cue that they were forcibly redirected for UX
    loginUrl.searchParams.set('secure', '1');
    return NextResponse.redirect(loginUrl);
  }

  // Prevent accessing login page if already authenticated
  if (isLoginPath && hasAuthCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
