import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Film, Search, Menu, X, ShieldAlert, Sparkles, Popcorn } from 'lucide-react';

export default function Navbar({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Movies', path: '/movies' },
    { label: 'Trending', path: '/#trending' },
    { label: 'Categories', path: '/#categories' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (location.pathname === '/') {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none"
            id="nav-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cw-red to-cw-red-dark shadow-glow-sm group-hover:shadow-glow-red transition-all duration-300 group-hover:scale-105">
              <Film className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cw-gold rounded-full animate-ping opacity-75" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cw-gold rounded-full" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-red-50 transition-colors">
                  Cinema<span className="text-cw-red">Wala</span>
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide hidden sm:block">
                Cinema ka asli adda 🍿
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return link.path.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active 
                      ? 'text-white bg-cw-red/15 border border-cw-red/30 shadow-glow-sm' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search Trigger / Input */}
            <button
              onClick={onOpenSearch}
              id="desktop-search-btn"
              className="hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-cw-surface/80 border border-white/10 text-gray-400 hover:text-white hover:border-cw-red/40 hover:bg-cw-surface transition-all duration-200 w-44 lg:w-56 text-left group"
              aria-label="Search movies"
            >
              <Search className="w-4 h-4 text-cw-red group-hover:scale-110 transition-transform" />
              <span className="text-xs text-gray-400 group-hover:text-gray-300 truncate">Search movies, genres...</span>
              <kbd className="hidden lg:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-gray-500 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              id="mobile-search-btn"
              className="sm:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 text-cw-red" />
            </button>

            {/* Admin Portal Link */}
            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-cw-red border border-white/5 hover:border-cw-red/30 bg-black/20 hover:bg-cw-red/5 transition-all"
              title="Admin & Movie Management Mockup"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0F14]/98 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Popcorn className="w-4 h-4 text-cw-red" />
              Cinema ka asli adda
            </span>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-cw-red font-medium flex items-center gap-1 hover:underline"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </div>

          <div className="pt-2 flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return link.path.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-gray-200 hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active 
                      ? 'bg-cw-red text-white shadow-glow-sm' 
                      : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cw-surface border border-cw-red/30 text-white font-medium hover:bg-cw-red/20 transition-all"
            >
              <Search className="w-4 h-4 text-cw-red" />
              <span>Search Movies, Genres & Years</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
