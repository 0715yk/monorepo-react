'use client';

import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

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
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="path-to-logo.png" alt="OpenSea Logo" />
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="#">Drops</a>
            </li>
            <li>
              <a href="#">Stats</a>
            </li>
            <li>
              <a href="#">Create</a>
            </li>
          </ul>
        </nav>
        <div className={styles.actions}>
          <button className={styles.wallet}>Wallet</button>
          <button className={styles.login}>Login</button>
          <button onClick={toggleTheme} className={styles.button}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </header>
  );
}
