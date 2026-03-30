'use client';

interface CardProps {
  trait: string;
  onSelect?: (trait: string) => void;
  selected?: boolean;
  disabled?: boolean;
}

export default function Card({ trait, onSelect, selected = false, disabled = false }: CardProps) {
  const handleClick = () => {
    if (!disabled) {
      onSelect?.(trait);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative w-32 h-48 rounded-lg cursor-pointer transition-all duration-300 transform
        border-2 shadow-2xl
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 hover:-translate-y-3'}
        ${
          selected
            ? 'bg-white text-red-600 border-red-600 shadow-red-500/50 scale-105'
            : 'bg-white text-red-600 border-gray-300 hover:border-red-500'
        }
      `}
    >
      {/* Top Section */}
      <div className="h-1/2 flex items-center justify-center px-2">
        <p className="text-sm font-bold text-red-600 text-center wrap-break-words">
          {trait}
        </p>
      </div>

      {/* Center Line */}
      <div className="w-4/5 h-0.5 bg-red-600 mx-auto"></div>

      {/* Bottom Section */}
      <div className="h-1/2 flex items-center justify-center px-2 transform rotate-180">
        <p className="text-sm font-bold text-red-600 text-center wrap-break-words">
          {trait}
        </p>
      </div>

      {/* Selected Badge */}
      {selected && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          ✓
        </div>
      )}
    </div>
  );
}