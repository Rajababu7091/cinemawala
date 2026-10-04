import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Film, Play, ExternalLink, Trash2, ArrowRight, Star } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function WatchlistModal() {
  const { 
    isWatchlistModalOpen, 
    closeWatchlistModal, 
    watchlist, 
    toggleWatchlist, 
    movies, 
    openTrailer 
  } = useMovies();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeWatchlistModal();
    };
    if (isWatchlistModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isWatchlistModalOpen, closeWatchlistModal]);

  if (!isWatchlistModalOpen) return null;

  // Resolve watchlist movies
  const savedMovies = movies.filter((m) =>
    watchlist.includes(String(m.id)) || (m.slug && watchlist.includes(String(m.slug)))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={closeWatchlistModal}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#141622] via-[#0F1118] to-[#0A0B0E] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#161824]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cw-red/20 border border-cw-red/40 text-cw-red">
              <Heart className="w-5 h-5 fill-cw-red text-cw-red" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-display font-bold text-lg">My Watchlist</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-gray-200 text-xs font-bold border border-white/10">
                  {savedMovies.length} {savedMovies.length === 1 ? 'Movie' : 'Movies'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Saved movies to watch next on CinemaWala 🍿
              </p>
            </div>
          </div>

          <button
            onClick={closeWatchlistModal}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all border border-white/10"
            aria-label="Close watchlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
          {savedMovies.length > 0 ? (
            savedMovies.map((movie) => {
              const movieSlug = movie.slug || String(movie.id);
              return (
                <div
                  key={movie.id}
                  className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cw-red/40 transition-all group"
                >
                  {/* Poster Thumbnail */}
                  <Link
                    to={`/movie/${movieSlug}`}
                    onClick={closeWatchlistModal}
                    className="relative w-16 sm:w-20 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0 bg-black/40 border border-white/10 group-hover:border-cw-red/50 transition-colors"
                  >
                    <img
                      src={movie.poster || movie.backdrop}
                      alt={movie.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/movie/${movieSlug}`}
                      onClick={closeWatchlistModal}
                      className="block text-white font-display font-bold text-sm sm:text-base hover:text-cw-red transition-colors truncate"
                    >
                      {movie.title}
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-1">
                      <span>{movie.year || '2026'}</span>
                      <span>•</span>
                      <span>{movie.language || 'Hindi'}</span>
                      {movie.rating && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-cw-gold font-bold">
                            <Star className="w-3 h-3 fill-cw-gold" />
                            {Number(movie.rating).toFixed(1)}
                          </span>
                        </>
                      )}
                      {movie.platform && (
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-gray-300 text-[10px] font-semibold">
                          {movie.platform}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2 mt-2.5">
                      <button
                        onClick={() => openTrailer(movie)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cw-red/15 hover:bg-cw-red/25 border border-cw-red/30 text-cw-red text-xs font-semibold transition-colors"
                      >
                        <Play className="w-3 h-3 fill-cw-red" />
                        <span>Trailer</span>
                      </button>

                      {movie.watchUrl && (
                        <a
                          href={movie.watchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold transition-colors"
                        >
                          <span>Watch</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <Link
                        to={`/movie/${movieSlug}`}
                        onClick={closeWatchlistModal}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-gray-400 hover:text-white text-xs font-semibold transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => toggleWatchlist(movie.id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                    title="Remove from watchlist"
                    aria-label="Remove from watchlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-12 sm:py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-500">
                <Heart className="w-8 h-8 text-cw-red/40" />
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-display font-bold text-base sm:text-lg">
                  Your Watchlist is Empty
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
                  Click the ❤️ heart icon on any movie card or reel to save movies for your next movie night!
                </p>
              </div>
              <button
                onClick={closeWatchlistModal}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cw-red text-white text-xs sm:text-sm font-bold shadow-glow-sm hover:bg-cw-red-dark transition-all"
              >
                <span>Browse CinemaWala Movies</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {savedMovies.length > 0 && (
          <div className="px-5 sm:px-6 py-3.5 bg-[#0E1017] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span>Saved in your browser</span>
            <button
              onClick={() => {
                savedMovies.forEach((m) => toggleWatchlist(m.id));
              }}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
