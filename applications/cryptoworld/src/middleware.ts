import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_THEME } from './contants/application';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Client Hints 요청
  res.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme');
  res.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme');

  const theme =
    req.cookies.get('theme')?.value ||
    req.headers.get('sec-ch-prefers-color-scheme') ||
    DEFAULT_THEME;

  // 캐싱하거나, 크롬 같은 경우는 기본적으로 넣을수도 있으나, 넣어주는 것이 좋음.

  res.cookies.set('theme', theme, { path: '/' }); // 쿠키로 초기 테마 전달
  return res;
}
