'use client';

import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CardsPage() {
  const [traits, setTraits] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const MAX_TRAITS = 5;

  useEffect(() => {
    fetch('/api/traits')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch traits');
        return res.json();
      })
      .then(data => {
        setTraits(data.traits || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error loading traits');
        setLoading(false);
      });
  }, []);

  const handleTraitSelect = (trait: string) => {
    setSelectedTraits(prev => {
      if (prev.includes(trait)) {
        return prev.filter(t => t !== trait);
      } else if (prev.length < MAX_TRAITS) {
        return [...prev, trait];
      }
      return prev;
    });
  };

  const handleFindMatch = () => {
    if (selectedTraits.length > 0) {
      router.push(`/results?traits=${selectedTraits.join(',')}`);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-white text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 text-2xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-8">
      <h1 className="text-5xl font-bold text-white mb-2 text-center">Select Your Traits</h1>
      <p className="text-gray-400 text-center mb-4">Choose up to {MAX_TRAITS} traits that match you</p>
      <p className="text-gray-500 text-center mb-12">Selected: {selectedTraits.length}/{MAX_TRAITS}</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-full justify-items-center mb-16">
        {traits.map(trait => (
          <Card
            key={trait}
            trait={trait}
            onSelect={handleTraitSelect}
            selected={selectedTraits.includes(trait)}
            disabled={selectedTraits.length >= MAX_TRAITS && !selectedTraits.includes(trait)}
          />
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={handleFindMatch}
          disabled={selectedTraits.length === 0}
          className={`px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
            selectedTraits.length === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl hover:scale-105'
          }`}
        >
          Find My Career Match
        </button>
      </div>
    </div>
  );
}