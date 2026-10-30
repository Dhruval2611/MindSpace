import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { INITIAL_FAQS } from '../data/initialData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream text-forest text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-forest" />
            <span>Got Questions?</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-forest/75 max-w-xl mx-auto">
            Everything you need to know about registering, participating in activities, and joining the festival.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {INITIAL_FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-3xl border border-sage/40 overflow-hidden transition-all duration-200 bg-cream/30 hover:border-forest/30"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-forest" />
                    <span className="font-serif text-lg sm:text-xl font-bold text-forest">
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!faq.isPlaceholderConfirmed && (
                      <span className="text-[10px] font-semibold bg-peach/50 text-forest px-2 py-0.5 rounded-md hidden sm:inline-block">
                        Organizer Pending
                      </span>
                    )}
                    <span className="p-1 rounded-full bg-white text-forest">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-forest/80 leading-relaxed border-t border-forest/5 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    
                    {!faq.isPlaceholderConfirmed && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-forest/60 italic bg-white/70 p-2.5 rounded-xl border border-sage/40">
                        <AlertCircle className="w-3.5 h-3.5 text-forest/70 flex-shrink-0" />
                        <span>Note: Exact policy will be verified and published by the College Mental Health Fest Committee.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help banner */}
        <div className="mt-12 text-center p-6 rounded-3xl bg-sage-50 border border-sage/40">
          <p className="text-xs text-forest/70 font-semibold uppercase tracking-wider">Still have questions?</p>
          <p className="text-sm text-forest/90 font-medium mt-1">
            Reach out directly to the Student Help Desk at: <span className="font-mono font-bold text-forest">mentalhealthfest@college.edu.placeholder</span>
          </p>
        </div>

      </div>
    </section>
  );
};
