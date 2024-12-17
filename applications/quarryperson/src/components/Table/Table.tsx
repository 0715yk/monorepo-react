import { Post } from '@/types/post';
import { useRouter } from 'next/navigation';
import styles from './Table.module.scss';

interface TableProps {
  posts: Post[];
}

export default function Table({ posts }: TableProps) {
  const router = useRouter();

  const openDetailItem = (id: number) => {
    router.push(`/content?id=${id}`);
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={`${styles.th} ${styles.thId}`}>Id</th>
          <th className={`${styles.th} ${styles.thTitle}`}>Title</th>
          <th className={`${styles.th} ${styles.thContent}`}>Contents</th>
          <th className={`${styles.th} ${styles.thDate}`}>Date</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {posts.map((post) => (
          <tr key={post.id} onClick={() => openDetailItem(post.id)}>
            <td className={styles.td}>{post.id}</td>
            <td className={styles.td}>{post.title}</td>
            <td className={styles.td}>{post.content}</td>
            <td className={styles.td}>{post.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
