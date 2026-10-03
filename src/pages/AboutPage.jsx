import React from 'react';
import { Film, Popcorn, ShieldCheck, Heart, Sparkles, Play } from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <SEO 
        title="About CinemaWala – Cinema ka asli adda"
        description="CinemaWala is a movie discovery platform created for movie lovers. Discover movie moments, explore titles and find legitimate places to watch your favorite movies."
      />

      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cw-surface border border-cw-red/30 text-xs font-semibold text-cw-red">
          <Popcorn className="w-4 h-4" />
          <span>Our Vision & Story</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          About CinemaWala 🎬
        </h1>
        <p className="text-lg text-gray-300 font-medium">
          "Cinema ka asli adda 🍿"
        </p>
      </div>

      {/* Main Mission Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-cw-card border border-white/10 space-y-6 text-gray-300 leading-relaxed shadow-xl">
        <p className="text-base sm:text-lg text-white font-medium">
          CinemaWala is a movie discovery platform created for movie lovers. Discover movie moments, explore titles and find legitimate places to watch your favorite movies.
        </p>
        
        <p className="text-sm sm:text-base">
          Every day, millions of film buffs watch intriguing scene clips, edits, and reels on Instagram, wondering: <em>"Which movie is this, and where can I watch it without shady sites or popups?"</em>
        </p>

        <p className="text-sm sm:text-base">
          CinemaWala was born to solve that exact question. We curate cinematic gems across Bollywood, Hollywood, South Indian cinema, and global independent storytelling. Whenever you see a reel from our Instagram channel or browse our discovery catalog, we take you directly to verified legal streaming providers (such as Prime Video, Netflix, Disney+ Hotstar, JioCinema, SonyLIV, and digital rental stores).
        </p>

        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-cw-surface border border-white/5 space-y-1">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Legal & Respectful
            </h4>
            <p className="text-xs text-gray-400">
              We never host or distribute pirated files. We celebrate filmmakers and support creators by directing traffic to legitimate platforms.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cw-surface border border-white/5 space-y-1">
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              Instagram Native Experience
            </h4>
            <p className="text-xs text-gray-400">
              One-click reel lookups designed to feel fast, effortless, and gorgeous on your smartphone screen.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-6 rounded-2xl bg-cw-surface border border-white/5 text-xs text-gray-400 leading-relaxed space-y-2">
        <h4 className="text-white font-bold text-xs uppercase tracking-wider">
          Copyright & Ownership Notice
        </h4>
        <p>
          CinemaWala does not claim ownership of any film titles, movie trailers, film stills, or copyrighted media displayed. All intellectual property remains the exclusive property of their respective production studios, distributors, and copyright holders. CinemaWala functions solely as an indexing and recommendation guide.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <Link
          to="/movies"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cw-red hover:bg-cw-red-dark text-white font-bold text-sm shadow-glow-red transition-all"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Explore Cinema Catalog</span>
        </Link>
      </div>
    </div>
  );
}
