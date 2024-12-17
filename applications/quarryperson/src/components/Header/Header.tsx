'use client';

import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.scss';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    // 쿠키 제거
    document.cookie = 'isAuthenticated=; max-age=0; path=/';

    // 홈으로 리다이렉트
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <h1>Next Template</h1>
      <nav>
        <ul>
          <li>
            <Link href="/create">
              <button disabled>생성</button>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>로그아웃</button>
          </li>
          <li>
            <button onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
