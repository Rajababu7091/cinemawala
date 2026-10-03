import React from 'react';
import { FileCheck, AlertTriangle, ShieldX, ExternalLink, Copyright } from 'lucide-react';
import SEO from '../components/SEO';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <SEO 
        title="Terms of Service – CinemaWala"
        description="Terms and conditions governing the use of the CinemaWala movie discovery platform."
      />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cw-surface border border-white/10 text-xs font-semibold text-gray-300 mb-3">
          <FileCheck className="w-3.5 h-3.5 text-cw-red" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Effective date: January 2026
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed p-6 sm:p-8 rounded-3xl bg-cw-card border border-white/10">

        {/* Highlight Alert: No Hosting of Copyrighted Media */}
        <div className="p-5 rounded-2xl bg-red-950/40 border border-cw-red/40 flex items-start gap-3.5">
          <ShieldX className="w-5 h-5 text-cw-red flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-bold text-sm">
              Strict Non-Hosting and Anti-Piracy Notice
            </h3>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              CinemaWala operates strictly as an indexing, curation, and informational directory for movie enthusiasts. <strong>CinemaWala does not host, upload, encode, scrape, seed, or distribute copyrighted video files or pirated multimedia of any nature.</strong> All streaming buttons link directly to authorized third-party platforms.
            </p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>1.</span> Acceptance of Terms
          </h2>
          <p>
            By accessing or browsing CinemaWala ("the Site"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>2.</span> User Responsibility
          </h2>
          <p>
            You agree to use CinemaWala solely for legitimate, non-commercial movie discovery purposes. You are solely responsible for ensuring that your consumption of media complies with all local copyright and streaming laws in your geographical jurisdiction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>3.</span> External Links & Third-Party Platforms
          </h2>
          <p>
            CinemaWala features outbound links redirecting users to third-party services including, but not limited to, Netflix, Amazon Prime Video, Disney+ Hotstar, JioCinema, SonyLIV, Apple TV, YouTube Movies, and theatrical booking engines. We do not operate, control, or endorse the operational servers, billing requirements, content availability, or streaming quality of third-party platforms. Any subscription agreements or payments are strictly between you and the respective third-party service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>4.</span> Intellectual Property & Copyright Notice
          </h2>
          <p>
            All movie titles, theatrical posters, stills, character names, and trade dress referenced on CinemaWala belong to their respective filmmakers, production studios, and licensing entities. CinemaWala claims no proprietary ownership over such copyrighted assets, and uses them purely under fair informational reference standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>5.</span> Disclaimer of Warranties & Limitation of Liability
          </h2>
          <p>
            The content provided on CinemaWala is provided on an "as is" and "as available" basis without warranties of any kind. Streaming availability of titles on third-party platforms can vary by region or date; CinemaWala does not warrant that movie availability will remain perpetual or uninterrupted.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>6.</span> Modifications to Terms
          </h2>
          <p>
            CinemaWala reserves the right to revise or amend these Terms of Service at any given time without prior notice. Your continued use of the website following any update signifies your agreement to the modified terms.
          </p>
        </section>

      </div>
    </div>
  );
}
