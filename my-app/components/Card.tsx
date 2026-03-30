'use client';

import { useState } from 'react';

interface CardProps {
  trait: string;
  onSelect?: (trait: string) => void;
}

export default function Card({ trait, onSelect }: CardProps) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onSelect?.(trait);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        selected
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
      }`}
    >
      <h3 className="text-xl font-bold">{trait}</h3>
    </div>
  );
}