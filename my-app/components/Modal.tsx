'use client';

import { useRouter } from 'next/navigation';

interface ModalProps {
  selectedTraits: string[];
  onClose: () => void;
}

export default function Modal({ selectedTraits, onClose }: ModalProps) {
  const router = useRouter();

  const handleProceed = () => {
    router.push(`/results?traits=${selectedTraits.join(',')}`);
  };

  return (
    <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border-2 border-blue-500 max-w-md mx-4">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Ready to Find Your Match?</h2>
        
        <div className="mb-6">
          <p className="text-gray-300 text-center mb-4">You selected {selectedTraits.length} traits:</p>
          <div className="bg-slate-700 rounded-lg p-4 max-h-40 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="space-y-2">
              {selectedTraits.map(trait => (
                <li key={trait} className="text-blue-400 font-semibold">
                  ✓ {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            ← Choose Other Traits
          </button>
          <button
            onClick={handleProceed}
            className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Find My Match →
          </button>
        </div>
      </div>
    </div>
  );
}
