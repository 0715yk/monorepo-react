import { authMiddleware } from '@/middleware/authMiddleware';
import { Post } from '@/types/post';
import { NextRequest, NextResponse } from 'next/server';
import { formatDate } from '@/utils/date';

// 메모리에 데이터 저장 (서버 재시작하면 초기화됨)
let posts: Post[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `Post ${index + 1}`,
  content: `Content for post ${index + 1}`,
  date: formatDate(new Date().toISOString()),
}));

export async function GET(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse;

  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get('id');

  // 특정 id의 게시물만 반환
  if (idParam) {
    const id = Number(idParam);
    const post = posts.find((p) => p.id === id);

    if (post) {
      return NextResponse.json(post);
    } else {
      return NextResponse.json(
        { error: `Post with id ${id} not found` },
        { status: 404 },
      );
    }
  }

  // id가 없을 때 모든 게시물 반환
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse;
  try {
    const post = await request.json();
    posts.push({ ...post, id: Date.now() });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse;

  try {
    const { id } = await request.json();
    posts = posts.filter((post) => post.id !== id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 },
    );
  }
}
