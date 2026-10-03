import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredMovies, saveMovies, resetMoviesToDefault, DEFAULT_MOVIES } from '../data/movies';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState(DEFAULT_MOVIES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from storage on mount
  useEffect(() => {
    const loaded = getStoredMovies();
    setMovies(loaded);
    setIsLoaded(true);
  }, []);

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
    return movieWithId;
  };

  // Update existing movie
  const updateMovie = (id, updatedFields) => {
    const updated = movies.map(m => (m.id === id ? { ...m, ...updatedFields } : m));
    setMovies(updated);
    saveMovies(updated);
  };

  // Delete movie
  const deleteMovie = (id) => {
    const updated = movies.filter(m => m.id !== id);
    setMovies(updated);
    saveMovies(updated);
  };

  // Reset to default seed data
  const resetToDefault = () => {
    const reset = resetMoviesToDefault();
    setMovies(reset);
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
