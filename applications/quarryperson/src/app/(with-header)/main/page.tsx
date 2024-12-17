"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import Table from "@/components/Table/Table";
import styles from "./page.module.scss";
import { postService } from "@/services/posts/apis";

export default function MainPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await postService.getPosts();
      setPosts(response);
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.page}>
      <h1>My Contents</h1>
      <Table posts={posts} />
    </div>
  );
}
