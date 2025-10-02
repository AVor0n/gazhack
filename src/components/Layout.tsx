import { Outlet, useLocation } from 'react-router-dom';
import { BottomNavbar } from './BottomNavbar';
import { Header } from './Header';
import { Onboarding } from '../pages/Onboarding';
import styles from './Layout.module.css';
import clsx from 'clsx';

interface LayoutProps {
    hideNavBar?: boolean;
    bgClass?: 'default';
}

export const Layout = ({ hideNavBar, bgClass = 'default' }: LayoutProps) => {
    const location = useLocation();

    // Скрываем navbar и header только на страницах карт уровней
    const isLevelMapPage = location.pathname.includes('/worlds/') &&
                          location.pathname.split('/').length === 4; // /worlds/:worldId

    return (
        <div className={clsx(styles.layout, styles[`bg-${bgClass}`])}>
            {!isLevelMapPage && <Header coins={234} streak={1} />}
            <main className={styles.main}>
                <Outlet />
            </main>
            {!hideNavBar && !isLevelMapPage && <BottomNavbar />}
            {!isLevelMapPage && <Onboarding />}
        </div>
    );
};
