import Link from 'next/link';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            Shop Front
          </Link>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/blog" className={styles.link}>Blog</Link>
            <Link href="/products" className={styles.link}>Products</Link>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Shop Front. All rights reserved.</p>
      </footer>
    </div>
  );
} 