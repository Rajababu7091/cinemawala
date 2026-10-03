import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Star, Calendar, Globe, Film } from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SEO from '../components/SEO';

export default function MoviesPage() {
  const { movies } = useMovies();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('rating-desc');

  // Extract unique genres & languages
  const allGenres = ['all', ...new Set(movies.flatMap(m => Array.isArray(m.genre) ? m.genre : [m.genre]).filter(Boolean))];
  const allLanguages = ['all', ...new Set(movies.map(m => m.language).filter(Boolean))];

  // Filter & sort logic
  const filteredMovies = movies
    .filter(movie => {
      const matchSearch = !searchTerm.trim() || 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(movie.genre) && movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (movie.language && movie.language.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (movie.year && String(movie.year).includes(searchTerm));

      const matchGenre = selectedGenre === 'all' || 
        (Array.isArray(movie.genre) ? movie.genre.includes(selectedGenre) : movie.genre === selectedGenre);

      const matchLang = selectedLanguage === 'all' || movie.language === selectedLanguage;

      return matchSearch && matchGenre && matchLang;
    })
    .sort((a, b) => {
      if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'year-desc') return (b.year || 0) - (a.year || 0);
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO 
        title="Explore Movies & Shows"
        description="Browse the complete catalog of verified movies, films, and series with official watch destinations on CinemaWala."
      />

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
          Browse Movies & Series 🎬
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1">
          Explore movies from Bollywood, Hollywood, South Indian cinema, and beyond. Find official streaming links in one click.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-cw-card border border-white/5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-cw-red absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search title, cast..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cw-surface text-white placeholder-gray-400 border border-white/10 focus:border-cw-red focus:outline-none text-sm"
            />
          </div>

          {/* Genre Dropdown */}
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Genres</option>
              {allGenres.filter(g => g !== 'all').map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Languages</option>
              {allLanguages.filter(l => l !== 'all').map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-sm appearance-none cursor-pointer"
            >
              <option value="rating-desc">Highest Rated ⭐</option>
              <option value="year-desc">Release Year (Newest)</option>
              <option value="title-asc">Alphabetical (A - Z)</option>
            </select>
          </div>

        </div>

        {/* Active Filter Indicators */}
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5 gap-2">
          <span>Found {filteredMovies.length} matching movies</span>
          {(searchTerm || selectedGenre !== 'all' || selectedLanguage !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('all');
                setSelectedLanguage('all');
              }}
              className="text-cw-red hover:underline font-medium"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-cw-card rounded-2xl border border-white/5">
          <Film className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No movies match your criteria</h3>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search terms or filters above.
          </p>
        </div>
      )}
    </div>
  );
}
