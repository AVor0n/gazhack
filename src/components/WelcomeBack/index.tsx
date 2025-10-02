import React, { useState, useEffect } from 'react';
import styles from './WelcomeBack.module.css';

interface WelcomeBackProps {
  onMessageComplete: () => void;
}

export const WelcomeBack: React.FC<WelcomeBackProps> = ({ onMessageComplete }) => {
  const [showMessage, setShowMessage] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Начинаем анимацию исчезновения через 4.7 секунд
    const hideTimer = setTimeout(() => {
      setIsHiding(true);
    }, 4800);

    // Полностью скрываем сообщение через 5 секунд
    const completeTimer = setTimeout(() => {
      setShowMessage(false);
      onMessageComplete();
    }, 5000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, [onMessageComplete]);

  return (
    <div className={styles.welcomeContainer}>
      {/* Сообщение */}
      {showMessage && (
        <div className={`${styles.messageContainer} ${isHiding ? styles.hiding : ''}`}>
          <div className={styles.messageBubble}>
            <p className={styles.messageText}>Рад снова тебя видеть!</p>
          </div>
        </div>
      )}
    </div>
  );
};
