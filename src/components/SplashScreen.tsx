import React, { useState, useEffect } from 'react';
import styles from './SplashScreen.module.css';
import { LogoIcon } from '@/shared/ui/icons';

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 1200;
        const interval = 16;
        const increment = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 100);
                    return 100;
                }
                return prev + increment;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className={styles.splashScreen}>
            <div/>

            <div className={styles.logoContainer}>
                <LogoIcon width={48} height={48} className={styles.logo} />
                <span className={styles.gazprom}>ГАЗПРОМ</span>
                <span className={styles.finance}>ФИНАНС</span>
                <p className={styles.tagline}>Играй и зарабатывай бонусы</p>
            </div>

            <div className={styles.progressContainer}>
                <div className={styles.progressPercentage}>{Math.round(progress)}%</div>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
};
