import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import SEO from '../components/SEO';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <SEO 
        title="Privacy Policy – CinemaWala"
        description="CinemaWala's privacy policy outlining data collection, cookies, and outbound links."
      />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cw-surface border border-white/10 text-xs font-semibold text-gray-300 mb-3">
          <Shield className="w-3.5 h-3.5 text-cw-red" />
          <span>Transparency First</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Last updated: January 2026
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed p-6 sm:p-8 rounded-3xl bg-cw-card border border-white/10">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>1.</span> Introduction
          </h2>
          <p>
            At CinemaWala ("we", "our", or "us"), we value your privacy. This Privacy Policy clarifies how information is handled when you access and navigate our movie recommendation and discovery website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>2.</span> Information We Do NOT Collect
          </h2>
          <p>
            CinemaWala does not require mandatory user registration, payment card submissions, or intrusive personal identity records. We do not sell, rent, or monetize your personal identity to marketing brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>3.</span> Local Browser Storage & Preferences
          </h2>
          <p>
            Our website utilizes client-side local browser storage (such as HTML5 LocalStorage) strictly to preserve custom catalog filters, demo management preferences, and recent search filters on your own device. This data resides on your machine and is never transmitted to unauthorized databases.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>4.</span> Outbound Third-Party Links
          </h2>
          <p>
            CinemaWala contains outbound hyperlinks leading to official streaming services, rental storefronts, and third-party movie pages (e.g., Netflix, Amazon Prime Video, Disney+ Hotstar, JioCinema, SonyLIV, Apple TV). When you click an external link, you leave our site and become subject to that third party's separate terms and privacy practices. We strongly recommend reviewing the privacy notices of any external site you visit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>5.</span> Analytics & Log Files
          </h2>
          <p>
            Like most standard web servers, anonymous technical parameters such as browser user agent, device screen dimensions, and referral URLs may be recorded to diagnose layout bugs and ensure smooth performance across mobile devices.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>6.</span> Inquiries & Contact
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or CinemaWala's operational practices, please reach out via our official Instagram handle <strong>@cinemawala</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
