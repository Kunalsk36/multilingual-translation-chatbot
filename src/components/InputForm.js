'use client';

import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function InputForm({ onSubmit, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to translate..."
        disabled={isLoading}
        className="w-full pl-6 pr-14 py-4 bg-white/70 border border-gray-100/50 rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:bg-white focus:shadow-xl disabled:opacity-50 text-gray-800 placeholder-gray-400 backdrop-blur-md"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 text-blue-500 hover:text-blue-600 disabled:text-gray-300 transition-all flex items-center justify-center translate-x-1"
      >
        {isLoading ? (
          <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <FaPaperPlane className="h-5 w-5 transition-transform group-hover:scale-110 active:scale-95" />
        )}
      </button>
    </form>
  );
}
