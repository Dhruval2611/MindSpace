import React, { useState, useMemo } from 'react';
import { Search, Filter, Clock, Users, Sparkles, ChevronRight, Info } from 'lucide-react';
import type { Activity, ActivityCategory } from '../types';
import { ActivityDetailModal } from './ActivityDetailModal';

interface ActivitiesExplorerProps {
  activities: Activity[];
  onRegisterActivity: (activityTitle: string) => void;
}

const CATEGORIES: { label: string; value: ActivityCategory | 'All' }[] = [
  { label: 'All Activities', value: 'All' },
  { label: 'Expression', value: 'Expression' },
  { label: 'Creativity', value: 'Creativity' },
  { label: 'Wellness', value: 'Wellness' },
  { label: 'Awareness', value: 'Awareness' },
  { label: 'Connection', value: 'Connection' },
  { label: 'Learning', value: 'Learning' },
  { label: 'Games', value: 'Games' },
];

export const ActivitiesExplorer: React.FC<ActivitiesExplorerProps> = ({
  activities,
  onRegisterActivity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalActivity, setActiveModalActivity] = useState<Activity | null>(null);

  // Filter activities based on category and search query
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        act.title.toLowerCase().includes(q) ||
        act.shortDescription.toLowerCase().includes(q) ||
        act.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activities, selectedCategory, searchQuery]);

  // Color helper for categories
  const getCategoryColor = (cat: ActivityCategory) => {
    switch (cat) {
      case 'Expression':
        return 'bg-lavender/60 text-forest border-lavender-400';
      case 'Creativity':
        return 'bg-peach/60 text-forest border-peach-400';
      case 'Wellness':
        return 'bg-sage/60 text-forest border-sage-500';
      case 'Awareness':
        return 'bg-forest/10 text-forest border-forest/30';
      case 'Connection':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Learning':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Games':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-cream text-forest border-forest/20';
    }
  };

  return (
    <section id="activities" className="py-24 bg-gradient-to-b from-sage-50 via-cream to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-forest/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 text-forest text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-forest" />
              <span>Explore Fest Programs</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest tracking-tight">
              Curated Event Activities
            </h2>
            <p className="text-sm sm:text-base text-forest/75 leading-relaxed">
              Find your pace. Whether you want to sing, journal, challenge myths, or just relax with calming crafts, each session is designed for peer connection and decompression.
            </p>
          </div>

          {/* Proposed schedule alert badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-sage/50 shadow-soft text-xs text-forest/80">
            <Info className="w-4 h-4 text-forest flex-shrink-0" />
            <span>Marked as <strong>Proposed Activities</strong> pending final schedule confirmation.</span>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-forest/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by activity name, mood, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-sage/40 text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm shadow-soft transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-forest/50 hover:text-forest"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="text-xs font-medium text-forest/60 w-full md:w-auto text-left md:text-right">
              Showing <strong>{filteredActivities.length}</strong> of {activities.length} activities
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-forest/60 mr-1 flex-shrink-0" />
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                    active
                      ? 'bg-forest text-cream shadow-soft scale-105'
                      : 'bg-white text-forest/75 hover:bg-sage-50 border border-sage/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State if no search matches */}
        {filteredActivities.length === 0 && (
          <div className="mt-16 text-center py-16 px-4 rounded-3xl bg-white/70 border border-dashed border-sage/50">
            <p className="font-serif text-xl font-bold text-forest">No activities found</p>
            <p className="text-sm text-forest/60 mt-1 max-w-sm mx-auto">
              We couldn't find any activities matching "{searchQuery}". Try selecting another category or clearing your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-forest text-cream text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Activities Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((act) => {
            const isFull = act.registeredCount >= act.capacity;
            const spotsRemaining = Math.max(0, act.capacity - act.registeredCount);
            const fillPercentage = Math.min(100, Math.round((act.registeredCount / act.capacity) * 100));

            return (
              <div
                key={act.id}
                className="group rounded-3xl bg-white border border-sage/40 hover:border-forest/40 p-6 sm:p-7 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Proposed Badge ribbon */}
                {act.isProposed && (
                  <div className="mb-3 flex items-center justify-between text-[11px]">
                    <span className="text-amber-800 bg-amber-50 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                      Proposed • Tentative
                    </span>
                    <span className="text-forest/60 font-medium">Slot: {act.timeSlot}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Category & Duration */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(
                        act.category
                      )}`}
                    >
                      {act.category}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs text-forest/70 font-medium bg-cream px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-forest/60" />
                      {act.duration}
                    </span>
                  </div>

                  {/* Activity Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest group-hover:text-forest-600 transition-colors leading-snug">
                    {act.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-forest/75 leading-relaxed line-clamp-3">
                    {act.shortDescription}
                  </p>
                </div>

                {/* Capacity & Registration Availability Indicator */}
                <div className="mt-6 pt-5 border-t border-forest/10 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-forest/70 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-forest/60" /> Capacity
                      </span>
                      <span className={isFull ? 'text-rose-600' : 'text-forest'}>
                        {isFull ? 'Full Capacity' : `${spotsRemaining} spots available`}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-cream overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFull
                            ? 'bg-rose-500'
                            : fillPercentage > 75
                            ? 'bg-amber-500'
                            : 'bg-sage-600'
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions: Learn More & Register */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => setActiveModalActivity(act)}
                      className="px-3 py-2.5 rounded-xl border border-forest/20 text-forest text-xs font-semibold hover:bg-cream transition-colors text-center"
                    >
                      Learn More
                    </button>

                    <button
                      onClick={() => onRegisterActivity(act.title)}
                      disabled={!act.isOpen || isFull}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-center flex items-center justify-center gap-1 ${
                        !act.isOpen || isFull
                          ? 'bg-forest/10 text-forest/40 cursor-not-allowed'
                          : 'bg-forest text-cream hover:bg-forest-600 shadow-soft'
                      }`}
                    >
                      <span>{isFull ? 'Full' : !act.isOpen ? 'Closed' : 'Register'}</span>
                      {!isFull && act.isOpen && <ChevronRight className="w-3.5 h-3.5 text-peach" />}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {activeModalActivity && (
        <ActivityDetailModal
          activity={activeModalActivity}
          onClose={() => setActiveModalActivity(null)}
          onRegister={(title) => {
            setActiveModalActivity(null);
            onRegisterActivity(title);
          }}
        />
      )}
    </section>
  );
};
