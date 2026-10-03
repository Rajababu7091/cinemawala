import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Clapperboard, Home, Compass } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <SEO 
        title="404 – Scene Not Found"
        description="Oops! This scene doesn't exist on CinemaWala. Back to CinemaWala."
      />

      <div className="max-w-md w-full space-y-6">
        
        {/* Cinematic 404 Visual */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-cw-red/15 rounded-full blur-2xl animate-pulse-subtle" />
          <div className="relative w-28 h-28 rounded-3xl bg-cw-card border border-cw-red/40 flex flex-col items-center justify-center text-cw-red shadow-glow-sm">
            <Film className="w-12 h-12 mb-1" />
            <span className="font-mono text-xs font-black tracking-widest text-white">404 CUT</span>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Oops! This scene doesn't exist 🎬
          </h1>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            Looks like this reel was left on the cutting room floor or the link has changed.
          </p>
        </div>

        {/* CTA Button: "Back to CinemaWala" */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-cw-red hover:bg-cw-red-dark text-white font-bold text-sm shadow-glow-red hover:scale-105 active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to CinemaWala</span>
          </Link>

          <Link
            to="/movies"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium text-sm border border-white/10 transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Movies</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
