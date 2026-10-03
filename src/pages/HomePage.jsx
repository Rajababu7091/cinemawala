import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Play, TrendingUp, Sparkles, Compass, Star, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import CategoryFilter from '../components/CategoryFilter';
import InstagramCtaBanner from '../components/InstagramCtaBanner';
import SEO from '../components/SEO';

export default function HomePage() {
  const { movies } = useMovies();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const trendingMovies = movies.filter(m => m.trending);

  // Filtered movies based on category
  const filteredMovies = movies.filter(movie => {
    if (selectedCategory === 'all') return true;

    const genreMatch = Array.isArray(movie.genre)
      ? movie.genre.some(g => g.toLowerCase() === selectedCategory.toLowerCase())
      : String(movie.genre).toLowerCase() === selectedCategory.toLowerCase();

    const categoryTagMatch = Array.isArray(movie.category)
      ? movie.category.some(c => c.toLowerCase() === selectedCategory.toLowerCase())
      : false;

    return genreMatch || categoryTagMatch;
  });

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      <SEO 
        title="CinemaWala – Discover Movies & Where to Watch"
        description="Discover movies, memorable moments and find official platforms to watch them. Cinema ka asli adda 🍿"
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[82vh] sm:min-h-[85vh] flex items-center justify-center -mt-6 sm:-mt-8 overflow-hidden rounded-b-3xl">
        {/* Background Image with Dark Cinematic Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop"
            alt="Cinematic theater background"
            className="w-full h-full object-cover object-center scale-105 filter brightness-40 transform animate-pulse-subtle"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/75 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0A0B0E]/60 to-[#0A0B0E]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cw-red/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cw-surface/90 border border-cw-red/40 text-xs sm:text-sm font-semibold text-gray-200 backdrop-blur-md mb-6 shadow-glow-sm">
            <span className="text-cw-red">●</span>
            <span>Cinema ka asli adda 🍿</span>
            <span className="text-gray-500">•</span>
            <span className="text-cw-gold">100% Legal Streaming Guide</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6">
            Your Daily Dose of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-red-100 to-cw-red bg-clip-text text-transparent drop-shadow-sm">
              Cinema 🎬
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-300 font-normal leading-relaxed mb-8">
            Discover memorable movie moments, stories and where to watch them.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={() => scrollToSection('categories')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cw-red hover:bg-cw-red-dark text-white font-bold text-base sm:text-lg shadow-glow-red hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Movies</span>
            </button>

            <button
              onClick={() => scrollToSection('trending')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cw-surface/90 hover:bg-white/10 text-white font-bold text-base sm:text-lg border border-white/10 hover:border-cw-red/40 backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5 text-cw-red" />
              <span>Trending Now</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Streaming Links</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Piracy • Zero Malware</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official Netflix, Prime, Hotstar & More</span>
            </div>
          </div>

          {/* Down Indicator */}
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => scrollToSection('trending')}
              className="text-gray-500 hover:text-cw-red transition-colors animate-bounce p-2"
              aria-label="Scroll down"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= INSTAGRAM CTA BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InstagramCtaBanner />
      </section>

      {/* ================= TRENDING SECTION ================= */}
      <section id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-cw-red text-sm font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Hot on CinemaWala</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              🔥 Trending Now
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1">
              Top movies gaining buzz across Instagram reels and streaming networks
            </p>
          </div>

          <Link
            to="/movies"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-cw-red hover:underline"
          >
            <span>View All</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingMovies.slice(0, 8).map((movie) => (
            <MovieCard key={movie.id} movie={movie} featured={true} />
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Filtered Movies Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400">
              Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'title' : 'titles'}
              {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
            </span>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-cw-card rounded-2xl border border-white/5">
              <Film className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No movies found in this category</h3>
              <p className="text-sm text-gray-400 mt-1">
                Try selecting "All Movies" or another vibe above.
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-4 py-2 rounded-xl bg-cw-red text-white text-xs font-semibold"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= BRAND HIGHLIGHT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-cw-card border border-white/5 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-cw-red/10 border border-cw-red/30 flex items-center justify-center text-cw-red text-xl mb-3">
                🍿
              </div>
              <h3 className="text-lg font-bold text-white">Curated Cinema Moments</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Handpicked memorable scenes and stories curated specifically for genuine movie lovers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl mb-3">
                🔒
              </div>
              <h3 className="text-lg font-bold text-white">Zero Piracy Policy</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Never worry about sketchy popups or illegal torrents. Every link routes straight to authorized creators & platforms.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 text-xl mb-3">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white">Reel to Watch in Seconds</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Seamless transition from our Instagram reels right to the official movie watch link on your phone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
