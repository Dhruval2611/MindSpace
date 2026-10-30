import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Shield, UserPlus } from 'lucide-react';
import type { EventConfig } from '../types';

interface NavbarProps {
  config: EventConfig;
  onOpenRegister: () => void;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenRegister, onOpenDashboard }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Activities', href: '#activities' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Awareness', href: '#awareness' },
    { name: 'Emotion Wall', href: '#emotion-wall' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-soft py-3 border-b border-sage/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-forest flex items-center justify-center text-cream shadow-md group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-peach animate-pulse-soft" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xl tracking-wide text-forest">
                  MINDSPACE
                </span>
                <span className="bg-sage/40 text-forest text-xs font-semibold px-2 py-0.5 rounded-full">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-forest/70 font-medium tracking-tight hidden sm:block">
                {config.tagline}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-forest/80 hover:text-forest transition-colors duration-150 relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-forest after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions: Register & Admin Portal */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-forest/80 hover:text-forest bg-sage/20 hover:bg-sage/40 border border-sage/40 transition-all"
              title="Organizer & Admin Dashboard"
            >
              <Shield className="w-3.5 h-3.5 text-forest" />
              <span>Organizer Portal</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-2xl bg-forest text-cream hover:bg-forest-600 shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <UserPlus className="w-4 h-4 text-peach" />
              <span>Register Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-forest text-cream"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-forest hover:bg-sage/20 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-cream/98 backdrop-blur-xl border-b border-sage/40 px-6 py-6 space-y-4 shadow-soft-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-forest hover:text-forest-600 py-2 border-b border-forest/10"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-forest text-cream font-semibold shadow-soft"
            >
              <UserPlus className="w-4 h-4 text-peach" />
              <span>Register for Activities</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-sage/30 text-forest font-medium border border-sage/50 text-sm"
            >
              <Shield className="w-4 h-4 text-forest" />
              <span>Organizer & Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
