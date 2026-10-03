import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Film, Play, ExternalLink, ShieldCheck, ArrowLeft, Star, Download } from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SEO from '../components/SEO';

export default function InstagramReelPage() {
  const { movieSlug } = useParams();
  const { getMovieBySlug, movies } = useMovies();

  const movie = getMovieBySlug(movieSlug);

  if (!movie) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <Film className="w-16 h-16 text-cw-red/60 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Movie Reel Not Found</h2>
        <p className="text-gray-400 mt-2 text-sm">
          The movie from this Instagram link could not be found.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cw-red text-white text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore CinemaWala</span>
        </Link>
      </div>
    );
  }

  // 4 Related movie cards
  const relatedMovies = movies
    .filter(m => m.id !== movie.id)
    .slice(0, 4);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEO 
        title={`Watch ${movie.title} – CinemaWala Instagram Reel`}
        description={`Found ${movie.title} on Instagram? Watch it on an official platform. 🍿`}
        image={movie.poster}
      />

      {/* Top CinemaWala Brand Header */}
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cw-red to-cw-red-dark shadow-glow-sm">
            <Film className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-white group-hover:text-red-50">
            Cinema<span className="text-cw-red">Wala</span>
          </span>
        </Link>
        <p className="text-xs text-gray-400 font-medium tracking-wide">
          Cinema ka asli adda 🍿
        </p>
      </div>

      {/* Main Lightweight Card for Instagram Visitors */}
      <div className="relative rounded-3xl bg-cw-card border border-cw-red/40 p-5 sm:p-8 shadow-2xl overflow-hidden text-center">
        {/* Subtle IG Gradient Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cw-red" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cw-red/10 rounded-full blur-3xl pointer-events-none" />

        {/* Movie Poster */}
        <div className="relative max-w-[260px] sm:max-w-[280px] mx-auto aspect-[2/3] rounded-2xl overflow-hidden bg-cw-surface shadow-2xl border border-white/10 mb-6 group">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
            }}
          />
          {movie.rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-cw-gold text-xs font-bold shadow-md">
              <Star className="w-3.5 h-3.5 fill-cw-gold text-cw-gold" />
              <span>{Number(movie.rating).toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Movie Name */}
        <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
          {movie.title}
        </h1>

        {/* Year, Language & Genre metadata */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 mt-2">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.language}</span>
          {movie.duration && (
            <>
              <span>•</span>
              <span>{movie.duration}</span>
            </>
          )}
          <span>•</span>
          <span className="text-gray-300">
            {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto mt-4 leading-relaxed">
          {movie.description}
        </p>

        {/* Instagram Hook Prompts */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Found this movie on Instagram? 🍿</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white">
            Watch it on an official platform.
          </h3>
          
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Available on <strong className="text-white">{movie.platform || 'Official Partner'}</strong>. No annoying ads or unauthorized sites.
          </p>

          {/* Primary CTA Buttons: Watch Now and Download */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={movie.watchUrl || 'https://www.netflix.com'}
              target="_blank"
              rel="noopener noreferrer"
              id="reel-watch-now-btn"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto sm:min-w-[180px] px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cw-red to-cw-red-dark text-white font-extrabold text-base shadow-glow-red hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-white text-white" />
              <span>Watch Now</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>

            <a
              href={movie.watchUrl || 'https://www.netflix.com'}
              target="_blank"
              rel="noopener noreferrer"
              id="reel-download-btn"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[180px] px-6 py-3.5 rounded-2xl bg-cw-surface hover:bg-white/10 text-white font-bold text-base border border-white/15 hover:border-cw-red/50 shadow-md hover:scale-105 active:scale-95 transition-all"
              title="Download on official platform"
            >
              <Download className="w-5 h-5 text-cw-red" />
              <span>Download</span>
              <ExternalLink className="w-4 h-4 opacity-70 text-gray-400" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Opens official verified streaming provider. 100% Legal.</span>
          </div>
        </div>
      </div>

      {/* "More Movies You May Like" with 4 related cards */}
      <div className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
            More Movies You May Like
          </h2>
          <Link to="/movies" className="text-xs font-semibold text-cw-red hover:underline">
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedMovies.map(rel => (
            <MovieCard key={rel.id} movie={rel} />
          ))}
        </div>
      </div>
    </div>
  );
}
