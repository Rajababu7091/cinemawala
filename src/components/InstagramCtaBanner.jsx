import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Popcorn, CheckCircle } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { useMovies } from '../context/MovieContext';

export default function InstagramCtaBanner() {
  const { movies } = useMovies();
  // Get first trending movie for the quick CTA shortcut
  const featuredReelMovie = movies.find(m => m.trending) || movies[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#181B24] via-[#1F141A] to-[#14161F] border border-cw-red/30 p-6 sm:p-8 lg:p-10 shadow-2xl">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-gradient-to-bl from-cw-red/20 via-pink-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-cw-red/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Side: Copy */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-cw-red/20 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-3">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Official Instagram Discovery Hub</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-tight">
            🎬 Looking for that movie from Instagram?
          </h3>
          
          <p className="text-sm sm:text-base text-gray-300 mt-2 leading-relaxed">
            Find exactly where to watch it officially. No fake links, no pirated malware, just verified streaming & rental platforms.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              100% Legal & Safe Links
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Direct Platform Redirects
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Updated Reel Catalog
            </span>
          </div>
        </div>

        {/* Right Side: CTA Action */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 w-full md:w-auto flex-shrink-0">
          {featuredReelMovie && (
            <Link
              to={`/watch/${featuredReelMovie.slug || featuredReelMovie.id}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cw-red to-cw-red-dark text-white font-bold text-sm shadow-glow-red hover:brightness-110 active:scale-95 transition-all text-center"
            >
              <span>Watch Movie</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <Link
            to="/movies"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/10 transition-colors text-center"
          >
            <span>Browse All Reels</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
