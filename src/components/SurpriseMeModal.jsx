import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, Dices, Play, Star, Calendar, Globe, Heart, 
  ExternalLink, Sparkles, RefreshCw, Check 
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function SurpriseMeModal() {
  const { 
    isSurpriseModalOpen, 
    closeSurpriseModal, 
    movies, 
    openTrailer, 
    isInWatchlist, 
    toggleWatchlist 
  } = useMovies();

  const [selectedGenre, setSelectedGenre] = useState('All');
  const [pickedMovie, setPickedMovie] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinTimerRef = useRef(null);

  // Available unique genres
  const genres = ['All', 'Action', 'Romance', 'Comedy', 'Thriller', 'Drama', 'Horror', 'Sci-Fi'];

  // Filter pool
  const getEligiblePool = (genre) => {
    if (!movies || movies.length === 0) return [];
    if (genre === 'All') return movies;
    return movies.filter((m) => {
      if (Array.isArray(m.genre)) {
        return m.genre.some((g) => g.toLowerCase() === genre.toLowerCase());
      }
      return String(m.genre || '').toLowerCase().includes(genre.toLowerCase());
    });
  };

  const spinWheel = (genreToUse = selectedGenre) => {
    const pool = getEligiblePool(genreToUse);
    if (pool.length === 0) {
      setPickedMovie(movies[0] || null);
      return;
    }

    setIsSpinning(true);
    let count = 0;
    const maxCycles = 14;

    if (spinTimerRef.current) clearInterval(spinTimerRef.current);

    spinTimerRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * pool.length);
      setPickedMovie(pool[randomIndex]);
      count += 1;

      if (count >= maxCycles) {
        clearInterval(spinTimerRef.current);
        setIsSpinning(false);
      }
    }, 80);
  };

  // Trigger spin when opened
  useEffect(() => {
    if (isSurpriseModalOpen && movies.length > 0) {
      spinWheel(selectedGenre);
    }
    return () => {
      if (spinTimerRef.current) clearInterval(spinTimerRef.current);
    };
  }, [isSurpriseModalOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeSurpriseModal();
    };
    if (isSurpriseModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isSurpriseModalOpen, closeSurpriseModal]);

  if (!isSurpriseModalOpen) return null;

  const movieSlug = pickedMovie?.slug || String(pickedMovie?.id || '');
  const inWatchlist = pickedMovie ? isInWatchlist(pickedMovie.id) : false;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={closeSurpriseModal}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#151724] via-[#0F1118] to-[#0A0B0E] border border-cw-red/30 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(229,9,20,0.25)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#161824]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cw-red to-amber-500 text-white shadow-glow-sm">
              <Dices className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-display font-bold text-lg">
                  Surprise Me! 🍿
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cw-gold/15 text-cw-gold text-[10px] font-black border border-cw-gold/30 uppercase tracking-wider">
                  Movie Wheel
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Can't decide what to watch tonight? Let CinemaWala choose!
              </p>
            </div>
          </div>

          <button
            onClick={closeSurpriseModal}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all border border-white/10"
            aria-label="Close surprise picker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Genre Pill Selector */}
        <div className="px-5 sm:px-6 py-3 border-b border-white/10 bg-[#0E1017] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-xs font-semibold text-gray-400 mr-1 flex-shrink-0">
            Vibe:
          </span>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => {
                setSelectedGenre(g);
                spinWheel(g);
              }}
              disabled={isSpinning}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                selectedGenre === g
                  ? 'bg-cw-red text-white shadow-glow-sm border border-cw-red'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Wheel Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 flex flex-col items-center justify-center text-center">
          {pickedMovie ? (
            <div className="w-full space-y-5 animate-scale-in">
              {/* Card Container with animated border while spinning */}
              <div
                className={`relative mx-auto max-w-sm rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isSpinning
                    ? 'border-cw-red shadow-[0_0_35px_rgba(229,9,20,0.6)] scale-95'
                    : 'border-white/20 shadow-2xl scale-100 hover:border-cw-red/60'
                }`}
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
                  <img
                    src={pickedMovie.backdrop || pickedMovie.poster}
                    alt={pickedMovie.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isSpinning ? 'blur-xs scale-105' : 'blur-none scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E14] via-[#0D0E14]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cw-gold/30 text-cw-gold text-xs font-black flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-cw-gold" />
                      {pickedMovie.rating ? Number(pickedMovie.rating).toFixed(1) : '8.0'}
                    </span>

                    {pickedMovie.platform && (
                      <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                        {pickedMovie.platform}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-[#0E1017] text-left space-y-2">
                  <h4 className="text-white font-display font-black text-lg sm:text-xl line-clamp-1">
                    {pickedMovie.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <span>{pickedMovie.year || '2026'}</span>
                    <span>•</span>
                    <span>{pickedMovie.language || 'Hindi'}</span>
                    {pickedMovie.duration && (
                      <>
                        <span>•</span>
                        <span>{pickedMovie.duration}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {pickedMovie.description || 'Memorable story handpicked for your next movie stream.'}
                  </p>
                </div>
              </div>

              {/* Status Message */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cw-gold">
                <Sparkles className="w-4 h-4 text-cw-gold animate-bounce" />
                <span>
                  {isSpinning
                    ? 'Shuffling through CinemaWala catalog...'
                    : 'Tonight’s CinemaWala Pick for You! 🎉'}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-10 text-gray-400">Loading recommendations...</div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-4 bg-[#0E1017] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => spinWheel(selectedGenre)}
            disabled={isSpinning}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs sm:text-sm font-bold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>Spin Again 🎲</span>
          </button>

          {pickedMovie && (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => toggleWatchlist(pickedMovie.id)}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  inWatchlist
                    ? 'bg-red-500/20 border-red-500/40 text-cw-red'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                }`}
                title={inWatchlist ? 'Remove from Watchlist' : 'Save to Watchlist'}
              >
                <Heart className={`w-4 h-4 ${inWatchlist ? 'fill-cw-red text-cw-red' : ''}`} />
                <span className="hidden sm:inline">
                  {inWatchlist ? 'Saved' : 'Watchlist'}
                </span>
              </button>

              <button
                onClick={() => {
                  closeSurpriseModal();
                  openTrailer(pickedMovie);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cw-red/20 hover:bg-cw-red/30 border border-cw-red/40 text-cw-red text-xs sm:text-sm font-bold transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-cw-red" />
                <span>Trailer</span>
              </button>

              <Link
                to={`/movie/${movieSlug}`}
                onClick={closeSurpriseModal}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cw-red to-cw-red-dark hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-glow-sm transition-all"
              >
                <span>Watch Movie &rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
