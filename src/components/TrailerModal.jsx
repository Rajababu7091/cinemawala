import React, { useEffect } from 'react';
import { X, Play, ExternalLink, Film, Star, Calendar } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

/**
 * Extracts a valid YouTube embed URL from various YouTube formats
 * or creates a fallback search-embed for the official trailer.
 */
function getYouTubeEmbedUrl(movie) {
  if (!movie) return '';

  const url = movie.trailerUrl || movie.trailer;

  if (url && typeof url === 'string') {
    // If it's already an embed URL
    if (url.includes('youtube.com/embed/')) {
      const cleanUrl = url.split('&')[0];
      return `${cleanUrl}?autoplay=1&rel=0`;
    }

    // Match youtube.com/watch?v=VIDEO_ID
    const matchWatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (matchWatch && matchWatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${matchWatch[1]}?autoplay=1&rel=0`;
    }

    // Match youtu.be/VIDEO_ID
    const matchShort = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (matchShort && matchShort[1]) {
      return `https://www.youtube-nocookie.com/embed/${matchShort[1]}?autoplay=1&rel=0`;
    }

    // Match direct 11-char video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
      return `https://www.youtube-nocookie.com/embed/${url.trim()}?autoplay=1&rel=0`;
    }
  }

  // Fallback: YouTube Search Embed for the movie's official trailer
  const searchQuery = encodeURIComponent(`${movie.title} ${movie.year || ''} official trailer`);
  return `https://www.youtube-nocookie.com/embed?listType=search&list=${searchQuery}&autoplay=1&rel=0`;
}

export default function TrailerModal() {
  const { activeTrailerMovie, closeTrailer } = useMovies();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeTrailer();
      }
    };
    if (activeTrailerMovie) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeTrailerMovie, closeTrailer]);

  if (!activeTrailerMovie) return null;

  const embedUrl = getYouTubeEmbedUrl(activeTrailerMovie);
  const platform = activeTrailerMovie.platform || 'Streaming Partner';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={closeTrailer}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#13151E] to-[#0A0B0E] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#161824]/90 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cw-red/20 border border-cw-red/40 text-cw-red flex-shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-display font-bold text-sm sm:text-base truncate">
                  {activeTrailerMovie.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cw-red/20 text-cw-red text-[10px] font-black border border-cw-red/30 uppercase tracking-wider flex-shrink-0">
                  Trailer HD
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate flex items-center gap-2 mt-0.5">
                <span>{activeTrailerMovie.year || '2026'}</span>
                <span>•</span>
                <span>{activeTrailerMovie.language || 'Hindi'}</span>
                {activeTrailerMovie.rating && (
                  <>
                    <span>•</span>
                    <span className="text-cw-gold flex items-center gap-1 font-bold">
                      <Star className="w-3 h-3 fill-cw-gold" />
                      {Number(activeTrailerMovie.rating).toFixed(1)}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={closeTrailer}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all border border-white/10 flex-shrink-0"
            aria-label="Close trailer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`${activeTrailerMovie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <Play className="w-12 h-12 text-cw-red/50 mb-2" />
              <p>Trailer stream preview currently unavailable</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#0E1017] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-400 line-clamp-1 max-w-md hidden sm:block">
            {activeTrailerMovie.description || 'Watch the official preview above before streaming.'}
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={closeTrailer}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Close
            </button>
            {activeTrailerMovie.watchUrl && (
              <a
                href={activeTrailerMovie.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cw-red to-cw-red-dark hover:brightness-110 shadow-glow-sm transition-all"
              >
                <span>Watch Movie on {platform}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
