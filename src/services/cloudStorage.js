/**
 * CinemaWala Cloud Storage Service
 * Connects to Google Firebase Realtime Database
 */

export const FIREBASE_DB_URL = 'https://cinemawala-2cd35-default-rtdb.firebaseio.com';

export const DEFAULT_SITE_SETTINGS = {
  heroTagline: 'Cinema ka asli adda 🍿 • 100% Legal Streaming Guide',
  heroHeading: 'Your Daily Dose of Cinema 🎬',
  heroSubtitle: 'Discover memorable movie moments, stories and where to watch them.',
  heroWallpaper: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop',
};

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

/**
 * Fetch site settings from Firebase
 */
export async function fetchSettingsFromCloud() {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/settings.json`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      return { ...DEFAULT_SITE_SETTINGS, ...data };
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch settings from cloud:', err);
    return null;
  }
}

/**
 * Sync site settings to Firebase
 */
export async function syncSettingsToCloud(settings) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/settings.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    return res.ok;
  } catch (err) {
    console.error('Error saving settings to cloud:', err);
    return false;
  }
}

/**
 * Compress an uploaded user image file to optimized WebP/JPEG base64 data URL
 */
export function compressImageFile(file, maxWidth = 1000, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
