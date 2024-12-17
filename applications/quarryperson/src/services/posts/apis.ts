import { Post } from '../../types/post';

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const res = await fetch('/api/posts');

    if (res.status === 401) {
      // 로그인 페이지로 리다이렉트
      window.location.href =
        '/?callbackUrl=' + encodeURIComponent(window.location.pathname);
      throw new Error('Please login first');
    }

    if (!res.ok) throw new Error('Failed to fetch posts');

    return res.json();
  },
  getPost: async (id: string): Promise<Post> => {
    const res = await fetch(`/api/posts?id=${id}`);

    if (res.status === 401) {
      window.location.href =
        '/?callbackUrl=' + encodeURIComponent(window.location.pathname);
      throw new Error('Please login first');
    }

    if (!res.ok) throw new Error('Failed to fetch post');

    return res.json();
  },

  createPost: async (data: Omit<Post, 'id'>): Promise<Post> => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      window.location.href =
        '/?callbackUrl=' + encodeURIComponent(window.location.pathname);
      throw new Error('Please login first');
    }

    if (!res.ok) throw new Error('Failed to create post');

    return res.json();
  },

  deletePost: async (id: number): Promise<void> => {
    const res = await fetch('/api/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (res.status === 401) {
      window.location.href =
        '/?callbackUrl=' + encodeURIComponent(window.location.pathname);
      throw new Error('Please login first');
    }

    if (!res.ok) throw new Error('Failed to delete post');
  },
};
