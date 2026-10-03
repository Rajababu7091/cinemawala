import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Star, Calendar, Globe, Film, ArrowRight } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function SearchModal({ isOpen, onClose }) {
  const { movies } = useMovies();
  const [query, setQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // handled by root
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter movies by query (title, genre, language, year)
  const trimmed = query.trim().toLowerCase();
  const filtered = movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(trimmed);
    const genreMatch = Array.isArray(movie.genre)
      ? movie.genre.some(g => g.toLowerCase().includes(trimmed))
      : String(movie.genre).toLowerCase().includes(trimmed);
    const langMatch = movie.language ? movie.language.toLowerCase().includes(trimmed) : false;
    const yearMatch = movie.year ? String(movie.year).includes(trimmed) : false;
    const castMatch = Array.isArray(movie.cast)
      ? movie.cast.some(c => c.toLowerCase().includes(trimmed))
      : false;

    const matchesQuery = !trimmed || titleMatch || genreMatch || langMatch || yearMatch || castMatch;
    const matchesLangFilter = selectedLanguage === 'all' || 
      (movie.language && movie.language.toLowerCase() === selectedLanguage.toLowerCase());

    return matchesQuery && matchesLangFilter;
  });

  const languages = ['all', ...new Set(movies.map(m => m.language).filter(Boolean))];

  const handleSelectMovie = (movie) => {
    onClose();
    navigate(`/movie/${movie.slug || movie.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div 
        className="relative w-full max-w-2xl bg-cw-card border border-cw-red/30 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-cw-surface/90">
          <Search className="w-5 h-5 text-cw-red flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, genre, language, year, or cast..."
            className="w-full bg-transparent text-white placeholder-gray-400 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors border border-white/10 ml-1"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Tags (Languages) */}
        <div className="px-4 py-2 bg-[#0B0C10] border-b border-white/5 flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <span className="text-[11px] font-medium text-gray-400 flex-shrink-0">Filter language:</span>
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`text-xs px-2.5 py-1 rounded-lg capitalize transition-colors flex-shrink-0 ${
                selectedLanguage === lang
                  ? 'bg-cw-red text-white font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-3 sm:p-4 space-y-2 flex-grow">
          {filtered.length > 0 ? (
            filtered.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleSelectMovie(movie)}
                className="group flex items-center gap-3.5 p-2.5 sm:p-3 rounded-xl hover:bg-cw-surface cursor-pointer border border-transparent hover:border-cw-red/30 transition-all duration-200"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-12 h-16 sm:w-14 sm:h-20 object-cover rounded-lg bg-cw-surface flex-shrink-0 shadow"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200&auto=format&fit=crop';
                  }}
                />

                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cw-red transition-colors truncate">
                      {movie.title}
                    </h4>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 flex-shrink-0">
                      {movie.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-gray-500" />
                      {movie.language}
                    </span>
                    <span>•</span>
                    <span className="text-cw-gold flex items-center gap-0.5 font-semibold">
                      <Star className="w-3 h-3 fill-cw-gold" />
                      {movie.rating}
                    </span>
                    <span>•</span>
                    <span className="truncate max-w-[150px] sm:max-w-xs text-gray-400">
                      {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                    {movie.description}
                  </p>
                </div>

                <div className="hidden sm:flex items-center text-xs font-medium text-cw-red opacity-0 group-hover:opacity-100 transition-opacity gap-1 flex-shrink-0 pr-2">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          ) : (
            /* No Movies Found State */
            <div className="py-12 px-4 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cw-surface flex items-center justify-center text-gray-500 border border-white/10">
                <Film className="w-8 h-8 text-cw-red/60" />
              </div>
              <h3 className="text-lg font-bold text-white">No movies found</h3>
              <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">
                We couldn't find any movie matching "{query}". Try checking for spelling or searching for another genre, year or language.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setQuery('Romance')}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cw-red/20 text-gray-300 hover:text-white transition-colors"
                >
                  Search "Romance"
                </button>
                <button
                  onClick={() => setQuery('Action')}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cw-red/20 text-gray-300 hover:text-white transition-colors"
                >
                  Search "Action"
                </button>
                <button
                  onClick={() => setQuery('Hindi')}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cw-red/20 text-gray-300 hover:text-white transition-colors"
                >
                  Search "Hindi"
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#0B0C10] border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
          <span>Found {filtered.length} {filtered.length === 1 ? 'title' : 'titles'}</span>
          <span className="hidden sm:inline">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
