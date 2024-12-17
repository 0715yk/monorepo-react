"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LOGIN_EXPIRATION } from "@/constants/authentication";
import styles from "./page.module.scss";
import { Suspense } from "react";

// page.tsx

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleLogin = () => {
    document.cookie = `isAuthenticated=true; max-age=${LOGIN_EXPIRATION}; path=/`;
    router.push(callbackUrl || "/main");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Next Template Site</h1>
        <button onClick={handleLogin}>로그인</button>
      </main>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Home />
    </Suspense>
  );
}

export const dynamic = "force-dynamic"; // 동적 렌더링 강제
