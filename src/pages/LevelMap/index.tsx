import React from 'react';
import { useParams } from 'react-router-dom';

export const LevelMap: React.FC = () => {
  const { worldId } = useParams<{ worldId: string }>();

  return (
    <div className="page-container">
      <h1>Карта уровней мира {worldId}</h1>
      <p>Выберите уровень для прохождения</p>
    </div>
  );
};
