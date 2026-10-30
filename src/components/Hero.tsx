import React from 'react';
import { Calendar, MapPin, Ticket, ShieldCheck, ArrowRight, Heart, Compass } from 'lucide-react';
import type { EventConfig } from '../types';

interface HeroProps {
  config: EventConfig;
  onOpenRegister: () => void;
  onExploreActivities: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenRegister, onExploreActivities }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-cream via-cream/80 to-sage-50">
      
      {/* Decorative Floating Calming Vector Background Elements */}
      <div className="absolute top-16 left-8 w-64 h-64 bg-lavender/30 rounded-full blur-3xl pointer-events-none animate-float-slow -z-10" />
      <div className="absolute top-32 right-12 w-80 h-80 bg-peach/30 rounded-full blur-3xl pointer-events-none animate-float-medium -z-10" />
      <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-sage/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, Action Buttons */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Festival Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/5 border border-forest/15 shadow-sm text-forest text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-forest animate-ping" />
              <span>College Mental Health Fest • Autumn 2026</span>
              <span className="text-forest/30">|</span>
              <span className="text-forest/75 font-serif italic">Your Mind Matters</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-forest leading-[1.12]">
                Make Space <br />
                <span className="italic font-normal text-forest/90 relative inline-block">
                  for Your Mind.
                  <svg className="absolute -bottom-2 left-0 w-full text-peach" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 15C50 6 180 3 297 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              
              {/* Supporting Text */}
              <p className="text-lg sm:text-xl text-forest/80 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
                A festival of feelings, creativity, connection, and conversations that matter.
              </p>
            </div>

            {/* Three Primary CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-forest text-cream font-semibold text-base shadow-soft hover:shadow-soft-lg hover:bg-forest-600 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 text-peach" />
              </button>

              <button
                onClick={onExploreActivities}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white text-forest font-semibold text-base border border-sage/50 shadow-soft hover:bg-sage-50 hover:border-forest/30 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Compass className="w-5 h-5 text-forest/70" />
                <span>Explore Activities</span>
              </button>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-forest/80 hover:text-forest font-semibold text-sm hover:underline transition-all"
              >
                <span>Discover the Fest</span>
              </a>
            </div>

            {/* Safe & Inclusive Assurance Note */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-forest/70">
              <Heart className="w-4 h-4 text-peach-500 fill-peach-400" />
              <span>A judgment-free campus space for everyone • Zero personal disclosure required</span>
            </div>
          </div>

          {/* Right Column: Calming Illustrated Visual Art & Abstract Shapes */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-4xl bg-gradient-to-tr from-sage/40 via-cream to-lavender/40 p-6 sm:p-8 shadow-soft-lg border border-white/60 flex items-center justify-center overflow-hidden">
              
              {/* SVG Calming Art Illustration: Flower, Clouds, Stars, Waves */}
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Organic Backdrop blob */}
                <path d="M70 200C50 120 120 50 200 60C280 70 350 130 330 220C310 310 230 350 160 330C90 310 90 280 70 200Z" fill="#A8BDA5" fillOpacity="0.45" />
                
                {/* Gentle Clouds */}
                <g className="animate-float-slow">
                  <path d="M90 120C90 105 102 95 117 95C120 95 124 96 127 98C132 87 143 80 156 80C173 80 188 93 190 110C194 109 198 108 202 108C214 108 224 118 224 130C224 142 214 152 202 152H117C102 152 90 138 90 120Z" fill="#FFFFFF" fillOpacity="0.9" />
                </g>

                {/* Calming Central Botanical Flower of Mindful Growth */}
                <g className="animate-pulse-soft origin-center" style={{ transformOrigin: '200px 220px' }}>
                  {/* Stem */}
                  <path d="M200 320C200 270 202 240 200 200" stroke="#25483B" strokeWidth="5" strokeLinecap="round" />
                  {/* Leaves */}
                  <path d="M200 270C170 260 160 230 170 215C185 235 195 250 200 270Z" fill="#25483B" fillOpacity="0.8" />
                  <path d="M200 250C230 240 240 210 230 195C215 215 205 230 200 250Z" fill="#A8BDA5" />
                  
                  {/* Flower Petals */}
                  <circle cx="200" cy="165" r="28" fill="#F1D5C8" />
                  <circle cx="170" cy="185" r="28" fill="#DCD4F2" />
                  <circle cx="230" cy="185" r="28" fill="#DCD4F2" />
                  <circle cx="180" cy="215" r="28" fill="#F1D5C8" />
                  <circle cx="220" cy="215" r="28" fill="#F1D5C8" />
                  {/* Heart Center */}
                  <circle cx="200" cy="195" r="20" fill="#25483B" />
                  <circle cx="200" cy="195" r="14" fill="#F8F5EF" />
                </g>

                {/* Sparkle Stars */}
                <g fill="#25483B">
                  <path d="M280 90L284 102L296 106L284 110L280 122L276 110L264 106L276 102Z" />
                  <path d="M110 270L112 278L120 280L112 282L110 290L108 282L100 280L108 278Z" />
                  <path d="M310 250L313 259L322 262L313 265L310 274L307 265L298 262L307 259Z" fill="#F1D5C8" />
                </g>
              </svg>

              {/* Floating Badge on Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-soft border border-sage/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-forest uppercase tracking-wider">Festival Atmosphere</p>
                  <p className="text-sm text-forest/80 font-medium">Warm, safe, and peer-guided</p>
                </div>
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-xs font-bold text-forest">🌱</span>
                  <span className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center text-xs font-bold text-forest">✨</span>
                  <span className="w-8 h-8 rounded-full bg-peach flex items-center justify-center text-xs font-bold text-forest">🤍</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Essential Event Information Section (with clearly editable placeholders) */}
        <div className="mt-16 sm:mt-24 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-soft border border-sage/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-6 border-b border-forest/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-forest/70">
                  Festival Overview & Vital Details
                </h2>
                <span className="text-[10px] bg-peach/60 text-forest font-semibold px-2 py-0.5 rounded-full">
                  Verified Placeholders
                </span>
              </div>
              <p className="text-xl font-serif font-bold text-forest mt-0.5">
                MINDSPACE 2026 Core Information
              </p>
            </div>
            
            {/* Live Registration Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-cream border border-forest/15">
              <span className={`w-3 h-3 rounded-full ${
                config.registrationStatus === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`} />
              <span className="text-xs font-semibold text-forest">
                Registration Status: {
                  config.registrationStatus === 'open' 
                    ? 'Open (Confirmed by Committee)' 
                    : config.registrationStatus === 'paused' 
                      ? 'Paused' 
                      : 'Closed'
                }
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Event Dates */}
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-cream/50">
              <div className="w-10 h-10 rounded-xl bg-sage/40 flex items-center justify-center text-forest flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-forest/60 uppercase">Expected Dates</span>
                <p className="text-sm font-bold text-forest mt-0.5">
                  {config.expectedDates}
                </p>
                <p className="text-[11px] text-forest/60 italic">Confirmed timing to be scheduled</p>
              </div>
            </div>

            {/* 2. Venue (Editable Placeholder) */}
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-cream/50">
              <div className="w-10 h-10 rounded-xl bg-lavender/50 flex items-center justify-center text-forest flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-forest/60 uppercase">Venue</span>
                <p className="text-sm font-bold text-forest mt-0.5">
                  {config.venuePlaceholder}
                </p>
                <p className="text-[11px] text-forest/60 italic">Location subject to organizer notice</p>
              </div>
            </div>

            {/* 3. Entry Info (Editable Placeholder) */}
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-cream/50">
              <div className="w-10 h-10 rounded-xl bg-peach/50 flex items-center justify-center text-forest flex-shrink-0">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-forest/60 uppercase">Entry Information</span>
                <p className="text-sm font-bold text-forest mt-0.5">
                  {config.entryInfo}
                </p>
                <p className="text-[11px] text-forest/60 italic">College ID badge required</p>
              </div>
            </div>

            {/* 4. Organizer Authority (Editable Placeholder) */}
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-cream/50">
              <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-forest/60 uppercase">Presented By</span>
                <p className="text-sm font-bold text-forest mt-0.5">
                  {config.organizerPlaceholder}
                </p>
                <p className="text-[11px] text-forest/60 italic">{config.collegePlaceholder}</p>
              </div>
            </div>

          </div>

          {/* Clarity Disclaimer on Placeholders */}
          <div className="mt-6 pt-4 border-t border-forest/10 flex items-center justify-between text-xs text-forest/60 flex-wrap gap-2">
            <span>Notice: Venue allocations, exact daily hours, and confirmed calendar dates will be officially published by the organizer.</span>
            <span className="font-semibold text-forest/80">College Mental Health Fest Committee</span>
          </div>

        </div>

      </div>
    </section>
  );
};
