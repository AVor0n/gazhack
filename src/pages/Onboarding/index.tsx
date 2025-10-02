import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Onboarding.module.css';

interface OnboardingStep {
  id: number;
  message: string;
  highlightElement?: string;
  highlightPosition?: { top: number; left: number; width: number; height: number };
  fullScreenImage?: string;
  bearImage?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    message: "",
    fullScreenImage: "/intro-1.png"
  },
  {
    id: 2,
    message: "",
    fullScreenImage: "/intro-2.png"
  },
  {
    id: 3,
    message: "Привет! Меня зовут Миша! Я - финансовый аналитик Газпромбанка. Давайте изучим интерфейс!",
    bearImage: "/bear-1.png",
  },
  {
    id: 4,
    message: "Здесь отображается ваша валюта - монеты, которые вы зарабатываете за прохождение уроков!",
    highlightElement: 'coins',
    bearImage: "/bear-3.png",
  },
  {
    id: 5,
    message: "А это ваш стрик - количество дней подряд, когда вы изучали финансы!",
    highlightElement: 'streak',
    bearImage: "/bear-4.png",
  },
  {
    id: 6,
    message: "В разделе 'Лекции' вы найдете обучающие материалы по финансовой грамотности!",
    highlightElement: 'lectures',
    bearImage: "/bear-3.png",
  },
  {
    id: 7,
    message: "В 'Мирах' вас ждут игровые уровни для практического изучения финансов!",
    highlightElement: 'worlds',
    bearImage: "/bear-2.png",
  },
  {
    id: 8,
    message: "В 'Магазине' можно потратить заработанные монеты на улучшения!",
    highlightElement: 'shop',
    bearImage: "/bear-5.png",
  },
  {
    id: 9,
    message: "А в 'Рейтинге' посмотреть, как вы сравниваетесь с другими игроками!",
    highlightElement: 'rating',
    bearImage: "/bear-2.png",
  },
  {
    id: 10,
    message: "Отлично! Теперь вы знаете основы интерфейса. Удачи в изучении финансов!",
    bearImage: "/bear-1.png",
  }
];

const offset = 8;

export const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBearDisappearing, setIsBearDisappearing] = useState(false);
  const [isBearAppearing, setIsBearAppearing] = useState(false);
  const [highlightPosition, setHighlightPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const navigate = useNavigate();
  const currentData = onboardingSteps[currentStep];

  // Проверяем, был ли онбординг уже пройден
  useEffect(() => {
    const completed = localStorage.getItem('onboardingCompleted');
    if (completed === 'true') {
      setIsVisible(false);
    }
  }, []);

  // Обновляем позицию подсветки при смене шага
  useEffect(() => {
    if (currentData.highlightElement) {
      const findElement = () => {
        const element = document.querySelector(`[data-onboarding="${currentData.highlightElement}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          setHighlightPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          });
          return true;
        }
        return false;
      };

      // Пробуем найти элемент сразу
      if (!findElement()) {
        // Если не нашли, пробуем через небольшие интервалы
        const attempts = [100, 200, 500];
        attempts.forEach(delay => {
          setTimeout(() => {
            findElement();
          }, delay);
        });
      }
    } else {
      setHighlightPosition(null);
    }
  }, [currentData.highlightElement]);

  const handleScreenClick = () => {
    if (isAnimating) return; // Предотвращаем клики во время анимации

    if (currentStep < onboardingSteps.length - 1) {
      // Для полноэкранных изображений - мгновенный переход
      if (currentData.fullScreenImage) {
        setCurrentStep(currentStep + 1);
      } else {
        // Для обычных шагов - с анимацией
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setIsAnimating(false);
        }, 300);
      }
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Сначала исчезает пузырь
    setIsAnimating(true);
    setTimeout(() => {
      // Потом исчезает медведь
      setIsBearDisappearing(true);
      setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('onboardingCompleted', 'true');
      }, 500); // Время анимации исчезновения медведя
    }, 300); // Время анимации исчезновения пузыря
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Full Screen Image for intro steps */}
      {currentData.fullScreenImage && (
        <div
          onClick={handleScreenClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            cursor: 'pointer',
            backgroundColor: '#000000',
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
            outline: 'none'
          }}
        >
          <img
            src={currentData.fullScreenImage}
            alt="Intro"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      )}

      {/* Bear Layer - выше навбара, но ниже подсветки */}
      {!currentData.fullScreenImage && (
        <div
          style={{
            position: 'fixed',
            left: '30%',
            bottom: '8%',
            pointerEvents: 'auto',
            opacity: isBearDisappearing ? 0 : (isBearAppearing ? 0 : 1),
            transform: isBearAppearing
              ? 'scale(3.5) translateY(50px)'
              : isBearDisappearing
                ? 'scale(2.5)'
                : 'scale(3.5)',
            transition: isBearAppearing ? 'all 0.8s ease' : 'all 0.5s ease'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentData.bearImage}
            alt="Миша - финансовый аналитик"
            className={styles.bear}
          />
        </div>
      )}

      {/* Main Onboarding Layer - средний z-index */}
      {!currentData.fullScreenImage && (
        <div
          onClick={handleScreenClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            pointerEvents: 'auto',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
            outline: 'none'
          }}
        >
          {/* Highlight overlay */}
          {highlightPosition && (
            <div
              className={styles.highlight}
              style={{
                top: highlightPosition.top - offset,
                left: highlightPosition.left - offset,
                width: highlightPosition.width + offset * 2,
                height: highlightPosition.height + offset * 2,
                opacity: isAnimating ? 0 : 1,
                transition: 'opacity 0.3s ease',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '3px solid #ef4444',
                borderRadius: '12px',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
              }}
            />
          )}

          {/* Speech Bubble */}
          {currentData.message && (
            <div
              className={styles.speechBubble}
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateX(25%) scale(0.8)' : 'translateX(25%) scale(1)',
                transition: 'all 0.3s ease'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.speechText}>
                {currentData.message}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
