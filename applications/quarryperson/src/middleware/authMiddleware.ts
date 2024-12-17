import { NextRequest, NextResponse } from 'next/server';

export function authMiddleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated');

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized - Please login first' },
      { status: 401 },
    );
  }
}
