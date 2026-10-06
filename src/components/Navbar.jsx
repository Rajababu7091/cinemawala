import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Film, Search, Menu, X, Sparkles, Popcorn, User, LogOut, Shield, ChevronDown, Heart, Dices } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';

const GoogleIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export default function Navbar({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const userMenuRef = useRef(null);

  const { user, isAdmin, loginWithGoogle, logout } = useAuth();
  const { watchlist, openWatchlistModal, openSurpriseModal } = useMovies();
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Movies', path: '/movies' },
    { label: 'Web Series', path: '/series' },
    { label: 'Trending', path: '/#trending' },
    { label: 'Categories', path: '/#categories' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
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

  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuthLoading(false);
      setUserMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
    } catch (err) {
      console.error(err);
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
            onClick={() => {
              setMobileMenuOpen(false);
              setUserMenuOpen(false);
            }}
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
              className="hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-cw-surface/80 border border-white/10 text-gray-400 hover:text-white hover:border-cw-red/40 hover:bg-cw-surface transition-all duration-200 w-40 lg:w-52 text-left group"
              aria-label="Search movies"
            >
              <Search className="w-4 h-4 text-cw-red group-hover:scale-110 transition-transform" />
              <span className="text-xs text-gray-400 group-hover:text-gray-300 truncate">Search movies...</span>
              <kbd className="hidden lg:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-gray-500 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Surprise Me / Reel Spinner */}
            <button
              onClick={openSurpriseModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cw-surface/80 border border-cw-gold/30 text-cw-gold hover:text-white hover:border-cw-gold hover:bg-cw-gold/15 text-xs font-bold transition-all shadow-sm group"
              title="Surprise Me! Pick a random movie"
            >
              <Dices className="w-3.5 h-3.5 text-cw-gold group-hover:rotate-180 transition-transform duration-500" />
              <span>Surprise Me 🎲</span>
            </button>

            {/* User Watchlist Trigger */}
            <button
              onClick={openWatchlistModal}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cw-surface/80 border border-white/10 text-gray-300 hover:text-white hover:border-cw-red/50 hover:bg-cw-red/10 text-xs font-bold transition-all shadow-sm group"
              title="My Watchlist"
              aria-label="Open Watchlist"
            >
              <Heart className={`w-3.5 h-3.5 transition-colors ${watchlist.length > 0 ? 'text-cw-red fill-cw-red' : 'text-gray-400 group-hover:text-cw-red'}`} />
              <span className="hidden sm:inline">Watchlist</span>
              {watchlist.length > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-cw-red text-white text-[10px] font-black shadow-glow-sm animate-pulse-subtle">
                  {watchlist.length}
                </span>
              )}
            </button>

            {/* Instagram Reels Link */}
            <a
              href="https://www.instagram.com/cinema.wala6746/reels/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-yellow-500/10 border border-pink-500/30 text-pink-300 hover:text-white hover:border-pink-500 hover:from-pink-500/25 hover:to-purple-500/25 text-xs font-bold transition-all shadow-sm group"
              title="Watch CinemaWala on Instagram Reels (@cinema.wala6746)"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400 group-hover:rotate-12 transition-transform" />
              <span>Reels</span>
            </a>

            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              id="mobile-search-btn"
              className="sm:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 text-cw-red" />
            </button>

            {/* Google Authentication (Desktop) */}
            <div className="relative hidden sm:block" ref={userMenuRef}>
              {user ? (
                <div>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cw-gold/40 transition-all duration-200"
                    aria-label="User account menu"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User profile'}
                        className="w-7 h-7 rounded-full object-cover border border-white/20"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cw-red to-cw-gold text-white font-bold text-xs flex items-center justify-center">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-gray-200 max-w-[90px] truncate">
                      {user.displayName ? user.displayName.split(' ')[0] : 'Account'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-cw-card border border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-xl">
                      <div className="p-3 border-b border-white/10">
                        <p className="text-sm font-bold text-white truncate">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                        {isAdmin && (
                          <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-cw-gold/15 border border-cw-gold/30 text-cw-gold text-[10px] font-bold">
                            <Shield className="w-3 h-3" />
                            Admin Verified
                          </span>
                        )}
                      </div>

                      <div className="py-1">
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-white hover:bg-cw-red/20 rounded-xl transition-colors"
                          >
                            <Shield className="w-4 h-4 text-cw-red" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isAuthLoading}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white text-xs font-semibold transition-all duration-200 shadow-sm group"
                  title="Sign in with Google / Gmail"
                >
                  <GoogleIcon />
                  <span className="group-hover:text-white text-gray-200">
                    {isAuthLoading ? 'Connecting...' : 'Sign In'}
                  </span>
                </button>
              )}
            </div>

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
        <div className="md:hidden bg-[#0D0F14]/98 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* User Status Bar in Mobile */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-9 h-9 rounded-full object-cover border border-cw-gold/50"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-cw-red text-white font-bold text-xs flex items-center justify-center">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-xs text-red-400 hover:bg-red-500/15 rounded-lg flex items-center gap-1"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                disabled={isAuthLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold transition-all"
              >
                <GoogleIcon />
                <span>{isAuthLoading ? 'Connecting to Google...' : 'Sign In with Google (Gmail)'}</span>
              </button>
            )}
          </div>

          <div className="pt-1 flex flex-col space-y-1">
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

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-cw-gold bg-cw-gold/10 border border-cw-gold/20"
              >
                <Shield className="w-4 h-4 text-cw-gold" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            {/* Mobile Watchlist & Surprise Me Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWatchlistModal();
                }}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-xs hover:border-cw-red/40"
              >
                <Heart className={`w-4 h-4 ${watchlist.length > 0 ? 'text-cw-red fill-cw-red' : 'text-gray-400'}`} />
                <span>Watchlist ({watchlist.length})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSurpriseModal();
                }}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-cw-gold/15 border border-cw-gold/30 text-cw-gold font-bold text-xs hover:bg-cw-gold/25"
              >
                <Dices className="w-4 h-4" />
                <span>Surprise Me 🎲</span>
              </button>
            </div>

            {/* Official Instagram Reels Link in Mobile */}
            <a
              href="https://www.instagram.com/cinema.wala6746/reels/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-500/15 via-pink-500/15 to-purple-600/15 border border-pink-500/30 text-pink-300 hover:text-white font-bold text-sm shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>Instagram Reels (@cinema.wala6746)</span>
              </div>
              <span className="text-[10px] bg-pink-500/25 px-2 py-0.5 rounded-md text-pink-200 border border-pink-500/40">
                Watch ↗
              </span>
            </a>
          </div>

          <div className="pt-2">
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
