import React, { useState, useEffect } from 'react';
import { WelcomeBack } from '../../components/WelcomeBack';

export const MainMenu: React.FC = () => {
    const [showWelcome, setShowWelcome] = useState(false);
    const [showBear, setShowBear] = useState(false);

    useEffect(() => {
        const onboardingCompleted = localStorage.getItem('onboardingCompleted');

        if (onboardingCompleted === 'true') {
            setShowBear(true);

            if (!showWelcome) {
                setShowWelcome(true);
            }
        }
    }, []);

    const handleWelcomeComplete = () => {
        setShowWelcome(false);
    };

    return (
        <div className="page-container">
            {/* Приветствие для возвращающихся пользователей */}
            {showWelcome && <WelcomeBack onMessageComplete={handleWelcomeComplete} />}

            {/* Мишка остается на главном экране после приветствия */}
            {showBear && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '120px',
                        left: '20%',
                        zIndex: 100,
                    }}
                >
                    <img
                        src={'/bear-5.png'}
                        alt="Миша"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                        }}
                    />
                </div>
            )}
        </div>
    );
};
