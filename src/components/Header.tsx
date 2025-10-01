import styles from './Header.module.css';
import { FlameIcon } from '@/shared/ui/icons';
import clsx from 'clsx';

interface HeaderProps {
    coins: number;
    streak: number;
}

export const Header = ({ coins, streak }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.item}>
                <div className={clsx(styles.icon, styles.coinIcon)}>G</div>
                <span>{coins}</span>
            </div>

            <div className={styles.item}>
                <span>{streak}</span>
                <FlameIcon className={clsx(styles.icon, styles.flameIcon)} />
            </div>
        </header>
    );
};
