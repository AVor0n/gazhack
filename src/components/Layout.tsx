import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

export const Layout = () => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
        >
          Главное меню
        </Link>
        <Link
          to="/rating"
          className={`${styles.navLink} ${location.pathname === '/rating' ? styles.active : ''}`}
        >
          Рейтинг
        </Link>
        <Link
          to="/lectures"
          className={`${styles.navLink} ${location.pathname.startsWith('/lectures') ? styles.active : ''}`}
        >
          Лекции
        </Link>
        <Link
          to="/worlds"
          className={`${styles.navLink} ${location.pathname.startsWith('/worlds') ? styles.active : ''}`}
        >
          Миры
        </Link>
        <Link
          to="/shop"
          className={`${styles.navLink} ${location.pathname === '/shop' ? styles.active : ''}`}
        >
          Магазин
        </Link>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
