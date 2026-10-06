/**
 * CinemaWala Movie Database
 * 
 * EASY MOVIE MANAGEMENT:
 * You can add a new movie by simply adding an object to the DEFAULT_MOVIES array below.
 * 
 * Required schema:
 * {
 *   id: 1,
 *   title: "Movie Title",
 *   slug: "movie-slug-for-url",
 *   year: 2026,
 *   genre: ["Action", "Thriller"],
 *   language: "Hindi",
 *   duration: "2h 15m",
 *   rating: 8.4,
 *   poster: "https://images.unsplash.com/...",
 *   backdrop: "https://images.unsplash.com/...", // optional wide banner
 *   description: "Plot synopsis or memorable reel hook...",
 *   cast: ["Actor 1", "Actor 2", "Actor 3"],
 *   director: "Director Name",
 *   platform: "Netflix", // e.g., Netflix, Prime Video, Disney+ Hotstar, JioCinema, Apple TV
 *   watchUrl: "https://www.netflix.com/title/...", // Official legal streaming or rental link
 *   downloadUrl: "https://...", // Optional direct HD download link (defaults to watchUrl)
 *   trending: true, // true to display in 🔥 Trending Now section
 *   category: ["Bollywood", "Action"] // optional additional tag groupings
 * }
 */

export const CATEGORIES = [
  { id: 'all', label: 'All Movies', icon: '🍿' },
  { id: 'Romance', label: 'Romance', icon: '❤️' },
  { id: 'Action', label: 'Action', icon: '🔥' },
  { id: 'Comedy', label: 'Comedy', icon: '😂' },
  { id: 'Drama', label: 'Drama', icon: '😢' },
  { id: 'Horror', label: 'Horror', icon: '👻' },
  { id: 'Thriller', label: 'Thriller', icon: '🕵️' },
  { id: 'Sci-Fi', label: 'Sci-Fi', icon: '🚀' },
  { id: 'Bollywood', label: 'Bollywood', icon: '🎭' },
  { id: 'Hollywood', label: 'Hollywood', icon: '🌎' },
  { id: 'South Indian', label: 'South Indian', icon: '🇮🇳' },
  { id: 'Web Series', label: 'Web Series', icon: '🎬' },
];

