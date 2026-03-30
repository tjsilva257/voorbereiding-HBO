'use client';

import Card from '@/components/Card';
import { useEffect, useState } from 'react';

export default function CardsPage() {
  const [traits, setTraits] = useState<string[]>([]);

  useEffect(() => {
    // Fetch traits from API
    fetch('/api/traits')
      .then(res => res.json())
      .then(data => setTraits(data));
  }, []);

  return (
    <div className="cards-container">
      {traits.map(trait => (
        <Card key={trait} trait={trait} />
      ))}
    </div>
  );
}