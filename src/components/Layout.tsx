import { Outlet } from 'react-router-dom';
import { BottomNavbar } from './BottomNavbar';
import styles from './Layout.module.css';
import clsx from 'clsx';

interface LayoutProps {
    hideNavBar?: boolean;
    bgClass?: 'default';
}

export const Layout = ({ hideNavBar, bgClass = 'default' }: LayoutProps) => {
    return (
        <div className={clsx(styles.layout, styles[`bg-${bgClass}`])}>
            <main className={styles.main}>
                <Outlet />
            </main>
            {!hideNavBar && <BottomNavbar />}
        </div>
    );
};
