import React from 'react';
import { useParams } from 'react-router-dom';

export const Level: React.FC = () => {
  const { worldId, levelId } = useParams<{ worldId: string; levelId: string }>();

  return (
    <div>
      <h1>Уровень {levelId} мира {worldId}</h1>
      <p>Игровой уровень</p>
    </div>
  );
};
