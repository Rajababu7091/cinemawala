import React, { useState } from 'react';
import { Search, Filter, Tv, Star, Calendar, Globe, Film, Sparkles, Layers } from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SEO from '../components/SEO';

export default function WebSeriesPage() {
  const { movies } = useMovies();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Filter only web series (either type is 'series', genre includes 'Web Series', category includes 'Web Series', or has seasons)
  const seriesList = movies.filter(m => 
    m.type === 'series' ||
    (Array.isArray(m.genre) && m.genre.some(g => String(g).toLowerCase().includes('series'))) ||
    (Array.isArray(m.category) && m.category.some(c => String(c).toLowerCase().includes('series'))) ||
    (m.seasons && m.seasons.length > 0) ||
    String(m.duration || '').toLowerCase().includes('season') ||
    String(m.duration || '').toLowerCase().includes('episode')
  );

  const allLanguages = ['all', ...new Set(seriesList.map(s => s.language).filter(Boolean))];

  // Search & Filter
  const filteredSeries = seriesList
    .filter(item => {
      const matchSearch = !searchTerm.trim() || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(item.genre) && item.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (item.language && item.language.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchLang = selectedLanguage === 'all' || item.language === selectedLanguage;

      return matchSearch && matchLang;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return (b.year || 0) - (a.year || 0);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO 
        title="Web Series & Multi-Season Shows | CinemaWala"
        description="Watch & Direct Download all seasons and episodes of top Indian and international web series on CinemaWala."
      />

      {/* Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#1E1116] via-cw-card to-[#121625] border-2 border-cw-red/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cw-red/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cw-red/20 border border-cw-red/40 text-cw-red text-xs font-black uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>Dedicated Web Series Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight">
            Popular Web Series & All Seasons 📺
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Season 1, Season 2, Season 3 — sabhi seasons aur episodes direct 1-click download aur official watch links ke sath.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-cw-card border border-white/5 space-y-4 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search web series by title..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cw-surface text-white placeholder-gray-500 border border-white/10 focus:border-cw-red focus:outline-none text-sm transition-all"
            />
          </div>

          {/* Language Selector */}
          <div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-sm cursor-pointer capitalize"
            >
              {allLanguages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All Languages' : lang}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-sm cursor-pointer"
            >
              <option value="latest">Sort by Latest Releases</option>
              <option value="rating">Sort by Highest Rated</option>
              <option value="title">Sort by Title (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
          <span>Found <strong className="text-white">{filteredSeries.length}</strong> Web Series</span>
          <span className="flex items-center gap-1.5 text-cw-gold">
            <Layers className="w-3.5 h-3.5" />
            <span>Includes Multi-Season Packs & Episodes</span>
          </span>
        </div>
      </div>

      {/* Grid of Web Series */}
      {filteredSeries.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredSeries.map(series => (
            <MovieCard key={series.id} movie={series} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-cw-card border border-white/5 space-y-3">
          <Tv className="w-12 h-12 text-cw-red/50 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Web Series Found</h3>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">
            Try adjusting your search query or language filter to discover available series.
          </p>
        </div>
      )}
    </div>
  );
}
