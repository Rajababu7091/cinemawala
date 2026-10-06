import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredMovies, saveMovies, resetMoviesToDefault, DEFAULT_MOVIES, createSlug } from '../data/movies';
import { 
  fetchMoviesFromCloud, 
  syncMoviesToCloud, 
  fetchSettingsFromCloud, 
  syncSettingsToCloud,
  DEFAULT_SITE_SETTINGS 
} from '../services/cloudStorage';

const MovieContext = createContext();

export const normalizeMovies = (list) => {
  if (!Array.isArray(list)) return DEFAULT_MOVIES;
  return list.map((m, idx) => ({
    ...m,
    id: m.id || idx + 1,
    title: m.title || 'Untitled Movie',
    slug: m.slug || createSlug(m.title || `movie-${m.id || idx + 1}`),
    genre: Array.isArray(m.genre) ? m.genre : (m.genre ? String(m.genre).split(',').map(s => s.trim()).filter(Boolean) : ['Drama']),
    language: m.language || 'Hindi',
    rating: parseFloat(m.rating) || 8.0,
    poster: m.poster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
    backdrop: m.backdrop || m.poster,
    category: Array.isArray(m.category) ? m.category : (m.category ? [m.category] : []),
  }));
};

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState(() => normalizeMovies(getStoredMovies()));
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // Site Settings (Hero heading, tagline, subtitle, hero wallpaper)
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('cinemawala_site_settings');
      return stored ? { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  // Initialize from storage and sync with Firebase Cloud Database
  useEffect(() => {
    const local = normalizeMovies(getStoredMovies());
    setMovies(local);
    setIsLoaded(true);

    // Fetch live movies from Firebase Realtime Database
    fetchMoviesFromCloud().then((cloudMovies) => {
      if (cloudMovies && cloudMovies.length > 0) {
        const normalized = normalizeMovies(cloudMovies);
        setMovies(normalized);
        saveMovies(normalized);
        setIsCloudSynced(true);
      } else {
        syncMoviesToCloud(local).then((ok) => {
          if (ok) setIsCloudSynced(true);
        });
      }
    });

    // Fetch live site settings from Firebase
    fetchSettingsFromCloud().then((cloudSettings) => {
      if (cloudSettings) {
        setSiteSettings(cloudSettings);
        try {
          localStorage.setItem('cinemawala_site_settings', JSON.stringify(cloudSettings));
        } catch {}
      }
    });
  }, []);

  // Update site settings
  const updateSiteSettings = (newSettings) => {
    const merged = { ...siteSettings, ...newSettings };
    setSiteSettings(merged);
    try {
      localStorage.setItem('cinemawala_site_settings', JSON.stringify(merged));
    } catch {}
    syncSettingsToCloud(merged);
    return merged;
  };

  // Add a new movie
  const addMovie = (newMovieData) => {
    const nextId = movies.length > 0 ? Math.max(...movies.map(m => Number(m.id) || 0)) + 1 : 1;
    const movieWithId = {
      ...newMovieData,
      id: nextId,
    };
    const updated = [movieWithId, ...movies];
    setMovies(updated);
    saveMovies(updated);
    syncMoviesToCloud(updated); // Sync to Firebase Cloud
    return movieWithId;
  };

  // Update existing movie
  const updateMovie = (id, updatedFields) => {
    const updated = movies.map(m => (String(m.id) === String(id) ? { ...m, ...updatedFields } : m));
    setMovies(updated);
    saveMovies(updated);
    syncMoviesToCloud(updated); // Sync to Firebase Cloud
  };

  // Delete movie
  const deleteMovie = (id) => {
    const updated = movies.filter(m => String(m.id) !== String(id));
    setMovies(updated);
    saveMovies(updated);
    syncMoviesToCloud(updated); // Sync to Firebase Cloud
  };

  // Reset to default seed data
  const resetToDefault = () => {
    const reset = resetMoviesToDefault();
    setMovies(reset);
    syncMoviesToCloud(reset); // Sync to Firebase Cloud
  };

  // Find movie by slug or id safely
  const getMovieBySlug = (slug) => {
    if (!slug) return null;
    const target = String(slug).trim().toLowerCase();
    return movies.find(m => String(m.slug || '').trim().toLowerCase() === target) || 
           movies.find(m => String(m.id || '').trim() === target) ||
           movies.find(m => createSlug(m.title || '') === target);
  };

  // Watchlist State (persisted in localStorage)
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem('cinemawala_watchlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleWatchlist = (movieId) => {
    const idStr = String(movieId);
    setWatchlist((prev) => {
      const updated = prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr];
      try {
        localStorage.setItem('cinemawala_watchlist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isInWatchlist = (movieId) => {
    return watchlist.includes(String(movieId));
  };

  // Trailer Modal State
  const [activeTrailerMovie, setActiveTrailerMovie] = useState(null);
  const openTrailer = (movie) => setActiveTrailerMovie(movie);
  const closeTrailer = () => setActiveTrailerMovie(null);

  // Surprise Me Modal State
  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState(false);
  const openSurpriseModal = () => setIsSurpriseModalOpen(true);
  const closeSurpriseModal = () => setIsSurpriseModalOpen(false);

  // Watchlist Modal / Drawer State
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
  const openWatchlistModal = () => setIsWatchlistModalOpen(true);
  const closeWatchlistModal = () => setIsWatchlistModalOpen(false);

  return (
    <MovieContext.Provider
      value={{
        movies,
        isLoaded,
        isCloudSynced,
        siteSettings,
        updateSiteSettings,
        addMovie,
        updateMovie,
        deleteMovie,
        resetToDefault,
        getMovieBySlug,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        activeTrailerMovie,
        openTrailer,
        closeTrailer,
        isSurpriseModalOpen,
        openSurpriseModal,
        closeSurpriseModal,
        isWatchlistModalOpen,
        openWatchlistModal,
        closeWatchlistModal,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
}
