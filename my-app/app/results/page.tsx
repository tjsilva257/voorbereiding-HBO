'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CareerMatch {
  study: string;
  description: string;
  matchScore: number;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const traitsParam = searchParams.get('traits');
  const [matches, setMatches] = useState<CareerMatch[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!traitsParam) {
      router.push('/cards');
      return;
    }

    fetch(`/api/studies?traits=${traitsParam}`)
      .then(res => res.json())
      .then(data => {
        const sortedMatches = data.matches || [];
        setMatches(sortedMatches);
        
        // Auto-select if only one top match, randomly select if multiple 100%
        const topMatches = sortedMatches.filter(m => m.matchScore === sortedMatches[0]?.matchScore);
        if (topMatches.length === 1) {
          setSelectedRecommendation(topMatches[0].study);
        } else if (topMatches.length > 1) {
          const randomSelected = topMatches[Math.floor(Math.random() * topMatches.length)];
          setSelectedRecommendation(randomSelected.study);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [traitsParam, router]);

  if (loading) {
    return <div className="text-center py-20 text-white text-2xl">Loading results...</div>;
  }

  const topScore = matches[0]?.matchScore || 0;
  const perfectMatches = matches.filter(m => m.matchScore === topScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <button 
        onClick={() => router.push('/cards')}
        className="mb-8 text-blue-400 hover:text-blue-300 transition-colors text-lg"
      >
        ← Back to Traits
      </button>

      <h1 className="text-5xl font-bold text-white mb-4 text-center">Your Career Matches</h1>
      <p className="text-gray-400 text-center mb-12">Based on your selected traits</p>

      {/* Recommendation Section */}
      {selectedRecommendation && (
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-8 shadow-2xl border-2 border-yellow-300">
            <h2 className="text-2xl font-bold text-white mb-2">🎯 Recommended For You</h2>
            <p className="text-xl font-bold text-white mb-4">
              {selectedRecommendation}
            </p>
            {perfectMatches.length > 1 && (
              <p className="text-sm text-gray-100">
                ({perfectMatches.length} perfect matches - randomly selected for you)
              </p>
            )}
          </div>
        </div>
      )}

      {/* All Matches Grid */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-6">All Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, idx) => (
            <div
              key={idx}
              className={`
                rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 
                border-2 cursor-pointer transform hover:scale-105
                ${
                  selectedRecommendation === match.study
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-300 ring-4 ring-blue-400'
                    : match.matchScore === 0
                    ? 'bg-gradient-to-br from-gray-600 to-gray-700 border-gray-500'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 hover:border-blue-500'
                }
              `}
              onClick={() => setSelectedRecommendation(match.study)}
            >
              <div className="mb-4">
                <div className={`text-4xl font-bold ${
                  match.matchScore === 0 ? 'text-gray-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'
                }`}>
                  {match.matchScore}%
                </div>
                <p className="text-gray-400 text-sm">Match Score</p>
              </div>
              
              <h2 className={`text-2xl font-bold mb-3 ${
                selectedRecommendation === match.study ? 'text-white' : 'text-white'
              }`}>
                {match.study}
              </h2>
              <p className={`mb-4 ${
                selectedRecommendation === match.study ? 'text-gray-100' : 'text-gray-300'
              }`}>
                {match.description}
              </p>
              
              {selectedRecommendation === match.study && (
                <div className="mt-4 text-center">
                  <span className="text-yellow-300 font-bold text-lg">★ Your Selection ★</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}