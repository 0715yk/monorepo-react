import Header from '@/components/Header/Header';
import styles from './layout.module.scss';

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.main}>{children}</div>
    </div>
  );
}
