'use client';

import Card from '@/components/Card';
import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';

export default function CardsPage() {
  const [traits, setTraits] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
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
        const updated = [...prev, trait];
        // Show modal when 5 traits are selected
        if (updated.length === MAX_TRAITS) {
          setShowModal(true);
        }
        return updated;
      }
      return prev;
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

      {/* Modal appears when 5 traits are selected */}
      {showModal && (
        <Modal selectedTraits={selectedTraits} onClose={handleCloseModal} />
      )}
    </div>
  );
}