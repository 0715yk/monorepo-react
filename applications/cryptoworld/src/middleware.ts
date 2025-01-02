import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const prefersColorScheme = req.headers.get('sec-ch-prefers-color-scheme');
  const theme = prefersColorScheme === 'light' ? 'light' : 'dark';

  const res = NextResponse.next();

  res.cookies.set('theme', theme, { path: '/' }); // 쿠키로 초기 테마 전달
  return res;
}
