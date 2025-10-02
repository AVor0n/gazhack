import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Level.module.css';

const worldNames: Record<string, string> = {
    novice: 'НОВИЧОК',
    profi: 'ПРОФИ',
    expert: 'ЭКСПЕРТ'
};

const levelNames: Record<string, Record<string, string>> = {
    novice: {
        '1': 'Личный бюджет',
        '2': 'Банковские услуги',
        '3': 'Планирование расходов',
        '4': 'Первые накопления',
        '5': 'Финансовые цели',
    },
    profi: {
        '1': 'Инвестиционные стратегии',
        '2': 'Анализ рынка',
        '3': 'Портфельное управление',
        '4': 'Риск-менеджмент',
        '5': 'Налоговое планирование',
    },
    expert: {
        '1': 'Деривативы',
        '2': 'Альтернативные инвестиции',
        '3': 'Структурные продукты',
        '4': 'Международные рынки',
        '5': 'Финтех инновации',
    },
};

export const Level: React.FC = () => {
    const { worldId, levelId } = useParams<{ worldId: string; levelId: string }>();

    if (!worldId || !levelId || !worldNames[worldId] || !levelNames[worldId]?.[levelId]) {
        return (
            <div className="page-container">
                <div className={styles.errorContainer}>
                    <h1>Уровень не найден</h1>
                    <p>Выберите корректный уровень</p>
                </div>
            </div>
        );
    }

    const worldName = worldNames[worldId];
    const levelName = levelNames[worldId][levelId];

    return (
        <div className="page-container">
            <div className={styles.levelContainer}>
                {/* Заголовок уровня */}
                <div className={styles.levelHeader}>
                    <div className={styles.worldBadge}>{worldName}</div>
                    <h1 className={styles.levelTitle}>{levelName}</h1>
                    <p className={styles.levelSubtitle}>Уровень {levelId}</p>
                </div>
            </div>
        </div>
    );
};
