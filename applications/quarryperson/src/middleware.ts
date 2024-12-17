import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 서버에서 동작
export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated'); // 쿠키가 있으면(로그인 상태)
  const isAuthPage = request.nextUrl.pathname === '/';

  // 로그인 상태가 아니고, 로그인이 필요한 페이지로 접근하면 로그인 페이지로 리다이렉트
  if (!isAuthenticated && !isAuthPage) {
    const url = new URL('/', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // 로그인 상태이고, 로그인 페이지로 접근하면 유저가 접근하려했던 페이지 혹은 메인 페이지로 리다이렉트
  if (isAuthenticated && isAuthPage) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
    return NextResponse.redirect(new URL(callbackUrl || '/main', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/main', '/create'],
};
