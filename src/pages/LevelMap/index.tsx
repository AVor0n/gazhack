import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './LevelMap.module.css';

interface Level {
    id: string;
    name: string;
    unlocked: boolean;
    completed: boolean;
}

const levelsByWorld: Record<string, Level[]> = {
    novice: [
        { id: '1', name: 'Личный бюджет', unlocked: true, completed: false },
        { id: '2', name: 'Банковские услуги', unlocked: true, completed: false },
        { id: '3', name: 'Планирование расходов', unlocked: false, completed: false },
        { id: '4', name: 'Первые накопления', unlocked: false, completed: false },
        { id: '5', name: 'Финансовые цели', unlocked: false, completed: false },
    ],
    profi: [
        { id: '1', name: 'Инвестиционные стратегии', unlocked: true, completed: false },
        { id: '2', name: 'Анализ рынка', unlocked: false, completed: false },
        { id: '3', name: 'Портфельное управление', unlocked: false, completed: false },
        { id: '4', name: 'Риск-менеджмент', unlocked: false, completed: false },
        { id: '5', name: 'Налоговое планирование', unlocked: false, completed: false },
    ],
    expert: [
        { id: '1', name: 'Деривативы', unlocked: true, completed: false },
        { id: '2', name: 'Альтернативные инвестиции', unlocked: false, completed: false },
        { id: '3', name: 'Структурные продукты', unlocked: false, completed: false },
        { id: '4', name: 'Международные рынки', unlocked: false, completed: false },
        { id: '5', name: 'Финтех инновации', unlocked: false, completed: false },
    ],
};

const worldNames: Record<string, string> = {
    novice: 'НОВИЧОК',
    profi: 'ПРОФИ',
    expert: 'ЭКСПЕРТ'
};

const worldMapImages: Record<string, string> = {
    novice: '/worlds/map-1.png',
    profi: '/worlds/map-2.png',
    expert: '/worlds/map-4.jpeg'
};

export const LevelMap: React.FC = () => {
    const { worldId } = useParams<{ worldId: string }>();
    const navigate = useNavigate();

    if (!worldId || !levelsByWorld[worldId]) {
        return (
            <div className="page-container">
                <h1>Мир не найден</h1>
                <p>Выберите корректный мир</p>
            </div>
        );
    }

    const levels = levelsByWorld[worldId];
    const worldName = worldNames[worldId];
    const mapImage = worldMapImages[worldId];

    const handleLevelClick = (levelId: string, unlocked: boolean) => {
        if (unlocked) {
            navigate(`/worlds/${worldId}/levels/${levelId}`);
        }
    };

    return (
        <div className={styles.fullscreenContainer}>
            {/* Фоновое изображение карты на весь экран */}
            <div className={styles.mapBackground}>
                <img
                    src={mapImage}
                    alt={`Карта мира ${worldName}`}
                    className={styles.mapImage}
                />
            </div>

            {/* Заголовок */}
            <div className={styles.headerContainer}>
                <h1 className={styles.worldTitle}>{worldName}</h1>
            </div>

            {/* Уровни */}
            <div className={styles.levelsContainer}>
                {levels.map((level, index) => (
                    <div
                        key={level.id}
                        className={`${styles.levelItem} ${
                            !level.unlocked ? styles.locked : ''
                        } ${level.completed ? styles.completed : ''}`}
                        style={{
                            left: `${20 + (index * 15)}%`,
                            top: `${30 + (index % 2 === 0 ? 0 : 20)}%`,
                        }}
                        onClick={() => handleLevelClick(level.id, level.unlocked)}
                    >
                        <div className={styles.levelCircle}>
                            <span className={styles.levelNumber}>{level.id}</span>
                            {level.completed && (
                                <div className={styles.completedIcon}>✓</div>
                            )}
                            {!level.unlocked && (
                                <div className={styles.lockIcon}>🔒</div>
                            )}
                        </div>

                        <div className={styles.levelLabel}>
                            <span className={styles.levelName}>{level.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
