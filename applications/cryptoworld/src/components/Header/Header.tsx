'use client';

import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { FlexContainer } from '@myorg/ui/components';
import BookIcon from '@myorg/assets/svg/Icon/bookmark.svg';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    setTheme(currentTheme as 'light' | 'dark');
  }, []);

  const toggleTheme = (): void => {
    if (!theme) return; // 초기화되지 않았다면 아무 작업도 하지 않음

    const newTheme: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000;`;
  };

  return (
    <header className={styles.header}>
      <FlexContainer
        className={styles.container}
        height="60px"
        justifyContent="space-between"
      >
        <FlexContainer className={styles.logo} gap={5} width="150px">
          <BookIcon width={24} height={24} />
          <span>MyLyrics</span>
        </FlexContainer>
        <FlexContainer className={styles.actions} gap={10} width="350px">
          <button className={styles.create}>Create</button>
          <button className={styles.login}>Login</button>
          <button onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </FlexContainer>
      </FlexContainer>
    </header>
  );
}
