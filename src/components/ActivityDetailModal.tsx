import React from 'react';
import { X, Clock, MapPin, Users, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import type { Activity } from '../types';

interface ActivityDetailModalProps {
  activity: Activity | null;
  onClose: () => void;
  onRegister: (activityTitle: string) => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  onClose,
  onRegister
}) => {
  if (!activity) return null;

  const isFull = activity.registeredCount >= activity.capacity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/40 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-lg border border-sage/40 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header banner */}
        <div className="bg-gradient-to-r from-forest to-forest-700 text-cream p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-peach text-forest">
              {activity.category}
            </span>

            {activity.isProposed && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-cream border border-white/30">
                Proposed Activity • Tentative
              </span>
            )}
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            {activity.title}
          </h2>
          
          <p className="mt-2 text-cream/80 text-sm">
            {activity.shortDescription}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Key metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-cream">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-forest/60 uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Duration
              </span>
              <p className="text-sm font-bold text-forest">{activity.duration}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-forest/60 uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Tentative Venue
              </span>
              <p className="text-sm font-bold text-forest">{activity.venue}</p>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-forest/60 uppercase flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Capacity
              </span>
              <p className="text-sm font-bold text-forest">
                {activity.capacity - activity.registeredCount} spots left of {activity.capacity}
              </p>
            </div>
          </div>

          {/* Full Detailed Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest/70">
              About This Session
            </h4>
            <p className="text-sm text-forest/85 leading-relaxed">
              {activity.fullDescription}
            </p>
          </div>

          {/* Highlights */}
          {activity.highlights && activity.highlights.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-forest/70">
                What to Expect
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-forest/80">
                {activity.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What to bring */}
          {activity.whatToBring && (
            <div className="p-4 rounded-2xl bg-sage-50 border border-sage/40 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-forest uppercase tracking-wider">What to Bring</p>
                <p className="text-sm text-forest/80 mt-0.5">{activity.whatToBring}</p>
              </div>
            </div>
          )}

          {/* Proposed schedule note */}
          <div className="p-3.5 rounded-xl bg-peach-50 border border-peach/50 flex items-center gap-2.5 text-xs text-forest/80">
            <AlertCircle className="w-4 h-4 text-forest flex-shrink-0" />
            <span>Time slot scheduled for {activity.timeSlot}. Final room confirmation will be provided at check-in.</span>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-6 bg-cream/70 border-t border-forest/10 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-forest/20 text-forest text-sm font-semibold hover:bg-white transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onRegister(activity.title);
            }}
            disabled={!activity.isOpen || isFull}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
              !activity.isOpen || isFull
                ? 'bg-forest/20 text-forest/50 cursor-not-allowed'
                : 'bg-forest text-cream hover:bg-forest-600 shadow-soft'
            }`}
          >
            <span>{isFull ? 'Activity is Full' : !activity.isOpen ? 'Registration Closed' : 'Register for This Activity'}</span>
            {!isFull && activity.isOpen && <ArrowRight className="w-4 h-4 text-peach" />}
          </button>
        </div>

      </div>
    </div>
  );
};
