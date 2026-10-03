/**
 * CinemaWala Cloud Storage Service
 * Connects to Google Firebase Realtime Database
 */

export const FIREBASE_DB_URL = 'https://cinemawala-2cd35-default-rtdb.firebaseio.com';

/**
 * Fetch all movies from Firebase Cloud Database
 */
export async function fetchMoviesFromCloud() {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/movies.json`);
    if (!res.ok) {
      console.warn(`Cloud fetch returned status ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    // If it's an object with keys (Firebase array format sometimes)
    if (data && typeof data === 'object') {
      const list = Object.values(data).filter(Boolean);
      if (list.length > 0) return list;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch from Firebase cloud database, using local cache:', err);
    return null;
  }
}

/**
 * Save movies list to Firebase Cloud Database
 */
export async function syncMoviesToCloud(moviesList) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/movies.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moviesList),
    });
    if (!res.ok) {
      console.error('Failed to sync movies to cloud:', res.statusText);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving movies to Firebase cloud:', err);
    return false;
  }
}
