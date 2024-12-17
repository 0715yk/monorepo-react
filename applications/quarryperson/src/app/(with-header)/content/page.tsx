"use client";

import { useEffect, useState, Suspense } from "react";
import { Post } from "@/types/post";
import { useSearchParams } from "next/navigation";
import { postService } from "@/services/posts/apis";

function ContentLoader() {
  const searchParams = useSearchParams();
  const contentId = searchParams.get("id");
  const [content, setContent] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!contentId) return;

      const response = await postService.getPost(contentId);
      setContent(response);
    };

    fetchPost();
  }, [contentId]);

  return (
    <div>
      <h1>Content Page</h1>
      {content ? (
        <>
          <p>ID: {content.id}</p>
          <p>TITLE: {content.title}</p>
          <p>CONTENT: {content.content}</p>
          <p>DATE: {content.date}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default function ContentPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ContentLoader />
    </Suspense>
  );
}

export const dynamic = "force-dynamic"; // 동적 렌더링 강제
