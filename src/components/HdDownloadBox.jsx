import React, { useState } from 'react';
import { 
  Download, Zap, ShieldCheck, Check, Copy, ExternalLink, 
  Sparkles, HardDrive, Film, Server, CheckCircle2, ArrowDownCircle, Flame 
} from 'lucide-react';

// Helper to get link for specific quality or server
export const getDownloadLink = (movie, quality = '1080p', server = 'cdn1') => {
  if (!movie) return 'https://www.netflix.com';

  if (server === 'cdn2') {
    return movie.cdn2Url || movie.downloadUrl1080p || movie.downloadUrl || movie.watchUrl || 'https://www.netflix.com';
  }

  switch (quality) {
    case '720p':
      return movie.downloadUrl720p || movie.downloadUrl || movie.watchUrl || 'https://www.netflix.com';
    case '1080p':
      return movie.downloadUrl1080p || movie.downloadUrl || movie.watchUrl || 'https://www.netflix.com';
    case '1440p':
      return movie.downloadUrl1440p || movie.downloadUrl || movie.watchUrl || 'https://www.netflix.com';
    case '2160p':
      return movie.downloadUrl4k || movie.downloadUrl2160p || movie.downloadUrl || movie.watchUrl || 'https://www.netflix.com';
    case '480p':
      return movie.downloadUrl480p || movie.downloadUrl || movie.watchUrl || 'https://www.netflix.com';
    case '144p':
      return movie.downloadUrl144p || movie.downloadUrl || movie.watchUrl || 'https://www.netflix.com';
    default:
      return movie.downloadUrl || movie.watchUrl || 'https://www.netflix.com';
  }
};

