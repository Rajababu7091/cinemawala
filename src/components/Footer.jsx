import React from 'react';
import { Link } from 'react-router-dom';
import { Film, ShieldCheck, Heart, Lock } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#07080B] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cw-red to-cw-red-dark shadow-glow-sm">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Cinema<span className="text-cw-red">Wala</span>
              </span>
            </Link>

            <p className="text-sm text-gray-300 font-medium">
              "Cinema ka asli adda 🍿"
            </p>

            <p className="text-xs text-gray-400 max-w-md leading-relaxed">
              CinemaWala is a modern movie discovery destination. We help film enthusiasts uncover unforgettable cinema moments, trending stories, and direct them to official, legal platforms to watch or rent.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cw-surface border border-white/5 flex items-center justify-center text-gray-300 hover:text-pink-400 hover:border-pink-500/40 hover:bg-white/5 transition-all"
                aria-label="CinemaWala on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cw-surface border border-white/5 flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-500/40 hover:bg-white/5 transition-all"
                aria-label="CinemaWala on YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cw-surface border border-white/5 flex items-center justify-center text-gray-300 hover:text-blue-500 hover:border-blue-500/40 hover:bg-white/5 transition-all"
                aria-label="CinemaWala on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-cw-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-cw-red transition-colors">
                  Movies Catalog
                </Link>
              </li>
              <li>
                <a href="/#trending" className="hover:text-cw-red transition-colors">
                  🔥 Trending Now
                </a>
              </li>
              <li>
                <a href="/#categories" className="hover:text-cw-red transition-colors">
                  Movie Categories
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-cw-red transition-colors">
                  About CinemaWala
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Legal & Safety
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/privacy" className="hover:text-cw-red transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-cw-red transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-cw-surface border border-white/10 text-[11px] text-gray-400">
                🔒 Strict Anti-Piracy Policy
              </span>
            </div>
          </div>

        </div>

        {/* Disclaimer Banner */}
        <div className="mt-10 pt-6 border-t border-white/5 text-[11px] text-gray-500 leading-relaxed text-center sm:text-left">
          CinemaWala does not host, upload, scrape, or distribute copyrighted video files. Every outbound "Watch" link directs exclusively to legitimate, licensed streaming services, digital rentals, or official distributor portals.
        </div>

        {/* Bottom Rights */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 CinemaWala. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-cw-red fill-cw-red" /> for true cinema lovers
            </p>
            <Link 
              to="/admin" 
              className="text-gray-700 hover:text-gray-400 transition-colors p-1" 
              title="Admin Portal" 
              aria-label="Admin Login"
            >
              <Lock className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
