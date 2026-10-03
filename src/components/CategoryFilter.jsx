import React from 'react';
import { CATEGORIES } from '../data/movies';

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <span>🎭</span> Explore by Categories
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Filter movies by your favorite vibes, genres and industries
          </p>
        </div>

        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs text-cw-red hover:underline font-semibold flex items-center gap-1 transition-colors"
          >
            Clear Filter (Show All)
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Categories Container */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-3 pt-1 hide-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border ${
                isSelected
                  ? 'bg-cw-red text-white border-cw-red shadow-glow-sm scale-102 font-semibold'
                  : 'bg-cw-card/80 text-gray-300 border-white/5 hover:border-cw-red/30 hover:bg-cw-surface hover:text-white'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
