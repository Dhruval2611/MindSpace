import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, User } from 'lucide-react';
import { INITIAL_SCHEDULE } from '../data/initialData';

export const ScheduleSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Opening', 'Wellness', 'Creativity', 'Connection', 'Games', 'Awareness', 'Learning', 'Expression'];

  const filteredSchedule = filterCategory === 'All'
    ? INITIAL_SCHEDULE
    : INITIAL_SCHEDULE.filter(item => item.category === filterCategory);

  return (
    <section id="schedule" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach/50 text-forest text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-forest" />
            <span>Festival Timeline</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest tracking-tight">
            Festival Day Flow
          </h2>

          <p className="text-base text-forest/75 leading-relaxed">
            A balanced sequence of grounding meditations, artistic explorations, myth-busting sessions, and open-mic celebrations.
          </p>

          {/* Mandatory Tentative Confirmation Notice */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-peach-50 border border-peach/60 text-xs font-semibold text-forest mt-2">
            <AlertCircle className="w-4 h-4 text-forest flex-shrink-0" />
            <span>Tentative Schedule — Subject to Organizer Confirmation</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-12 flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-forest text-cream shadow-soft'
                  : 'bg-cream text-forest/70 hover:bg-sage-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline Flow */}
        <div className="mt-12 max-w-4xl mx-auto relative">
          
          {/* Vertical Timeline Guide Line */}
          <div className="absolute top-4 bottom-4 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-sage/40 hidden sm:block" />

          <div className="space-y-8">
            {filteredSchedule.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 ${
                    isEven ? 'sm:flex-row-reverse text-left sm:text-right' : 'text-left'
                  }`}
                >
                  
                  {/* Timeline Content Card */}
                  <div className="w-full sm:w-1/2">
                    <div className="p-6 rounded-3xl bg-cream/60 border border-sage/40 hover:border-forest/40 hover:shadow-soft transition-all duration-300 space-y-3">
                      
                      <div className={`flex items-center gap-2 text-xs ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-white text-forest text-[11px] shadow-2xs">
                          {item.category}
                        </span>
                        <span className="text-forest/60 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {item.time}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-forest">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-forest/75 leading-relaxed">
                        {item.description}
                      </p>

                      <div className={`pt-2 flex items-center gap-4 text-xs text-forest/60 ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-forest/50" />
                          {item.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <User className="w-3.5 h-3.5 text-forest/50" />
                          {item.speakerOrHost}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-forest text-cream items-center justify-center border-4 border-white shadow-soft z-10 text-xs font-bold">
                    {index + 1}
                  </div>

                  {/* Opposite Spacer Column */}
                  <div className="hidden sm:block sm:w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