export default function HdDownloadBox({ movie }) {
  if (!movie) return null;

  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [activeServer, setActiveServer] = useState('cdn1');

  // ONLY HD qualities as requested: 720p HD, 1080p Full HD, 1440p 2K, 2160p 4K UHD
  const HD_QUALITIES = [
    {
      id: '720p',
      name: '720p HD',
      subtitle: 'Standard High Definition',
      resolution: '1280 × 720 • 60 FPS',
      size: '950 MB',
      format: 'MP4 (x264)',
      audio: 'Hindi / English AAC 5.1',
      badge: 'HD Standard',
      badgeClass: 'bg-cw-red/15 text-cw-red border-cw-red/30',
      btnText: 'Direct Download (720p HD)',
      bitrate: 'High Speed',
      recommended: false,
    },
    {
      id: '1080p',
      name: '1080p Full HD',
      subtitle: 'Crisp 1080p Bluray Quality',
      resolution: '1920 × 1080 • 10-bit HEVC',
      size: '2.4 GB',
      format: 'MKV (x265 / HEVC)',
      audio: 'Dolby Atmos 5.1 Surround',
      badge: '⭐ Most Popular HD',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      btnText: 'Direct Download (1080p FHD)',
      bitrate: 'Ultra Fast',
      recommended: true,
    },
    {
      id: '1440p',
      name: '1440p 2K QHD',
      subtitle: 'Quad High Definition',
      resolution: '2560 × 1440 • 10-bit HDR',
      size: '4.8 GB',
      format: 'MKV (Main10)',
      audio: 'Dolby TrueHD 7.1 Lossless',
      badge: '2K Quad HD',
      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      btnText: 'Direct Download (1440p 2K)',
      bitrate: 'Gigabit CDN',
      recommended: false,
    },
    {
      id: '2160p',
      name: '2160p 4K UHD',
      subtitle: 'Pure Cinema 4K HDR',
      resolution: '3840 × 2160 • Dolby Vision / HDR10+',
      size: '10.5 GB',
      format: 'MKV (4K Remux HEVC)',
      audio: 'Dolby Atmos 7.1 / IMAX Enhanced',
      badge: '👑 4K Ultra HD',
      badgeClass: 'bg-cw-gold/20 text-cw-gold border-cw-gold/40',
      btnText: 'Direct Download (2160p 4K UHD)',
      bitrate: 'Super Gigabit CDN',
      recommended: false,
    },
  ];

  const handleQualityDownload = (item) => {
    setDownloadingId(item.id);
    const targetUrl = getDownloadLink(movie, item.id, activeServer);

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadStatus({
        quality: item.name,
        size: item.size,
        server: activeServer === 'cdn2' ? 'Direct CDN 2' : 'Direct CDN 1',
        title: movie.title,
      });

      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      setTimeout(() => setDownloadStatus(null), 6000);
    }, 500);
  };

  const handleCdn2SingleDownload = () => {
    setDownloadingId('cdn2-single');
    const targetUrl = getDownloadLink(movie, '1080p', 'cdn2');

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadStatus({
        quality: 'Full HD 1080p',
        size: '2.4 GB',
        server: 'Direct CDN 2 (1-Click Fast Server)',
        title: movie.title,
      });

      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      setTimeout(() => setDownloadStatus(null), 6000);
    }, 500);
  };

  const handleCopyLink = (targetUrl, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(targetUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const cdn2DirectUrl = getDownloadLink(movie, '1080p', 'cdn2');

  return (
    <div
      id="hd-direct-download-box"
      className="scroll-mt-24 rounded-2xl bg-gradient-to-b from-[#151722] via-cw-card to-[#0d0e14] border-2 border-cw-red/40 p-5 sm:p-7 lg:p-8 shadow-2xl relative overflow-hidden transition-all duration-300"
    >
      {/* Top ambient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cw-red to-transparent opacity-80" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-cw-red/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section with Server Switcher */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cw-red/15 border border-cw-red/30 text-cw-red text-xs font-black tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 fill-cw-red" />
              Direct Download Box
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cw-gold/15 border border-cw-gold/30 text-cw-gold text-xs font-black uppercase tracking-wider">
              HD Only
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {activeServer === 'cdn2' ? 'Direct CDN 2 (High Speed HD Active)' : 'Direct CDN 1 Active'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-white flex items-center gap-2">
            <span>Direct Download</span>
            <span className="text-cw-red text-sm sm:text-base font-bold bg-cw-surface px-2.5 py-1 rounded-lg border border-white/10">
              High Definition
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
            Download <strong className="text-white">{movie.title}</strong> directly in HD quality. No third-party redirections or annoying ads.
          </p>
        </div>

        {/* Server Switcher: Direct CDN 1 vs Direct CDN 2 */}
        <div className="flex items-center gap-2 bg-cw-surface/90 border border-white/10 p-1.5 rounded-xl self-start md:self-auto shadow-inner">
          <Server className="w-4 h-4 text-cw-red ml-1.5" />
          <span className="text-xs font-semibold text-gray-400 mr-1">Server:</span>
          <button
            type="button"
            onClick={() => setActiveServer('cdn1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeServer === 'cdn1'
                ? 'bg-cw-red text-white shadow-glow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Direct CDN 1
          </button>
          <button
            type="button"
            onClick={() => setActiveServer('cdn2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeServer === 'cdn2'
                ? 'bg-gradient-to-r from-cw-red to-orange-500 text-white shadow-glow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Direct CDN 2</span>
            <span className="px-1 py-0.2 rounded text-[9px] bg-black/40 text-cw-gold font-black">HD</span>
          </button>
        </div>
      </div>

      {/* Success notification banner after clicking direct download */}
      {downloadStatus && (
        <div className="relative z-10 mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="font-bold text-white">⚡ Direct Download Initiated!</span>
            <p className="text-gray-300 text-xs mt-0.5">
              Opening official high-speed download server (<span className="text-cw-gold font-bold">{downloadStatus.server}</span>) for <strong className="text-white">{downloadStatus.title}</strong> in <span className="text-emerald-400 font-bold">{downloadStatus.quality}</span> ({downloadStatus.size}).
            </p>
          </div>
        </div>
      )}

      {/* HD Download Cards List (720p, 1080p, 1440p, 2160p) */}
      <div className="relative z-10 mt-5 space-y-3 sm:space-y-3.5">
        {HD_QUALITIES.map((item) => {
          const isDownloading = downloadingId === item.id;
          const isCopied = copiedId === item.id;
          const itemUrl = getDownloadLink(movie, item.id, activeServer);

          return (
            <div
              key={item.id}
              className={`group p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
                item.recommended
                  ? 'bg-gradient-to-r from-cw-red/15 via-cw-surface to-cw-card border-cw-red/50 shadow-[0_0_20px_rgba(229,9,20,0.15)] ring-1 ring-cw-red/30'
                  : 'bg-cw-surface/70 hover:bg-cw-surface border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Quality details & badges */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-extrabold text-base border flex-shrink-0 shadow-inner ${
                    item.recommended
                      ? 'bg-cw-red text-white border-cw-red shadow-glow-sm'
                      : 'bg-black/50 text-white border-white/10 group-hover:border-cw-red/40'
                  }`}>
                    {item.id === '2160p' ? '4K' : item.id === '1440p' ? '2K' : item.id.replace('p', '')}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cw-red transition-colors">
                        {item.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                      {item.recommended && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cw-red to-orange-500 text-white shadow-glow-sm">
                          🔥 Recommended
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-gray-400 border border-white/5 font-semibold">
                        {activeServer === 'cdn2' ? 'CDN 2' : 'CDN 1'}
                      </span>
                    </div>

                    {/* Technical details: resolution, audio, size, codec */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-300">
                      <span className="flex items-center gap-1 text-gray-400">
                        <Film className="w-3.5 h-3.5 text-cw-red" />
                        {item.resolution}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-300 font-medium">
                        {item.audio}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400 font-mono">
                        {item.format}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="font-bold text-cw-gold flex items-center gap-1">
                        <HardDrive className="w-3.5 h-3.5 text-cw-gold" />
                        {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Download Actions */}
                <div className="flex items-center gap-2 self-stretch sm:self-auto flex-shrink-0">
                  {/* Copy Link for IDM / Download Manager */}
                  <button
                    type="button"
                    onClick={() => handleCopyLink(itemUrl, item.id)}
                    title="Copy direct download link (for IDM / browser)"
                    className="p-3 rounded-xl bg-black/40 hover:bg-white/10 border border-white/10 hover:border-white/30 text-gray-300 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="hidden sm:inline text-emerald-400 text-xs">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline text-xs">Copy</span>
                      </>
                    )}
                  </button>

                  {/* Primary "Direct Download" Button */}
                  <button
                    type="button"
                    onClick={() => handleQualityDownload(item)}
                    disabled={isDownloading}
                    className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 shadow-md ${
                      item.recommended
                        ? 'bg-gradient-to-r from-cw-red via-red-600 to-cw-red-dark text-white shadow-glow-red hover:brightness-110'
                        : 'bg-cw-surface hover:bg-cw-red hover:text-white text-white border border-white/15 hover:border-cw-red'
                    }`}
                  >
                    {isDownloading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Starting Direct Download...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-cw-gold text-cw-gold" />
                        <span>{item.btnText}</span>
                        <Download className="w-4 h-4 ml-1 opacity-90 group-hover:translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= SABSE NICHE 2160 KE BAAD: DIRECT CDN 2 FULL HD 1-CLICK BOX ================= */}
      <div className="relative z-10 mt-6 pt-6 border-t-2 border-dashed border-cw-red/30">
        <div className="rounded-2xl bg-gradient-to-r from-[#211115] via-[#1B1425] to-[#141624] border-2 border-cw-red/60 p-5 sm:p-6 shadow-[0_0_30px_rgba(229,9,20,0.25)] relative overflow-hidden group">
          {/* Background subtle glow */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-cw-red/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cw-red text-white text-xs font-black tracking-wider uppercase inline-flex items-center gap-1 shadow-glow-sm">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  Direct CDN 2
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  1-Click Instant Download
                </span>
                <span className="px-2.5 py-1 rounded-full bg-cw-gold/20 text-cw-gold border border-cw-gold/40 text-xs font-black uppercase">
                  Full HD 1080p
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-display font-black text-white flex items-center gap-2">
                <span>Fast Direct Download Full HD (CDN 2)</span>
              </h4>

              <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                Koi quality choose karne ki zaroorat nahi — 1-click me <strong className="text-white">Full HD 1080p</strong> direct download shuru karein (Ultra fast CDN 2 direct server).
              </p>
            </div>

            {/* Direct CDN 2 Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleCopyLink(cdn2DirectUrl, 'cdn2-copy')}
                title="Copy CDN 2 Direct Link for IDM"
                className="p-3.5 rounded-xl bg-black/60 hover:bg-white/10 border border-white/20 text-gray-200 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                {copiedId === 'cdn2-copy' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="hidden sm:inline text-emerald-400 text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs">Copy CDN 2</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCdn2SingleDownload}
                disabled={downloadingId === 'cdn2-single'}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cw-red via-red-600 to-orange-600 hover:from-cw-red hover:to-orange-500 text-white font-black text-sm sm:text-base shadow-[0_0_25px_rgba(229,9,20,0.5)] hover:scale-103 active:scale-95 transition-all text-center"
              >
                {downloadingId === 'cdn2-single' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Opening CDN 2 Full HD...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-cw-gold text-cw-gold animate-bounce" />
                    <span>Direct Download Full HD (CDN 2)</span>
                    <Download className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Download Security & Quality Guarantee Bar */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-gray-300">
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-black/30 border border-white/5">
          <Zap className="w-4 h-4 text-cw-gold flex-shrink-0" />
          <span className="font-semibold">Direct Download</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-black/30 border border-white/5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">Virus & Safe Checked</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-black/30 border border-white/5">
          <Sparkles className="w-4 h-4 text-cw-red flex-shrink-0" />
          <span className="font-semibold">HD Only Guaranteed</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-black/30 border border-white/5">
          <HardDrive className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <span className="font-semibold">Fast Resumable CDN 2</span>
        </div>
      </div>
    </div>
  );
}
