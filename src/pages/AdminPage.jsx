import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, ExternalLink, RefreshCw, Check, 
  AlertTriangle, Shield, Search, Film, X, Save, Eye 
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { createSlug } from '../data/movies';
import SEO from '../components/SEO';

export default function AdminPage() {
  const { movies, addMovie, updateMovie, deleteMovie, resetToDefault } = useMovies();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Form State
  const initialForm = {
    title: '',
    slug: '',
    year: 2026,
    genre: 'Action, Thriller',
    language: 'Hindi',
    duration: '2h 10m',
    rating: 8.0,
    poster: '',
    backdrop: '',
    description: '',
    cast: 'Actor One, Actor Two',
    director: 'Director Name',
    platform: 'Netflix',
    watchUrl: 'https://www.netflix.com',
    trending: false,
  };
  const [formData, setFormData] = useState(initialForm);

  const showNotification = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleOpenAdd = () => {
    setEditingMovie(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title || '',
      slug: movie.slug || '',
      year: movie.year || 2026,
      genre: Array.isArray(movie.genre) ? movie.genre.join(', ') : (movie.genre || ''),
      language: movie.language || 'Hindi',
      duration: movie.duration || '',
      rating: movie.rating || 8.0,
      poster: movie.poster || '',
      backdrop: movie.backdrop || '',
      description: movie.description || '',
      cast: Array.isArray(movie.cast) ? movie.cast.join(', ') : (movie.cast || ''),
      director: movie.director || '',
      platform: movie.platform || 'Netflix',
      watchUrl: movie.watchUrl || '',
      trending: Boolean(movie.trending),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide a movie title');
      return;
    }

    const formattedMovie = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || createSlug(formData.title),
      year: Number(formData.year) || 2026,
      genre: formData.genre.split(',').map(s => s.trim()).filter(Boolean),
      language: formData.language.trim() || 'Hindi',
      duration: formData.duration.trim() || '2h',
      rating: parseFloat(formData.rating) || 8.0,
      poster: formData.poster.trim() || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
      backdrop: formData.backdrop.trim() || formData.poster.trim(),
      description: formData.description.trim() || 'A captivating cinematic experience discovered on CinemaWala.',
      cast: formData.cast.split(',').map(s => s.trim()).filter(Boolean),
      director: formData.director.trim() || 'CinemaWala Director',
      platform: formData.platform.trim() || 'Official Platform',
      watchUrl: formData.watchUrl.trim() || 'https://www.netflix.com',
      trending: formData.trending,
    };

    if (editingMovie) {
      updateMovie(editingMovie.id, formattedMovie);
      showNotification(`Updated "${formattedMovie.title}" successfully!`);
    } else {
      addMovie(formattedMovie);
      showNotification(`Added "${formattedMovie.title}" to catalog!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteMovie(id);
    setDeleteConfirmId(null);
    showNotification('Movie removed from catalog.');
  };

  const handleReset = () => {
    if (window.confirm('Reset all catalog data back to default demo movies? Custom additions will be replaced.')) {
      resetToDefault();
      showNotification('Catalog reset to initial sample movies.');
    }
  };

  // Filter movies in admin table
  const filtered = movies.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.language?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(m.genre) && m.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO 
        title="Admin Catalog Management"
        description="CinemaWala demo management dashboard for movies, official watch URLs, and metadata."
      />

      {/* Top Banner: Protected Mockup Warning */}
      <div className="p-4 rounded-2xl bg-cw-card border border-cw-red/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cw-red/10 border border-cw-red/40 flex items-center justify-center text-cw-red flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white">CinemaWala Management Console</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cw-gold/20 text-cw-gold border border-cw-gold/30">
                Demo Mode (LocalStorage)
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Manage discovery items, edit official streaming destinations, or seed new reel movies.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10 transition-colors"
            title="Reset catalog back to initial movies"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cw-red hover:bg-cw-red-dark text-white text-xs font-bold shadow-glow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Movie</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search catalog by title, genre..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-cw-card text-white text-sm border border-white/10 focus:border-cw-red focus:outline-none"
          />
        </div>

        <div className="text-xs text-gray-400">
          Total active titles: <strong className="text-white">{movies.length}</strong>
        </div>
      </div>

      {/* Table of Movies */}
      <div className="rounded-2xl bg-cw-card border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cw-surface/90 text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Movie</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Details</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Rating</th>
                <th className="py-3.5 px-4">Official Watch Link</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filtered.map((movie) => (
                <tr key={movie.id} className="hover:bg-cw-surface/50 transition-colors">
                  {/* Poster & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-10 h-14 object-cover rounded-lg bg-cw-surface flex-shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200&auto=format&fit=crop';
                        }}
                      />
                      <div>
                        <span className="font-bold text-white block">
                          {movie.title}
                        </span>
                        <span className="text-xs text-gray-400">
                          {movie.year} • {movie.language}
                        </span>
                        {movie.trending && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-cw-red/20 text-cw-red text-[10px] font-bold">
                            Trending
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Details */}
                  <td className="py-3 px-4 hidden md:table-cell text-xs">
                    <div className="text-gray-300 font-medium">
                      {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                    </div>
                    <div className="text-gray-500 mt-0.5">
                      Dir: {movie.director || 'N/A'}
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-cw-gold">
                      ⭐ {movie.rating}
                    </span>
                  </td>

                  {/* Watch Link */}
                  <td className="py-3 px-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white">
                        {movie.platform || 'Partner'}
                      </span>
                      <a
                        href={movie.watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cw-red hover:underline inline-flex items-center gap-0.5"
                        title={movie.watchUrl}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        to={`/movie/${movie.slug || movie.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                        title="Preview Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleOpenEdit(movie)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-cw-gold hover:bg-white/10"
                        title="Edit Movie"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {deleteConfirmId === movie.id ? (
                        <div className="inline-flex items-center gap-1 ml-1 bg-red-950/80 px-2 py-1 rounded-lg border border-red-500/50">
                          <span className="text-[11px] text-red-200">Delete?</span>
                          <button
                            onClick={() => handleDelete(movie.id)}
                            className="text-xs font-bold text-red-400 hover:underline px-1"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-xs text-gray-400 hover:text-white px-1"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(movie.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white/10"
                          title="Delete Movie"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-cw-card border border-white/15 rounded-2xl shadow-2xl p-6 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-cw-red" />
                <h3 className="text-xl font-bold text-white">
                  {editingMovie ? 'Edit Movie Details' : 'Add New Movie to CinemaWala'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Movie Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Stree 2"
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Slug (URL friendly) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    URL Slug (e.g. /watch/movie-slug)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Auto-generated if blank"
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Release Year */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Release Year
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Language
                  </label>
                  <input
                    type="text"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    placeholder="Hindi, English, Telugu..."
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 2h 15m"
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Rating (out of 10)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Platform Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Official Streaming Platform
                  </label>
                  <input
                    type="text"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    placeholder="Netflix, Prime Video, Hotstar, JioCinema..."
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Official Watch URL */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Official Watch / Digital Rental URL * (No Piracy!)
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.watchUrl}
                    onChange={(e) => setFormData({ ...formData, watchUrl: e.target.value })}
                    placeholder="https://www.primevideo.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Poster URL */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Poster Image URL (Unsplash or licensed CDN)
                  </label>
                  <input
                    type="url"
                    value={formData.poster}
                    onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Genres */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Genres (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    placeholder="Action, Romance, Comedy, Thriller, Sci-Fi..."
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Cast */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Cast (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.cast}
                    onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
                    placeholder="Actor One, Actor Two, Actor Three"
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Director */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Director
                  </label>
                  <input
                    type="text"
                    value={formData.director}
                    onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                    placeholder="Director Name"
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Movie Description & Instagram Reel Hook
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter movie synopsis or the gripping scene hook..."
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none"
                  />
                </div>

                {/* Trending Checkbox */}
                <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="trending-check"
                    checked={formData.trending}
                    onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                    className="w-4 h-4 rounded text-cw-red focus:ring-cw-red bg-cw-surface border-white/20"
                  />
                  <label htmlFor="trending-check" className="text-xs font-medium text-gray-200">
                    Feature in "🔥 Trending Now" section on Homepage
                  </label>
                </div>

              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cw-red hover:bg-cw-red-dark text-white text-xs font-bold shadow-glow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingMovie ? 'Save Changes' : 'Create Movie'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
