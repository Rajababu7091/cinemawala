import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, Calendar, Globe, Clock, User, Film, ExternalLink, 
  Share2, ArrowLeft, Check, Sparkles, AlertCircle, ShieldCheck, Play, Download,
  Heart, MessageCircle
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SEO from '../components/SEO';

export default function MovieDetailsPage() {
  const { movieSlug } = useParams();
  const { getMovieBySlug, movies, isInWatchlist, toggleWatchlist, openTrailer } = useMovies();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const movie = getMovieBySlug(movieSlug);

  if (!movie) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <Film className="w-16 h-16 text-cw-red/60 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Movie Not Found</h2>
        <p className="text-gray-400 mt-2 text-sm">
          The requested movie could not be located in our verified catalog.
        </p>
        <Link
          to="/movies"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cw-red text-white font-medium hover:bg-cw-red-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Movies</span>
        </Link>
      </div>
    );
  }

  // Related movies (same genre or language, excluding current)
  const relatedMovies = movies
    .filter(m => m.id !== movie.id && (
      (Array.isArray(m.genre) && Array.isArray(movie.genre) && m.genre.some(g => movie.genre.includes(g))) ||
      m.language === movie.language
    ))
    .slice(0, 4);

  const inWatchlist = isInWatchlist(movie.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    if (!movie) return;
    const text = `🍿 Check out "${movie.title}" (${movie.year}) on CinemaWala! Find where to watch officially:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Platform styling helper
  const platform = movie.platform || 'Official Streaming Partner';

  return (
    <div className="space-y-12">
      <SEO 
        title={`${movie.title} (${movie.year}) – Where to Watch`}
        description={`Find where to watch ${movie.title} (${movie.year}) officially. ${movie.description}`}
        image={movie.poster}
      />

      {/* Backdrop Header with Overlays */}
      <div className="relative -mt-6 sm:-mt-8 min-h-[350px] sm:min-h-[460px] flex items-end overflow-hidden rounded-b-3xl border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover object-center filter brightness-30 transform scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = movie.poster;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0E] via-[#0A0B0E]/50 to-transparent" />
        </div>

        {/* Navigation Back bar */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-gray-200 border border-white/10 text-xs sm:text-sm font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Header Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-24 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md bg-cw-red/90 text-white font-bold text-xs shadow-glow-sm">
              {movie.language || 'Hindi'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 text-gray-300 font-medium text-xs border border-white/10">
              {movie.year || '2026'}
            </span>
            {movie.duration && (
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-gray-300 font-medium text-xs border border-white/10">
                {movie.duration}
              </span>
            )}
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/70 border border-cw-gold/30 text-cw-gold font-bold text-sm">
              <Star className="w-4 h-4 fill-cw-gold text-cw-gold" />
              <span>{movie.rating ? Number(movie.rating).toFixed(1) : '8.0'}/10</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight">
            {movie.title}
          </h1>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Large Poster & Quick Actions */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-cw-surface border border-white/10 shadow-2xl group">
              <img
                src={movie.poster}
                alt={`${movie.title} Official Poster`}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Action Buttons under Poster */}
            <div className="space-y-2.5">
              {/* Watch Trailer HD Button */}
              <button
                onClick={() => openTrailer(movie)}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cw-red/20 via-rose-600/20 to-cw-red/20 hover:from-cw-red/30 hover:to-cw-red/30 border border-cw-red/50 text-white font-bold text-sm shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:scale-[1.02] active:scale-95 transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-cw-red flex items-center justify-center shadow-glow-sm">
                  <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                </div>
                <span>Watch Official Trailer HD</span>
              </button>

              {/* Save to Watchlist Button */}
              <button
                onClick={() => toggleWatchlist(movie.id)}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                  inWatchlist
                    ? 'bg-cw-red/20 border-cw-red text-cw-red shadow-glow-sm'
                    : 'bg-cw-surface border-white/10 text-gray-200 hover:text-white hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWatchlist ? 'fill-cw-red text-cw-red' : ''}`} />
                <span>{inWatchlist ? 'Saved in Your Watchlist ❤️' : 'Save to Watchlist'}</span>
              </button>

              {/* Share & External Row */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 font-bold text-xs transition-colors"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-cw-surface border border-white/10 text-white font-medium text-xs hover:bg-white/10 transition-colors"
                  title="Copy link to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
                
                <Link
                  to={`/watch/${movie.slug || movie.id}`}
                  className="flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 text-xs font-semibold transition-colors"
                  title="View Instagram reel landing page"
                >
                  <span>IG Reel</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata, Storyline & "Where to Watch" */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* ================= WHERE TO WATCH (PRIMARY OFFICIAL CTA) ================= */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1A1D27] to-[#12141C] border-2 border-cw-red/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cw-red/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cw-red mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Legal Watch Destination</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Where to Watch:
              </h2>

              <p className="text-sm text-gray-300 mt-1 max-w-xl">
                Ready to experience this film? Watch officially on licensed streaming partners.
              </p>

              {/* Streaming Platform Box */}
              <div className="mt-6 p-4 sm:p-5 rounded-xl bg-cw-card/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-cw-surface border border-white/10 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                    <Film className="w-6 h-6 text-cw-red" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Available on</span>
                    <h4 className="text-lg font-bold text-white">
                      {platform}
                    </h4>
                  </div>
                </div>

                {/* The "Watch Now", "Trailer", and "Download" Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
                  <a
                    href={movie.watchUrl || 'https://www.netflix.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="official-watch-btn"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cw-red to-cw-red-dark text-white font-bold text-sm sm:text-base shadow-glow-red hover:brightness-110 active:scale-95 transition-all text-center"
                  >
                    <Play className="w-5 h-5 fill-white text-white" />
                    <span>Watch Now</span>
                    <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                  </a>

                  <button
                    onClick={() => openTrailer(movie)}
                    id="official-trailer-btn"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-cw-surface hover:bg-white/10 text-white font-bold text-sm sm:text-base border border-white/15 hover:border-cw-red/50 shadow-md hover:scale-102 active:scale-95 transition-all text-center"
                    title="Watch Official Trailer HD"
                  >
                    <Play className="w-4 h-4 fill-cw-red text-cw-red" />
                    <span>Trailer</span>
                  </button>

                  <a
                    href={movie.watchUrl || 'https://www.netflix.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="official-download-btn"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-cw-surface hover:bg-white/10 text-white font-bold text-sm sm:text-base border border-white/15 hover:border-cw-red/50 shadow-md hover:scale-102 active:scale-95 transition-all text-center"
                    title="Download on official platform"
                  >
                    <Download className="w-5 h-5 text-cw-red" />
                    <span>Download</span>
                    <ExternalLink className="w-4 h-4 ml-1 opacity-70 text-gray-400" />
                  </a>
                </div>
              </div>

              {/* Legal Notice */}
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <AlertCircle className="w-3.5 h-3.5 text-cw-gold flex-shrink-0" />
                <span>Redirects exclusively to legitimate streaming, rental, or official distributor page. No piracy.</span>
              </div>
            </div>

            {/* Synopsis / Description */}
            <div className="p-6 rounded-2xl bg-cw-card border border-white/5 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📖</span> Storyline & Synopsis
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Details Grid: Genres, Director, Cast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Genres */}
              <div className="p-5 rounded-2xl bg-cw-card border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                  Genres
                </span>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(movie.genre) ? (
                    movie.genre.map((g, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-cw-surface border border-white/10 text-xs font-medium text-gray-200"
                      >
                        {g}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-cw-surface border border-white/10 text-xs font-medium text-gray-200">
                      {movie.genre}
                    </span>
                  )}
                </div>
              </div>

              {/* Director */}
              <div className="p-5 rounded-2xl bg-cw-card border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                  Director
                </span>
                <p className="text-sm font-semibold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-cw-red" />
                  <span>{movie.director || 'CinemaWala Verified Director'}</span>
                </p>
              </div>

              {/* Cast */}
              <div className="p-5 rounded-2xl bg-cw-card border border-white/5 space-y-2 sm:col-span-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                  Leading Cast
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {Array.isArray(movie.cast) && movie.cast.length > 0 ? (
                    movie.cast.map((actor, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-200 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cw-red" />
                        {actor}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">Cast info coming soon</span>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ================= RELATED MOVIES ================= */}
        {relatedMovies.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                  More Movies You May Like 🍿
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Similar cinema gems in {movie.language} and matching genres
                </p>
              </div>
              <Link to="/movies" className="text-xs sm:text-sm font-semibold text-cw-red hover:underline">
                View Catalog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedMovies.map(rel => (
                <MovieCard key={rel.id} movie={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
