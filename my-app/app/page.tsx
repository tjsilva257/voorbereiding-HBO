'use client';

import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center text-center px-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Educational Path</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 drop-shadow-md max-w-2xl">
          Discover your perfect career path based on your traits and interests
        </p>
        
        <Button href="/cards" />
      </div>
    </div>
  );
}
