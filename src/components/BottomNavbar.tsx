import React, { type FC, type SVGProps } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BottomNavbar.module.css';
import clsx from 'clsx';
import { BookIcon, ChartIcon, LogoIcon, MapIcon, ShopIcon } from '@/shared/ui/icons';

interface NavItem {
    path: string;
    Icon: FC<SVGProps<SVGSVGElement>>;
    end?: boolean;
}

export const BottomNavbar: React.FC = () => {
    const navItems: NavItem[] = [
        { path: '/shop', Icon: ShopIcon, end: true },
        { path: '/worlds', Icon: MapIcon, end: false },
        { path: '/', Icon: LogoIcon, end: true },
        { path: '/lectures', Icon: BookIcon, end: false },
        { path: '/rating', Icon: ChartIcon, end: true },
    ];

    return (
        <nav className={styles.navbar}>
            {navItems.map(({ path, Icon, end }) => {
                return (
                    <NavLink
                        key={path}
                        to={path}
                        end={end}
                        className={({ isActive }) =>
                            clsx(styles.navItem, isActive && styles.active)
                        }
                    >
                        <Icon className={clsx(styles.icon, path === '/' && styles.home)} />
                    </NavLink>
                );
            })}
        </nav>
    );
};
