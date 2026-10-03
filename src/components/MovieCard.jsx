import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Calendar, Globe, Sparkles } from 'lucide-react';

export default function MovieCard({ movie, featured = false }) {
  if (!movie) return null;

  const movieSlug = movie.slug || String(movie.id);

  return (
    <div className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-cw-card border border-white/5 hover:border-cw-red/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-card hover:shadow-cw-red/10">
      
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-cw-surface">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-108 group-hover:brightness-105"
          onError={(e) => {
            // High-grade fallback poster
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-10">
          {/* Rating */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-cw-gold text-xs font-bold shadow-md">
            <Star className="w-3.5 h-3.5 fill-cw-gold text-cw-gold" />
            <span>{movie.rating ? Number(movie.rating).toFixed(1) : '8.0'}</span>
          </div>

          {/* Trending or Platform Badge */}
          {movie.trending && (
            <div className="px-2 py-0.5 rounded-full bg-cw-red text-white text-[11px] font-bold uppercase tracking-wider shadow-glow-sm">
              Trending
            </div>
          )}
        </div>

        {/* Cinematic Gradient Overlay on Hover / Base */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-cw-red text-white flex items-center justify-center shadow-glow-red transform scale-75 group-hover:scale-100 transition-all duration-300 mb-3">
            <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
          </div>
          <span className="text-sm font-semibold text-white tracking-wide bg-black/60 px-3.5 py-1.5 rounded-full border border-white/20">
            View Details &rarr;
          </span>
          <p className="text-xs text-gray-300 mt-2 line-clamp-2 max-w-[200px]">
            {movie.description}
          </p>
        </div>

        {/* Clickable Overlay Link */}
        <Link 
          to={`/movie/${movieSlug}`} 
          className="absolute inset-0 z-20"
          aria-label={`View details for ${movie.title}`}
        />
      </div>

      {/* Movie Details Footer */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-cw-card">
        <div>
          {/* Title */}
          <Link 
            to={`/movie/${movieSlug}`}
            className="block font-display font-bold text-base sm:text-lg text-white group-hover:text-cw-red transition-colors line-clamp-1"
            title={movie.title}
          >
            {movie.title}
          </Link>

          {/* Year • Language */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-500" />
              {movie.year || '2026'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-gray-500" />
              {movie.language || 'Hindi'}
            </span>
          </div>

          {/* Genre Badges */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {Array.isArray(movie.genre) ? (
              movie.genre.slice(0, 2).map((g, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-gray-300"
                >
                  {g}
                </span>
              ))
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-gray-300">
                {movie.genre}
              </span>
            )}
            {movie.duration && (
              <span className="text-[11px] text-gray-500 ml-auto self-center">
                {movie.duration}
              </span>
            )}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-300">
            <span className="text-cw-gold">⭐</span>
            <span>{movie.rating ? Number(movie.rating).toFixed(1) : '8.0'}</span>
          </div>

          <Link
            to={`/movie/${movieSlug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-cw-red group-hover:text-white group-hover:bg-cw-red px-2.5 py-1 rounded-lg border border-cw-red/30 transition-all duration-200"
          >
            <span>View Movie</span>
            <span className="text-[10px]">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
