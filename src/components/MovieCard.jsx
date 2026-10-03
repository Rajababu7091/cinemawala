import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Calendar, Globe, Sparkles } from 'lucide-react';

export default function MovieCard({ movie, featured = false }) {
  if (!movie) return null;

  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const movieSlug = movie.slug || String(movie.id);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth 3D tilt calculation
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({
      x: rotateX,
      y: rotateY,
      shineX: (x / rect.width) * 100,
      shineY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, shineX: 50, shineY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-cw-card border border-white/5 hover:border-cw-red/50 shadow-lg hover:shadow-2xl hover:shadow-cw-red/20 transition-shadow duration-300 will-change-transform"
    >
      {/* 3D Specular Lighting Sheen */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30 rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-cw-surface">
        <img
          src={movie.poster || movie.backdrop || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop'}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-108 group-hover:brightness-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
          }}
        />

        {/* 3D Floating Top Badges (Pops Out) */}
        <div 
          className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-10 transition-transform duration-200"
          style={{ transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)' }}
        >
          {/* Rating */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-cw-gold text-xs font-bold shadow-md">
            <Star className="w-3.5 h-3.5 fill-cw-gold text-cw-gold" />
            <span>{movie.rating ? Number(movie.rating).toFixed(1) : '8.0'}</span>
          </div>

          {/* Trending Badge */}
          {movie.trending && (
            <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cw-red to-cw-red-dark text-white text-[11px] font-bold uppercase tracking-wider shadow-glow-sm border border-cw-red/50">
              Trending
            </div>
          )}
        </div>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

        {/* 3D Floating Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
          <div 
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-cw-red to-rose-500 text-white flex items-center justify-center shadow-glow-red transform scale-75 group-hover:scale-100 transition-all duration-300 mb-3"
            style={{ transform: isHovered ? 'translateZ(45px)' : 'translateZ(0px)' }}
          >
            <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
          </div>
          <span 
            className="text-xs font-bold text-white tracking-wide bg-black/70 px-4 py-1.5 rounded-full border border-white/20 shadow-md"
            style={{ transform: isHovered ? 'translateZ(35px)' : 'translateZ(0px)' }}
          >
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
      <div 
        className="p-4 flex flex-col flex-grow justify-between bg-cw-card relative z-10"
        style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)' }}
      >
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
            className="inline-flex items-center gap-1 text-xs font-semibold text-cw-red group-hover:text-white group-hover:bg-cw-red px-3 py-1 rounded-lg border border-cw-red/30 transition-all duration-200 shadow-sm"
          >
            <span>View Movie</span>
            <span className="text-[10px]">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
