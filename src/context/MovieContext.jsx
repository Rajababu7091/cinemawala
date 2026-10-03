import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredMovies, saveMovies, resetMoviesToDefault, DEFAULT_MOVIES } from '../data/movies';
import { 
  fetchMoviesFromCloud, 
  syncMoviesToCloud, 
  fetchSettingsFromCloud, 
  syncSettingsToCloud,
  DEFAULT_SITE_SETTINGS 
} from '../services/cloudStorage';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState(DEFAULT_MOVIES);
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
    const local = getStoredMovies();
    setMovies(local);
    setIsLoaded(true);

    // Fetch live movies from Firebase Realtime Database
    fetchMoviesFromCloud().then((cloudMovies) => {
      if (cloudMovies && cloudMovies.length > 0) {
        setMovies(cloudMovies);
        saveMovies(cloudMovies);
        setIsCloudSynced(true);
      } else {
        // If cloud database is empty, seed it with current movies (including Saiyaara)
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

  // Find movie by slug or id
  const getMovieBySlug = (slug) => {
    if (!slug) return null;
    return movies.find(m => m.slug.toLowerCase() === slug.toLowerCase()) || 
           movies.find(m => String(m.id) === String(slug));
  };

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
