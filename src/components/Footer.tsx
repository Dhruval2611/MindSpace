import React from 'react';
import { Sparkles, Mail, MapPin, ArrowUp, ShieldCheck, Heart } from 'lucide-react';
import type { EventConfig } from '../types';

interface FooterProps {
  config: EventConfig;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenPrivacy,
  onOpenTerms,
  onOpenDashboard
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest text-cream pt-16 pb-12 relative overflow-hidden">
      
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-peach/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-cream/15">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cream text-forest flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-forest" />
              </div>
              <div>
                <span className="font-serif font-black text-2xl tracking-wide">
                  {config.festName}
                </span>
                <p className="text-xs text-cream/70 italic">
                  “{config.tagline}”
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed max-w-sm">
              An annual student-led festival dedicated to emotional well-being, creative release, empathy, and peer support.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-cream/60">
              <Heart className="w-3.5 h-3.5 text-peach fill-peach" />
              <span>Created with care for student minds.</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-peach">
              Festival Exploration
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-cream/75">
              <li>
                <a href="#about" className="hover:text-cream transition-colors">About the Fest</a>
              </li>
              <li>
                <a href="#activities" className="hover:text-cream transition-colors">Proposed Activities</a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-cream transition-colors">Tentative Schedule</a>
              </li>
              <li>
                <a href="#awareness" className="hover:text-cream transition-colors">Mental Health Literacy</a>
              </li>
              <li>
                <a href="#emotion-wall" className="hover:text-cream transition-colors">Anonymous Emotion Wall</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-cream transition-colors">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Verification & Placeholders */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-peach">
                Official Information Desk
              </p>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-cream/80">
                Placeholders
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-cream/80">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-peach flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-cream">Organizer:</span>
                  <span>{config.organizerPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-peach flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-cream">Host Campus:</span>
                  <span>{config.collegePlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-peach flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-cream">Official Email:</span>
                  <span className="font-mono">{config.officialEmailPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-peach flex-shrink-0 mt-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <div>
                  <span className="font-semibold block text-cream">Instagram Handle:</span>
                  <span className="font-mono">{config.instagramPlaceholder}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenDashboard}
                className="text-xs font-semibold text-peach hover:underline inline-flex items-center gap-1"
              >
                <span>Organizer Admin Login & Settings</span> →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <div>
            © 2026 MINDSPACE. All rights reserved. Organized by the College Mental Health Fest Committee.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-cream underline transition-colors"
            >
              Privacy Policy
            </button>

            <button
              onClick={onOpenTerms}
              className="hover:text-cream underline transition-colors"
            >
              Registration Terms
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cream transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
