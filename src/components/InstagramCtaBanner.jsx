import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { useMovies } from '../context/MovieContext';

export default function InstagramCtaBanner() {
  const { movies } = useMovies();
  const featuredReelMovie = movies.find(m => m.trending) || movies[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#18121E] via-[#1B1525] to-[#12141F] border border-pink-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl hover:border-pink-500/50 transition-all duration-500 group">
      {/* 3D Dynamic Ambient Glows */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-gradient-to-bl from-pink-600/25 via-purple-600/20 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute bottom-0 left-1/4 -mb-12 w-64 h-64 bg-gradient-to-tr from-cw-red/20 via-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Mesh line overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Side: Copy */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-yellow-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold mb-3.5 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>@cinema.wala6746 • Official Instagram Channel</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight">
            🎬 Looking for that movie from Instagram Reels?
          </h3>
          
          <p className="text-sm sm:text-base text-gray-300 mt-2.5 leading-relaxed">
            Find the exact movie title and where to watch it legally. Follow our official handle <strong className="text-pink-400">@cinema.wala6746</strong> for daily cinematic reels, scene edits, and streaming guides!
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-gray-300">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              100% Legal Streaming Links
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Verified Netflix, Prime & JioCinema
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Daily New Movie Reels
            </span>
          </div>
        </div>

        {/* Right Side: CTA Action */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3.5 w-full md:w-auto flex-shrink-0">
          <a
            href="https://www.instagram.com/cinema.wala6746/reels/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-official-channel-btn"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 via-pink-600 to-purple-600 hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 text-white font-black text-sm shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-105 active:scale-95 transition-all text-center group/btn"
          >
            <InstagramIcon className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
            <span>Open Instagram Reels</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          {featuredReelMovie && (
            <Link
              to={`/watch/${featuredReelMovie.slug || featuredReelMovie.id}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 hover:border-cw-red/50 hover:scale-105 active:scale-95 transition-all text-center"
            >
              <span>Quick Reel Finder</span>
              <ArrowRight className="w-4 h-4 text-cw-red" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
