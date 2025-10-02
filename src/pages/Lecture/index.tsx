import React from 'react';
import { useParams } from 'react-router-dom';

export const Lecture: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page-container">
      <h1>Лекция {id}</h1>
      <p>Содержимое лекции</p>
    </div>
  );
};