export const DEFAULT_MOVIES = [
  {
    id: 1,
    title: "Saiyaara",
    slug: "saiyaara",
    year: 2025,
    genre: ["Romance", "Drama"],
    language: "Hindi",
    duration: "2h 36m",
    rating: 6.3,
    poster: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1600&auto=format&fit=crop",
    description: "A passionate musical romantic drama following a singer-songwriter duo navigating devotion, heartbreak, and emotional memory amidst breathtaking landscapes.",
    cast: ["Ahaan Panday", "Aneet Padda"],
    director: "Mohit Suri",
    platform: "Official Platform",
    watchUrl: "https://www.netflix.com",
    trending: true,
    category: ["Bollywood", "Romance", "Drama"]
  },
  {
    id: 2,
    title: "Vanguard: The Crimson Sky",
    slug: "vanguard-crimson-sky",
    year: 2026,
    genre: ["Action", "Sci-Fi", "Thriller"],
    language: "Hindi",
    duration: "2h 28m",
    rating: 8.8,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
    description: "In a neon-drenched metropolis under martial rule, an elite tactical pilot discovers a covert broadcast that exposes the shadow controllers of the energy grid.",
    cast: ["Vikram Malhotra", "Tara Sutaria", "Arjun Rampal"],
    director: "Kabir Anand",
    platform: "Prime Video",
    watchUrl: "https://www.primevideo.com",
    trending: true,
    category: ["Bollywood", "Action", "Sci-Fi"]
  },
  {
    id: 13,
    title: "Dhoop Chhaon",
    slug: "dhoop-chhaon",
    year: 2025,
    genre: ["Romance", "Drama"],
    language: "Hindi",
    duration: "2h 14m",
    rating: 8.5,
    poster: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1600&auto=format&fit=crop",
    description: "Two childhood companions reunite by chance in old Lucknow during the monsoon season. Through unspoken words and shared poetry, they confront what might have been and what destiny demands.",
    cast: ["Ishaan Khatter", "Mrunal Thakur", "Pankaj Tripathi"],
    director: "Zoya Akhtar",
    platform: "Netflix",
    watchUrl: "https://www.netflix.com",
    trending: true,
    category: ["Bollywood", "Romance", "Drama"]
  },
  {
    id: 3,
    title: "Shadows of Wayanad",
    slug: "shadows-of-wayanad",
    year: 2026,
    genre: ["Thriller", "Drama"],
    language: "Malayalam",
    duration: "2h 08m",
    rating: 8.9,
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
    description: "When an encrypted diary surfaces in an abandoned tea estate in the misty Western Ghats, a retired wildlife inspector unravels a decades-old corporate conspiracy disguised as folklore.",
    cast: ["Fahadh Faasil", "Parvathy Thiruvothu", "Joju George"],
    director: "Dileesh Pothan",
    platform: "SonyLIV",
    watchUrl: "https://www.sonyliv.com",
    trending: true,
    category: ["South Indian", "Thriller", "Drama"]
  },
  {
    id: 4,
    title: "Neon Odyssey: Horizon",
    slug: "neon-odyssey-horizon",
    year: 2025,
    genre: ["Sci-Fi", "Action"],
    language: "English",
    duration: "2h 35m",
    rating: 8.7,
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop",
    description: "Deep space salvage operators intercept an automated freighter drifting from beyond the Kuiper belt, only to discover an artificial intelligence with memories of human civilization's forgotten origins.",
    cast: ["Alexander Skarsgård", "Gemma Chan", "Hiroyuki Sanada"],
    director: "Denis Villeneuve",
    platform: "Apple TV",
    watchUrl: "https://tv.apple.com",
    trending: true,
    category: ["Hollywood", "Sci-Fi", "Action"]
  },
  {
    id: 5,
    title: "Gully Ka Raja",
    slug: "gully-ka-raja",
    year: 2025,
    genre: ["Comedy", "Drama"],
    language: "Hindi",
    duration: "1h 55m",
    rating: 8.1,
    poster: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=1600&auto=format&fit=crop",
    description: "An eccentric wedding videographer in Delhi mistakenly gets hold of an underground cricket bookie's secret ledger, turning a chaotic Punjabi wedding into a hilarious game of cat and mouse.",
    cast: ["Rajkummar Rao", "Sanya Malhotra", "Vijay Raaz"],
    director: "Amar Kaushik",
    platform: "JioCinema",
    watchUrl: "https://www.jiocinema.com",
    trending: false,
    category: ["Bollywood", "Comedy"]
  },
  {
    id: 6,
    title: "Chola Chronicles: The Blood Lineage",
    slug: "chola-chronicles-blood-lineage",
    year: 2026,
    genre: ["Action", "Drama"],
    language: "Tamil",
    duration: "2h 45m",
    rating: 9.1,
    poster: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1600&auto=format&fit=crop",
    description: "A sweeping naval saga tracking an exiled commander tasked with defending the Indian ocean maritime trade routes against mysterious mercenaries during the 11th century golden age.",
    cast: ["Karthi", "Vikram Prabhu", "Aishwarya Lekshmi"],
    director: "Mani Ratnam",
    platform: "Disney+ Hotstar",
    watchUrl: "https://www.hotstar.com",
    trending: true,
    category: ["South Indian", "Action", "Drama"]
  },
  {
    id: 7,
    title: "Whispers in the Dark",
    slug: "whispers-in-the-dark",
    year: 2025,
    genre: ["Horror", "Thriller"],
    language: "English",
    duration: "1h 48m",
    rating: 7.9,
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1600&auto=format&fit=crop",
    description: "A sound designer restoring vintage analog recordings from a sealed 19th-century asylum realizes the ambient noise in the tapes is responding to her presence in real-time.",
    cast: ["Mia Goth", "Bill Skarsgård", "David Thewlis"],
    director: "Guillermo del Toro",
    platform: "Netflix",
    watchUrl: "https://www.netflix.com",
    trending: false,
    category: ["Hollywood", "Horror", "Thriller"]
  },
  {
    id: 8,
    title: "Mirage 2049",
    slug: "mirage-2049",
    year: 2026,
    genre: ["Sci-Fi", "Thriller"],
    language: "Hindi",
    duration: "2h 18m",
    rating: 8.6,
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop",
    description: "When synthetic memory implants become the newest black-market narcotic in future Mumbai, a memory detective must solve a homicide where the only witness possesses memories that belong to three different victims.",
    cast: ["Vicky Kaushal", "Radhika Apte", "Nawazuddin Siddiqui"],
    director: "Anurag Kashyap",
    platform: "Prime Video",
    watchUrl: "https://www.primevideo.com",
    trending: true,
    category: ["Bollywood", "Sci-Fi", "Thriller"]
  },
  {
    id: 9,
    title: "Delhi Syndicate",
    slug: "delhi-syndicate",
    type: "series",
    year: 2026,
    genre: ["Web Series", "Action", "Thriller"],
    language: "Hindi",
    duration: "2 Seasons • 16 Episodes",
    rating: 9.0,
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1600&auto=format&fit=crop",
    description: "A gritty geopolitical crime thriller delving into the cut-throat underworld of high-stakes real estate, cyber intelligence, and political leverage across the National Capital Region.",
    cast: ["Manoj Bajpayee", "Kay Kay Menon", "Jaideep Ahlawat"],
    director: "Raj & DK",
    platform: "Netflix",
    watchUrl: "https://www.netflix.com",
    trending: true,
    category: ["Web Series", "Bollywood", "Thriller"],
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1: Rise of the Syndicate",
        year: 2025,
        poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=900&auto=format&fit=crop",
        downloadUrl: "https://www.netflix.com",
        downloadUrl1080p: "https://www.netflix.com",
        episodes: [
          { episodeNumber: 1, title: "The Capital Nexus", duration: "48m", downloadUrl: "https://www.netflix.com" },
          { episodeNumber: 2, title: "Shadow Deals", duration: "52m", downloadUrl: "https://www.netflix.com" },
          { episodeNumber: 3, title: "Wiretap Protocol", duration: "45m", downloadUrl: "https://www.netflix.com" },
          { episodeNumber: 4, title: "Checkmate at Midnight", duration: "56m", downloadUrl: "https://www.netflix.com" },
        ]
      },
      {
        seasonNumber: 2,
        title: "Season 2: Empire in Ashes",
        year: 2026,
        poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop",
        downloadUrl: "https://www.netflix.com",
        downloadUrl1080p: "https://www.netflix.com",
        episodes: [
          { episodeNumber: 1, title: "New Alliances", duration: "50m", downloadUrl: "https://www.netflix.com" },
          { episodeNumber: 2, title: "Underground Vault", duration: "49m", downloadUrl: "https://www.netflix.com" },
          { episodeNumber: 3, title: "Betrayal in Lutyens", duration: "54m", downloadUrl: "https://www.netflix.com" },
          { episodeNumber: 4, title: "The Final Reckoning", duration: "58m", downloadUrl: "https://www.netflix.com" },
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Devara: Roar of the Waves",
    slug: "devara-roar-of-the-waves",
    year: 2025,
    genre: ["Action", "Drama"],
    language: "Telugu",
    duration: "2h 40m",
    rating: 8.4,
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    description: "Set against the rugged coastal lands, a fearless guardian of the coastline sacrifices everything to protect his clan from encroaching seafaring syndicates and betrayals from within.",
    cast: ["N.T. Rama Rao Jr.", "Janhvi Kapoor", "Saif Ali Khan"],
    director: "Koratala Siva",
    platform: "Netflix",
    watchUrl: "https://www.netflix.com",
    trending: true,
    category: ["South Indian", "Action"]
  },
  {
    id: 11,
    title: "The Parisian Note",
    slug: "the-parisian-note",
    year: 2025,
    genre: ["Romance", "Comedy"],
    language: "English",
    duration: "1h 50m",
    rating: 7.8,
    poster: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    description: "An American jazz pianist stranded in Paris after missing his European tour finds romance with an elusive vinyl collector who communicates exclusively through vintage 45 RPM records.",
    cast: ["Timothée Chalamet", "Léa Seydoux", "Daniel Brühl"],
    director: "Richard Linklater",
    platform: "Apple TV",
    watchUrl: "https://tv.apple.com",
    trending: false,
    category: ["Hollywood", "Romance", "Comedy"]
  },
  {
    id: 12,
    title: "Kantara: Legend Within",
    slug: "kantara-legend-within",
    year: 2026,
    genre: ["Action", "Drama", "Thriller"],
    language: "Kannada",
    duration: "2h 30m",
    rating: 9.2,
    poster: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=900&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop",
    description: "An ancient tribal belief comes alive in the sacred forests of coastal Karnataka as traditional folklore collides with modern greed in a mesmerizing battle of faith and nature.",
    cast: ["Rishab Shetty", "Sapthami Gowda", "Achyuth Kumar"],
    director: "Rishab Shetty",
    platform: "Prime Video",
    watchUrl: "https://www.primevideo.com",
    trending: true,
    category: ["South Indian", "Action", "Drama"]
  }
];

const STORAGE_KEY = 'cinemawala_movies_v3';

/**
 * Get all movies from localStorage, falling back to DEFAULT_MOVIES
 */
export function getStoredMovies() {
  if (typeof window === 'undefined') return DEFAULT_MOVIES;
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    if (!item) {
      const v2Item = window.localStorage.getItem('cinemawala_movies_v2');
      if (v2Item) {
        try {
          const parsedV2 = JSON.parse(v2Item);
          if (Array.isArray(parsedV2) && parsedV2.length > 0) {
            const defaultIds = new Set(DEFAULT_MOVIES.map(m => m.id));
            const customMovies = parsedV2.filter(m => !defaultIds.has(m.id));
            const merged = [...DEFAULT_MOVIES, ...customMovies];
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return merged;
          }
        } catch {}
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MOVIES));
      return DEFAULT_MOVIES;
    }
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MOVIES;
  } catch (e) {
    console.error("Failed to load movies from localStorage:", e);
    return DEFAULT_MOVIES;
  }
}

/**
 * Save movies list to localStorage
 */
export function saveMovies(movies) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (e) {
    console.error("Failed to save movies to localStorage:", e);
  }
}

/**
 * Reset movie list back to original defaults
 */
export function resetMoviesToDefault() {
  if (typeof window === 'undefined') return DEFAULT_MOVIES;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MOVIES));
    return DEFAULT_MOVIES;
  } catch (e) {
    console.error("Failed to reset movies:", e);
    return DEFAULT_MOVIES;
  }
}

/**
 * Slugify a movie title
 */
export function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
