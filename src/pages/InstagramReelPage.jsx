import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Film, Play, ExternalLink, ShieldCheck, ArrowLeft, Star, Download, Heart, MessageCircle, Share2, Check } from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SEO from '../components/SEO';
import HdDownloadBox from '../components/HdDownloadBox';

export default function InstagramReelPage() {
  const { movieSlug } = useParams();
  const { getMovieBySlug, movies, isInWatchlist, toggleWatchlist, openTrailer } = useMovies();
  const [copied, setCopied] = useState(false);

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

  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    if (!movie) return;
    const text = `🍿 Check out "${movie.title}" on CinemaWala! Find where to watch officially:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

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
        <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
          <a
            href="https://www.instagram.com/cinema.wala6746/reels/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-yellow-500/20 border border-pink-500/40 text-pink-300 hover:text-white hover:border-pink-500 text-xs font-bold transition-all shadow-sm group hover:scale-105"
            title="Follow @cinema.wala6746 on Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400 group-hover:rotate-12 transition-transform" />
            <span>Watch more on Instagram @cinema.wala6746 🍿</span>
          </a>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Watch it on an official platform.
            </h3>

            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
              Available on <strong className="text-white">{movie.platform || 'Official Partner'}</strong>. No annoying ads or unauthorized sites.
            </p>
          </div>

          {/* Primary CTA Buttons: Watch Now, Trailer, Direct Download */}
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={movie.watchUrl || 'https://www.netflix.com'}
                target="_blank"
                rel="noopener noreferrer"
                id="reel-watch-now-btn"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cw-red to-cw-red-dark text-white font-extrabold text-sm sm:text-base shadow-glow-red hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Watch on {movie.platform || 'Partner'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={() => openTrailer(movie)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 hover:border-cw-red/50 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-cw-red text-cw-red" />
                <span>Watch Trailer HD</span>
              </button>
            </div>

            {/* Direct Download with Quality Tags on Top */}
            <div className="flex flex-col items-center gap-1.5 pt-1 w-full max-w-md">
              <div className="flex items-center flex-wrap justify-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 shadow-inner">
                <span className="text-[10px] font-black uppercase tracking-wider text-cw-red mr-0.5">Quality:</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/5 text-gray-400 border border-white/5">144p</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/5 text-gray-400 border border-white/5">480p</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cw-red/15 text-cw-red border border-cw-red/30">720p</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cw-red/15 text-cw-red border border-cw-red/30">1080p</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cw-red/15 text-cw-red border border-cw-red/30">1440p</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-cw-gold/15 text-cw-gold border border-cw-gold/40">2160p 4K</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('hd-direct-download-box');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    el.classList.add('ring-4', 'ring-cw-red/70', 'shadow-[0_0_35px_rgba(229,9,20,0.4)]');
                    setTimeout(() => {
                      el.classList.remove('ring-4', 'ring-cw-red/70', 'shadow-[0_0_35px_rgba(229,9,20,0.4)]');
                    }, 2200);
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cw-surface hover:bg-white/10 text-white font-bold text-sm border border-white/15 hover:border-cw-red/50 shadow-md hover:scale-102 active:scale-95 transition-all group cursor-pointer"
              >
                <Download className="w-4 h-4 text-cw-red group-hover:translate-y-0.5 transition-transform" />
                <span>Direct Download</span>
                <span className="px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-cw-red/25 text-cw-red border border-cw-red/40 ml-0.5">
                  HD
                </span>
              </button>
            </div>
          </div>

          {/* Secondary Actions: Watchlist, Share WhatsApp, Copy, Full Details */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => toggleWatchlist(movie.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${inWatchlist
                  ? 'bg-cw-red/20 border-cw-red text-cw-red'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
            >
              <Heart className={`w-3.5 h-3.5 ${inWatchlist ? 'fill-cw-red text-cw-red' : ''}`} />
              <span>{inWatchlist ? 'Saved in Watchlist' : 'Add to Watchlist'}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 font-bold text-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <Link
              to={`/movie/${movie.slug || movie.id}`}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white text-xs font-semibold transition-colors"
            >
              <span>Full Details &rarr;</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Opens official verified streaming provider. 100% Legal.</span>
          </div>
        </div>
      </div>

      {/* Dedicated HD Only Direct Download Box */}
      <HdDownloadBox movie={movie} />

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
