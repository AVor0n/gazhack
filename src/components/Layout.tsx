import { Outlet } from 'react-router-dom';
import { BottomNavbar } from './BottomNavbar';
import { Header } from './Header';
import styles from './Layout.module.css';
import clsx from 'clsx';

interface LayoutProps {
    hideNavBar?: boolean;
    bgClass?: 'default';
}

export const Layout = ({ hideNavBar, bgClass = 'default' }: LayoutProps) => {
    return (
        <div className={clsx(styles.layout, styles[`bg-${bgClass}`])}>
            <Header coins={234} streak={1} />
            <main className={styles.main}>
                <Outlet />
            </main>
            {!hideNavBar && <BottomNavbar />}
        </div>
    );
};
