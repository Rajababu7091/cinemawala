import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Edit2, Trash2, ExternalLink, RefreshCw, Check,
  AlertTriangle, Shield, Search, Film, X, Save, Eye,
  Lock, Unlock, Key, LogOut, EyeOff, ShieldCheck, ArrowRight, ArrowLeft,
  Upload, Palette, Image as ImageIcon
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { compressImageFile, fetchAdminPasscodeFromCloud, syncAdminPasscodeToCloud } from '../services/cloudStorage';
import { useAuth, ADMIN_EMAILS } from '../context/AuthContext';
import SEO from '../components/SEO';

const DEFAULT_PASSCODE = 'cinemawala7091';

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

export default function AdminPage() {
  const {
    movies,
    isCloudSynced,
    siteSettings,
    updateSiteSettings,
    addMovie,
    updateMovie,
    deleteMovie,
    resetToDefault
  } = useMovies();

  // Authentication State
  const { user, isAdmin, loginWithGoogle } = useAuth();
  const [isGoogleLoggingIn, setIsGoogleLoggingIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('cinemawala_admin_auth') === 'true' ||
      localStorage.getItem('cinemawala_admin_auth') === 'true';
  });
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [authError, setAuthError] = useState('');

  // Change Passcode Modal State
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passChangeError, setPassChangeError] = useState('');

  // Homepage Settings Modal State
  const [isSiteSettingsModalOpen, setIsSiteSettingsModalOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    heroHeading: '',
    heroTagline: '',
    heroSubtitle: '',
    heroWallpaper: '',
  });
  const [isUploadingWallpaper, setIsUploadingWallpaper] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);
  const [isUploadingBackdrop, setIsUploadingBackdrop] = useState(false);

  // Sync settingsForm with siteSettings when opened
  useEffect(() => {
    if (siteSettings) {
      setSettingsForm({
        heroHeading: siteSettings.heroHeading || 'Your Daily Dose of Cinema 🎬',
        heroTagline: siteSettings.heroTagline || 'Cinema ka asli adda 🍿 • 100% Legal Streaming Guide',
        heroSubtitle: siteSettings.heroSubtitle || 'Discover memorable movie moments, stories and where to watch them.',
        heroWallpaper: siteSettings.heroWallpaper || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop',
      });
    }
  }, [siteSettings]);

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
    downloadUrl: '',
    downloadUrl720p: '',
    downloadUrl1080p: '',
    downloadUrl4k: '',
    cdn2Url: '',
    trailerUrl: '',
    trending: false,
  };
  const [formData, setFormData] = useState(initialForm);

  const showNotification = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const [cloudMasterPass, setCloudMasterPass] = useState('');

  // Fetch cloud master passcode from Firebase on mount
  useEffect(() => {
    fetchAdminPasscodeFromCloud().then((cloudPass) => {
      if (cloudPass) {
        setCloudMasterPass(cloudPass);
        try {
          localStorage.setItem('cinemawala_admin_passcode', cloudPass);
        } catch { }
      }
    });
  }, []);

  const getStoredPasscode = () => {
    return cloudMasterPass || localStorage.getItem('cinemawala_admin_passcode') || DEFAULT_PASSCODE;
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    let correctPass = getStoredPasscode();
    if (passcodeAttempt.trim() !== correctPass) {
      const freshCloudPass = await fetchAdminPasscodeFromCloud();
      if (freshCloudPass) {
        correctPass = freshCloudPass;
        setCloudMasterPass(freshCloudPass);
      }
    }

    if (passcodeAttempt.trim() === correctPass) {
      setIsAuthenticated(true);
      setAuthError('');
      if (rememberDevice) {
        localStorage.setItem('cinemawala_admin_auth', 'true');
      } else {
        sessionStorage.setItem('cinemawala_admin_auth', 'true');
      }
      showNotification('Access granted. Welcome to CinemaWala Admin!');
    } else {
      setAuthError('Incorrect passcode. Please verify and try again.');
    }
  };

  const handleGoogleAdminLogin = async () => {
    setIsGoogleLoggingIn(true);
    setAuthError('');
    try {
      const res = await loginWithGoogle();
      if (res.success && res.user) {
        const email = (res.user.email || '').toLowerCase();
        const isAllowedAdmin = ADMIN_EMAILS.some(a => a.toLowerCase() === email);
        if (isAllowedAdmin) {
          setIsAuthenticated(true);
          if (rememberDevice) {
            localStorage.setItem('cinemawala_admin_auth', 'true');
          } else {
            sessionStorage.setItem('cinemawala_admin_auth', 'true');
          }
          showNotification(`Access granted. Welcome, ${res.user.displayName || 'Admin'}!`);
        } else {
          setAuthError(`Access Denied: ${res.user.email} is not registered as an administrator.`);
        }
      } else if (res.error) {
        setAuthError(`Google Sign-In failed: ${res.error}`);
      }
    } catch (err) {
      setAuthError('Google Sign-In failed. Please try again.');
    } finally {
      setIsGoogleLoggingIn(false);
    }
  };

  const handleQuickUnlockAsAdmin = () => {
    setIsAuthenticated(true);
    if (rememberDevice) {
      localStorage.setItem('cinemawala_admin_auth', 'true');
    } else {
      sessionStorage.setItem('cinemawala_admin_auth', 'true');
    }
    showNotification(`Welcome back, ${user?.displayName || 'Admin'}!`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cinemawala_admin_auth');
    localStorage.removeItem('cinemawala_admin_auth');
    setPasscodeAttempt('');
    setAuthError('');
  };

  const handleChangePasscode = async (e) => {
    e.preventDefault();
    const currentPass = getStoredPasscode();
    if (oldPass !== currentPass) {
      setPassChangeError('Current passcode is incorrect.');
      return;
    }
    if (newPass.length < 6) {
      setPassChangeError('New passcode must be at least 6 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassChangeError('New passcodes do not match.');
      return;
    }
    localStorage.setItem('cinemawala_admin_passcode', newPass);
    setCloudMasterPass(newPass);
    syncAdminPasscodeToCloud(newPass); // Sync to Firebase Cloud across all browsers!
    setIsChangePassModalOpen(false);
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
    setPassChangeError('');
    showNotification('Admin passcode updated & synced to Cloud across all browsers!');
  };

  const handlePosterUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingPoster(true);
      const dataUrl = await compressImageFile(file, 800, 0.85);
      setFormData(prev => ({ ...prev, poster: dataUrl }));
      showNotification('Custom poster photo attached!');
    } catch (err) {
      alert('Could not process photo: ' + err.message);
    } finally {
      setIsUploadingPoster(false);
    }
  };

  const handleBackdropUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingBackdrop(true);
      const dataUrl = await compressImageFile(file, 1200, 0.85);
      setFormData(prev => ({ ...prev, backdrop: dataUrl }));
      showNotification('Custom backdrop photo attached!');
    } catch (err) {
      alert('Could not process photo: ' + err.message);
    } finally {
      setIsUploadingBackdrop(false);
    }
  };

  const handleWallpaperUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingWallpaper(true);
      const dataUrl = await compressImageFile(file, 1400, 0.85);
      setSettingsForm(prev => ({ ...prev, heroWallpaper: dataUrl }));
      showNotification('Custom wallpaper photo ready!');
    } catch (err) {
      alert('Could not process photo: ' + err.message);
    } finally {
      setIsUploadingWallpaper(false);
    }
  };

  const handleSaveSiteSettings = (e) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    setIsSiteSettingsModalOpen(false);
    showNotification('Homepage text & wallpaper updated & synced to Cloud!');
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
      downloadUrl: movie.downloadUrl || '',
      downloadUrl720p: movie.downloadUrl720p || '',
      downloadUrl1080p: movie.downloadUrl1080p || '',
      downloadUrl4k: movie.downloadUrl4k || '',
      cdn2Url: movie.cdn2Url || '',
      trailerUrl: movie.trailerUrl || movie.trailer || '',
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
      downloadUrl: (formData.downloadUrl || '').trim(),
      downloadUrl720p: (formData.downloadUrl720p || '').trim(),
      downloadUrl1080p: (formData.downloadUrl1080p || '').trim(),
      downloadUrl4k: (formData.downloadUrl4k || '').trim(),
      cdn2Url: (formData.cdn2Url || '').trim(),
      trailerUrl: (formData.trailerUrl || '').trim(),
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

  // If not authenticated, render the secure Admin Passcode Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <SEO
          title="Admin Verification | CinemaWala"
          description="Protected management portal. Authorized administrator login required."
        />

        <div className="w-full max-w-md bg-cw-card/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-fadeIn">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cw-red/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cw-gold/10 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Header */}
          <div className="text-center space-y-3 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cw-red/10 border border-cw-red/30 shadow-glow-sm text-cw-red mb-1">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cw-red/20 text-cw-red border border-cw-red/30 uppercase tracking-wider">
                Restricted Access
              </span>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Cinema<span className="text-cw-red">Wala</span> Admin
              </h1>
              <p className="text-xs text-gray-400">
                Enter your secret administrator passcode to access movie catalog management & streaming URLs.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mt-6 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-shake">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign-in / Fast Unlock */}
          <div className="mt-6 space-y-3 relative z-10">
            {user && isAdmin ? (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2.5">
                <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="truncate">Signed in: {user.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickUnlockAsAdmin}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>1-Click Unlock as Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGoogleAdminLogin}
                disabled={isGoogleLoggingIn}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 text-white text-xs font-bold transition-all shadow-sm group"
              >
                <GoogleIcon />
                <span>{isGoogleLoggingIn ? 'Connecting...' : 'Sign In with Google (Admin Gmail)'}</span>
              </button>
            )}

            <div className="relative flex items-center justify-center pt-1">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-cw-card px-3 text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                or enter passcode
              </span>
            </div>
          </div>

          {/* Passcode Form */}
          <form onSubmit={handleLogin} className="mt-4 space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcodeAttempt}
                  onChange={(e) => {
                    setPasscodeAttempt(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Enter admin passcode..."
                  autoFocus
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cw-surface/90 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cw-red focus:ring-1 focus:ring-cw-red text-sm transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded text-cw-red focus:ring-cw-red bg-cw-surface border-white/20"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cw-red hover:bg-cw-red-dark text-white text-sm font-bold shadow-glow-sm hover:shadow-glow transition-all"
            >
              <span>Unlock Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Return to Home */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to CinemaWala Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Admin Catalog Management | CinemaWala"
        description="CinemaWala management dashboard for movies, official watch URLs, and metadata."
      />

      {/* Top Banner: Protected Management Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-cw-card border border-cw-red/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cw-red/10 border border-cw-red/40 flex items-center justify-center text-cw-red flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white">CinemaWala Management Console</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Admin Verified
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Firebase Cloud Active</span>
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Manage discovery items, edit official streaming destinations, and customize catalog entries.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsSiteSettingsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 to-cw-gold/15 hover:from-amber-500/25 hover:to-cw-gold/25 text-cw-gold text-xs font-semibold border border-cw-gold/30 transition-all shadow-glow-sm"
            title="Customize Homepage Hero Heading, Tagline and Wallpaper"
          >
            <Palette className="w-3.5 h-3.5 text-cw-gold" />
            <span>Customize Homepage</span>
          </button>

          <button
            onClick={() => setIsChangePassModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10 transition-colors"
            title="Change secret admin passcode"
          >
            <Key className="w-3.5 h-3.5 text-cw-gold" />
            <span>Passcode</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10 transition-colors"
            title="Reset catalog back to initial movies"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cw-red hover:bg-cw-red-dark text-white text-xs font-bold shadow-glow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Movie</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-colors"
            title="Lock and log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
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

                {/* Direct Download URLs (HD & CDN 2) */}
                <div className="sm:col-span-2 p-3.5 rounded-xl bg-black/40 border border-cw-red/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="text-cw-red font-black">⚡</span> Direct Download Links (Full HD & Servers)
                    </label>
                    <span className="text-[11px] text-gray-400">Optional (default uses Watch URL)</span>
                  </div>

                  {/* Main / Full HD Link */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      Main Full HD Download URL (Default & 1-Click Link)
                    </label>
                    <input
                      type="url"
                      value={formData.downloadUrl || ''}
                      onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                      placeholder="https://gplinks.co/... or direct Google Drive / TeraBox link"
                      className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-xs"
                    />
                  </div>

                  {/* Direct CDN 2 Single Link */}
                  <div>
                    <label className="block text-[11px] font-semibold text-cw-gold mb-1">
                      Direct CDN 2 Link (Single 1-Click Full HD Link at bottom)
                    </label>
                    <input
                      type="url"
                      value={formData.cdn2Url || ''}
                      onChange={(e) => setFormData({ ...formData, cdn2Url: e.target.value })}
                      placeholder="Leave blank to use Main Download URL automatically"
                      className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-gold focus:outline-none text-xs"
                    />
                  </div>

                  {/* Separate Quality Links Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                        720p HD Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.downloadUrl720p || ''}
                        onChange={(e) => setFormData({ ...formData, downloadUrl720p: e.target.value })}
                        placeholder="720p direct link"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                        1080p FHD Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.downloadUrl1080p || ''}
                        onChange={(e) => setFormData({ ...formData, downloadUrl1080p: e.target.value })}
                        placeholder="1080p direct link"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                        4K / 2160p Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.downloadUrl4k || ''}
                        onChange={(e) => setFormData({ ...formData, downloadUrl4k: e.target.value })}
                        placeholder="2160p 4K link"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Official YouTube Trailer URL */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Official YouTube Trailer URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.trailerUrl}
                    onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or YouTube video ID"
                    className="w-full px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-xs"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Leave blank to automatically embed YouTube trailer search.
                  </p>
                </div>

                {/* Poster Section (URL or Custom Phone/PC Photo) */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-gray-300">
                      Movie Poster Image
                    </label>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cw-red/15 hover:bg-cw-red/25 border border-cw-red/30 text-cw-red text-xs font-semibold transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploadingPoster ? 'Compressing...' : '📁 Upload Photo from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePosterUpload}
                      />
                    </label>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={formData.poster}
                      onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                      placeholder="Paste image URL or click 'Upload Photo from Device'..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-xs"
                    />
                    {formData.poster && (
                      <div className="w-10 h-14 rounded-lg overflow-hidden border border-white/20 flex-shrink-0 bg-black">
                        <img
                          src={formData.poster}
                          alt="Poster preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Backdrop / Wide Banner (URL or Custom Photo) */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-gray-300">
                      Wide Backdrop / Banner (Optional)
                    </label>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 text-xs font-medium transition-all">
                      <Upload className="w-3.5 h-3.5 text-gray-400" />
                      <span>{isUploadingBackdrop ? 'Compressing...' : 'Upload Wide Banner'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBackdropUpload}
                      />
                    </label>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={formData.backdrop}
                      onChange={(e) => setFormData({ ...formData, backdrop: e.target.value })}
                      placeholder="Optional wide banner image URL or file upload..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-xs"
                    />
                    {formData.backdrop && (
                      <div className="w-16 h-10 rounded-lg overflow-hidden border border-white/20 flex-shrink-0 bg-black">
                        <img
                          src={formData.backdrop}
                          alt="Backdrop preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
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

      {/* Change Passcode Modal */}
      {isChangePassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-cw-card border border-white/15 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cw-gold/10 border border-cw-gold/30 flex items-center justify-center text-cw-gold">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Change Admin Passcode</h2>
                  <p className="text-[11px] text-gray-400">Update your private administrator key</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsChangePassModalOpen(false);
                  setPassChangeError('');
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passChangeError && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{passChangeError}</span>
              </div>
            )}

            <form onSubmit={handleChangePasscode} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Current Passcode
                </label>
                <input
                  type="password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  placeholder="Enter current passcode..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cw-surface border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cw-red"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  New Passcode (min 6 characters)
                </label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Enter new secret passcode..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cw-surface border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cw-red"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Confirm New Passcode
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm new passcode..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cw-surface border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cw-red"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsChangePassModalOpen(false);
                    setPassChangeError('');
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cw-red hover:bg-cw-red-dark text-white text-xs font-bold shadow-glow-sm"
                >
                  Save Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customize Homepage Text & Wallpaper Modal */}
      {isSiteSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-cw-card border border-white/15 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cw-gold/15 border border-cw-gold/30 flex items-center justify-center text-cw-gold">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Customize Homepage</h2>
                  <p className="text-[11px] text-gray-400">Update main title, tagline and hero wallpaper live</p>
                </div>
              </div>
              <button
                onClick={() => setIsSiteSettingsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSiteSettings} className="mt-5 space-y-4">
              {/* Main Headline */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Main Hero Title / Headline
                </label>
                <input
                  type="text"
                  value={settingsForm.heroHeading}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroHeading: e.target.value })}
                  placeholder="e.g. Your Daily Dose of Cinema 🎬"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cw-surface border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cw-red"
                />
              </div>

              {/* Tagline Badge */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Floating Tagline Badge
                </label>
                <input
                  type="text"
                  value={settingsForm.heroTagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroTagline: e.target.value })}
                  placeholder="e.g. Cinema ka asli adda 🍿 • 100% Legal Streaming Guide"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cw-surface border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cw-red"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.heroSubtitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                  placeholder="e.g. Discover memorable movie moments, stories and where to watch them."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cw-surface border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cw-red"
                />
              </div>

              {/* Wallpaper Section */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-300">
                    Hero Wallpaper / Background Banner
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cw-red/15 hover:bg-cw-red/25 border border-cw-red/30 text-cw-red text-xs font-semibold transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingWallpaper ? 'Compressing...' : '📁 Upload Photo from Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleWallpaperUpload}
                    />
                  </label>
                </div>

                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={settingsForm.heroWallpaper}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroWallpaper: e.target.value })}
                    placeholder="Paste image URL or click 'Upload Photo from Device'..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-cw-surface text-white border border-white/10 focus:border-cw-red focus:outline-none text-xs"
                  />
                  {settingsForm.heroWallpaper && (
                    <div className="w-16 h-10 rounded-lg overflow-hidden border border-white/20 flex-shrink-0 bg-black">
                      <img
                        src={settingsForm.heroWallpaper}
                        alt="Wallpaper preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSiteSettingsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cw-red hover:bg-cw-red-dark text-white text-xs font-bold shadow-glow-sm flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save & Sync Worldwide</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
