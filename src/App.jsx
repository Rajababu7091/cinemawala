import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import TrailerModal from './components/TrailerModal';
import WatchlistModal from './components/WatchlistModal';
import SurpriseMeModal from './components/SurpriseMeModal';

// Pages
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import WebSeriesPage from './pages/WebSeriesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import InstagramReelPage from './pages/InstagramReelPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0A0B0E] text-cw-light font-sans selection:bg-cw-red selection:text-white">
          
          {/* Top Sticky Navbar */}
          <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

          {/* Interactive Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />

          {/* In-App HD Trailer Player Modal */}
          <TrailerModal />

          {/* User Watchlist Modal */}
          <WatchlistModal />

          {/* Surprise Me / Random Movie Picker Modal */}
          <SurpriseMeModal />

          {/* Main App Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/series" element={<WebSeriesPage />} />
              <Route path="/series/:movieSlug" element={<MovieDetailsPage />} />
              <Route path="/movie/:movieSlug" element={<MovieDetailsPage />} />
              <Route path="/watch/:movieSlug" element={<InstagramReelPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Site Footer */}
          <Footer />
        </div>
      </Router>
    </MovieProvider>
  </AuthProvider>
  );
}
