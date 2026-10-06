import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Calendar, Globe, Sparkles, Film, Heart } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

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
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

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

  // Color mapping for popular platforms
  const getPlatformBadge = (platform) => {
    const p = String(platform || '').toLowerCase();
    if (p.includes('netflix')) return { bg: 'bg-red-600/20 text-red-400 border-red-500/40', text: 'Netflix' };
    if (p.includes('prime')) return { bg: 'bg-sky-500/20 text-sky-400 border-sky-500/40', text: 'Prime' };
    if (p.includes('hotstar') || p.includes('disney')) return { bg: 'bg-blue-600/20 text-blue-400 border-blue-500/40', text: 'Hotstar' };
    if (p.includes('jio')) return { bg: 'bg-pink-600/20 text-pink-400 border-pink-500/40', text: 'JioCinema' };
    if (p.includes('sony')) return { bg: 'bg-amber-600/20 text-amber-400 border-amber-500/40', text: 'SonyLIV' };
    if (p.includes('zee')) return { bg: 'bg-purple-600/20 text-purple-400 border-purple-500/40', text: 'ZEE5' };
    return { bg: 'bg-white/10 text-gray-300 border-white/20', text: platform || 'Streaming' };
  };

  const { isInWatchlist, toggleWatchlist, openTrailer } = useMovies();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movie.id);
  };

  const handleTrailerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openTrailer(movie);
  };

  const platformBadge = getPlatformBadge(movie.platform);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.04, 1.04, 1.04)`
          : 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.45s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#13151D] via-[#101218] to-[#0D0E14] border border-white/10 hover:border-cw-red/60 shadow-xl hover:shadow-[0_20px_50px_-10px_rgba(229,9,20,0.35)] transition-all duration-300 will-change-transform"
    >
      {/* 3D Dynamic Specular Holographic Glint */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30 rounded-2xl transition-opacity duration-150"
          style={{
            background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.22) 0%, rgba(229, 9, 20, 0.08) 35%, transparent 65%)`,
          }}
        />
      )}

      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#151821]">
        <img
          src={movie.poster || movie.backdrop || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop'}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
          }}
        />

        {/* 3D Floating Top Badges (Pops Out) */}
        <div 
          className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-30 transition-transform duration-200 pointer-events-none"
          style={{ transform: isHovered ? 'translateZ(35px)' : 'translateZ(0px)' }}
        >
          {/* Rating & Season Indicator */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-cw-gold/30 text-cw-gold text-xs font-black shadow-lg">
              <Star className="w-3.5 h-3.5 fill-cw-gold text-cw-gold" />
              <span>{movie.rating ? Number(movie.rating).toFixed(1) : '8.0'}</span>
            </div>
            {movie.seasons && movie.seasons.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md border border-white/20">
                {movie.seasons.length} Seasons
              </span>
            )}
          </div>

          {/* Right Group: Platform + Watchlist Button */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {movie.trending ? (
              <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cw-red via-rose-500 to-cw-red-dark text-white text-[11px] font-extrabold uppercase tracking-wider shadow-glow-sm border border-cw-red/50 animate-pulse">
                Trending 🔥
              </div>
            ) : (
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${platformBadge.bg}`}>
                {platformBadge.text}
              </div>
            )}

            {/* Watchlist Toggle Heart */}
            <button
              onClick={handleWatchlistClick}
              aria-label={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              title={inWatchlist ? 'Saved in Watchlist' : 'Add to Watchlist'}
              className={`p-1.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
                inWatchlist
                  ? 'bg-cw-red text-white scale-110 shadow-glow-sm border border-cw-red'
                  : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/90 hover:scale-110 border border-white/20'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${inWatchlist ? 'fill-white text-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Cinematic Bottom Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E14] via-[#0D0E14]/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

        {/* 3D Floating Hover Play Action Overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center z-20 pointer-events-none">
          <div 
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-cw-red via-rose-500 to-amber-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(229,9,20,0.6)] transform scale-75 group-hover:scale-100 transition-all duration-300 mb-2.5"
            style={{ transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)' }}
          >
            <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
          </div>

          <div 
            className="flex items-center gap-2 pointer-events-auto"
            style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)' }}
          >
            <button
              onClick={handleTrailerClick}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md shadow-lg transition-all"
            >
              Trailer HD
            </button>
            <span 
              className="text-xs font-black text-white tracking-wide bg-cw-red/90 px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg"
            >
              Details &rarr;
            </span>
          </div>

          {movie.description && (
            <p className="text-[11px] text-gray-300 mt-2 line-clamp-2 max-w-[200px]">
              {movie.description}
            </p>
          )}
        </div>

        {/* Clickable Overlay Link */}
        <Link 
          to={`/movie/${movieSlug}`} 
          className="absolute inset-0 z-10"
          aria-label={`View details for ${movie.title}`}
        />
      </div>

      {/* Movie Details Footer */}
      <div 
        className="p-4 flex flex-col flex-grow justify-between relative z-10 bg-[#0E1017]/95"
        style={{ transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)' }}
      >
        <div>
          {/* Title */}
          <Link 
            to={`/movie/${movieSlug}`}
            className="block font-display font-black text-base sm:text-lg text-white group-hover:text-cw-red transition-colors line-clamp-1"
            title={movie.title}
          >
            {movie.title}
          </Link>

          {/* Year • Language • Platform */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1.5 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cw-red" />
              {movie.year || '2026'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-cw-gold" />
              {movie.language || 'Hindi'}
            </span>
            {movie.platform && (
              <>
                <span>•</span>
                <span className="text-gray-300 truncate max-w-[80px]">{movie.platform}</span>
              </>
            )}
          </div>

          {/* Genre Badges */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {Array.isArray(movie.genre) ? (
              movie.genre.slice(0, 2).map((g, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-300 group-hover:border-white/20 transition-colors"
                >
                  {g}
                </span>
              ))
            ) : (
              <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-300">
                {movie.genre}
              </span>
            )}
            {movie.duration && (
              <span className="text-[11px] text-gray-400 ml-auto self-center font-mono">
                {movie.duration}
              </span>
            )}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${platformBadge.bg}`}>
            {movie.platform || '100% Legal'}
          </span>

          <Link
            to={`/movie/${movieSlug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-cw-red to-cw-red-dark group-hover:brightness-110 px-3 py-1.5 rounded-xl shadow-glow-sm transition-all duration-200"
          >
            <span>Explore</span>
            <span className="text-[10px]">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
