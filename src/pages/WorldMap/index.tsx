import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WorldMap.module.css';

interface World {
    id: string;
    name: string;
    image: string;
    description: string;
    unlocked: boolean;
    position: { x: number; y: number };
}

const worlds: World[] = [
    {
        id: 'novice',
        name: 'НОВИЧОК',
        image: '/worlds/world-1.png',
        description: 'Основы финансовой грамотности',
        unlocked: true,
        position: { x: 30, y: 75 },
    },
    {
        id: 'profi',
        name: 'ПРОФИ',
        image: '/worlds/world-2.png',
        description: 'Продвинутые финансовые инструменты',
        unlocked: true,
        position: { x: 75, y: 50 },
    },
    {
        id: 'expert',
        name: 'ЭКСПЕРТ',
        image: '/worlds/world-4.jpeg',
        description: 'Экспертный уровень инвестиций',
        unlocked: true,
        position: { x: 30, y: 25 },
    },
];

export const WorldMap: React.FC = () => {
    const navigate = useNavigate();

    const handleWorldClick = (worldId: string) => {
        navigate(`/worlds/${worldId}`);
    };

    return (
        <div className="page-container">
            {worlds.map(world => (
                <div
                    key={world.id}
                    className={`${styles.worldItem} ${!world.unlocked ? styles.locked : ''}`}
                    style={{
                        left: `${world.position.x}%`,
                        top: `${world.position.y}%`,
                    }}
                    onClick={() => world.unlocked && handleWorldClick(world.id)}
                >
                    <div className={styles.worldImageContainer}>
                        <img src={world.image} alt={world.name} className={styles.worldImage} />
                        {!world.unlocked && (
                            <div className={styles.lockOverlay}>
                                <div className={styles.lockIcon}>🔒</div>
                            </div>
                        )}
                    </div>

                    <div className={styles.worldLabel}>
                        <h3 className={styles.worldName}>{world.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};
