'use client';

import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('window is undefined');
      return;
    }

    console.log('Effect runs');

    const handleScroll = () => {
      console.log('scroll event fired', window.scrollY);
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    console.log('listener added');

    return () => {
      console.log('cleanup runs');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={styles.header}
      style={{
        background: scrolled ? 'transparent' : 'red'
      }}
    >
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
        </div>
      </div>
    </header>
  );
}
