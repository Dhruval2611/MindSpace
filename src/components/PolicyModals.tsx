import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-lg border border-sage/40 overflow-hidden z-10 max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-forest text-cream p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-peach" />
            ) : (
              <FileText className="w-5 h-5 text-peach" />
            )}
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              {type === 'privacy' ? 'Privacy Policy & Student Data Protection' : 'Festival Registration Terms & Community Code'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-cream/70 hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-forest/80 leading-relaxed">
          
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-forest">
                Last updated: October 2026 • College Mental Health Fest Committee
              </p>
              
              <h4 className="font-bold text-forest text-sm pt-2">1. Scope and Ethical Boundary</h4>
              <p>
                MINDSPACE 2026 is dedicated to creating a safe, respectful environment. We firmly uphold strict data ethics: 
                <strong> We do not collect, request, or store any sensitive health information, psychological evaluations, medical diagnoses, therapy histories, or personal trauma records.</strong>
              </p>

              <h4 className="font-bold text-forest text-sm pt-2">2. Information We Collect</h4>
              <p>
                To organize festival attendance and workshop seating, we collect basic directory info provided voluntarily during registration:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Student Full Name</li>
                <li>Official College/Institutional Email Address</li>
                <li>Department / Course & Semester/Year of Study</li>
                <li>Optional Contact Number (solely for urgent schedule change notifications)</li>
                <li>Selected Workshop and Activity preferences</li>
              </ul>

              <h4 className="font-bold text-forest text-sm pt-2">3. How Your Information Is Used</h4>
              <p>
                Your registration records are exclusively used by the student organizing committee to manage venue capacity, prevent workshop overcrowding, and issue digital entry passes.
              </p>

              <h4 className="font-bold text-forest text-sm pt-2">4. Zero Commercial Sharing</h4>
              <p>
                Student information is never sold, leased, or disclosed to advertising networks, commercial recruiters, or unrelated third parties.
              </p>

              <h4 className="font-bold text-forest text-sm pt-2">5. Data Retention & Erasure</h4>
              <p>
                Registration records are maintained only for the duration of the festival and post-event attendance certification. Students may request complete deletion of their registration by contacting the official organizer desk.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-forest">
                Participation Guidelines • MINDSPACE 2026
              </p>

              <h4 className="font-bold text-forest text-sm pt-2">1. Respect and Mutual Safety</h4>
              <p>
                MINDSPACE is a peer-supported safe space. All attendees agree to interact with kindness, empathy, and confidentiality. Mocking, harassment, hate speech, or sharing another attendee's personal reflections without their explicit consent is strictly prohibited.
              </p>

              <h4 className="font-bold text-forest text-sm pt-2">2. Educational & Peer Support Nature</h4>
              <p>
                All activities, workshops, mindfulness circles, and discussions are educational in nature. They do not constitute formal psychotherapy, psychiatric intervention, or medical advice.
              </p>

              <h4 className="font-bold text-forest text-sm pt-2">3. Voluntary Participation</h4>
              <p>
                Participation in every activity is strictly voluntary. You are free to take a break, step out of a session, or observe quietly at any time without needing to justify your departure.
              </p>

              <h4 className="font-bold text-forest text-sm pt-2">4. Punctuality and Seating</h4>
              <p>
                Due to venue seating constraints and safety protocols, registered seats for workshops (e.g. Art Therapy, Stress Management) are held until 5 minutes before session start, after which walk-ins from the waiting line may be admitted.
              </p>

              <h4 className="font-bold text-forest text-sm pt-2">5. Need For Professional Assistance</h4>
              <p>
                If at any point during the festival you experience acute emotional distress, our peer hosts can guide you to on-site volunteer counselors or provide immediate access to national support helplines.
              </p>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-cream/70 border-t border-forest/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-forest text-cream text-xs font-semibold hover:bg-forest-600 transition-colors"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
