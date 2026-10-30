import React from 'react';
import { X, Printer, CheckCircle2, Calendar, MapPin, QrCode } from 'lucide-react';
import type { Registration } from '../types';

interface DigitalPassModalProps {
  registration: Registration | null;
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({ registration, onClose }) => {
  if (!registration) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-soft-lg border border-sage/40 overflow-hidden z-10 flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="p-4 bg-cream border-b border-forest/10 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-forest uppercase tracking-wider">
              Official Festival Entry Pass
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest text-cream text-xs font-semibold hover:bg-forest-600 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-forest/70 hover:bg-forest/10"
              aria-label="Close pass modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Pass Container */}
        <div id="printable-registration-pass" className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white via-cream/40 to-sage-50/50">
          
          {/* Festival Header on Ticket */}
          <div className="flex items-start justify-between border-b border-dashed border-forest/20 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-2xl tracking-wide text-forest">
                  MINDSPACE
                </span>
                <span className="bg-forest text-cream text-xs font-bold px-2 py-0.5 rounded-md">
                  2026
                </span>
              </div>
              <p className="text-xs text-forest/70 font-medium italic mt-0.5">
                “Your Mind Matters. Your Story Matters.”
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-forest/50">Registration ID</span>
              <p className="font-mono text-base font-bold text-forest bg-sage/30 px-2.5 py-1 rounded-lg">
                {registration.registrationId}
              </p>
            </div>
          </div>

          {/* Attendee Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-forest/50 font-bold uppercase tracking-wider text-[10px]">Student Name</span>
              <p className="font-bold text-sm text-forest mt-0.5">{registration.fullName}</p>
            </div>

            <div>
              <span className="text-forest/50 font-bold uppercase tracking-wider text-[10px]">College Email</span>
              <p className="font-medium text-forest mt-0.5 truncate">{registration.email}</p>
            </div>

            <div>
              <span className="text-forest/50 font-bold uppercase tracking-wider text-[10px]">Department & Semester</span>
              <p className="font-medium text-forest mt-0.5">
                {registration.department} • {registration.semester}
              </p>
            </div>

            <div>
              <span className="text-forest/50 font-bold uppercase tracking-wider text-[10px]">Institution</span>
              <p className="font-medium text-forest mt-0.5 truncate">{registration.college}</p>
            </div>
          </div>

          {/* Registered Activities List */}
          <div className="p-4 rounded-2xl bg-white border border-sage/40 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-bold text-forest/60 tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
              Registered Activities ({registration.selectedActivities.length})
            </span>
            <ul className="space-y-1.5">
              {registration.selectedActivities.map((act, index) => (
                <li key={index} className="text-xs font-bold text-forest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-peach-500" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Date & Time Slot Information */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-cream p-3 rounded-2xl border border-forest/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-forest/60" />
              <div>
                <p className="text-[10px] text-forest/60 font-bold uppercase">Dates</p>
                <p className="font-semibold text-forest">First week Nov 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-forest/60" />
              <div>
                <p className="text-[10px] text-forest/60 font-bold uppercase">Slot</p>
                <p className="font-semibold text-forest truncate">{registration.preferredTimeSlot}</p>
              </div>
            </div>
          </div>

          {/* Ticket Barcode / QR Simulation & Verification Footer */}
          <div className="pt-3 border-t border-dashed border-forest/20 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-forest/60">
                Registered on {new Date(registration.timestamp).toLocaleDateString()}
              </p>
              <p className="text-[10px] font-semibold text-forest">
                Present this digital pass or student ID at festival check-in.
              </p>
            </div>

            {/* Simulated QR Code Graphic */}
            <div className="w-14 h-14 bg-white p-1 rounded-xl border border-forest/20 flex items-center justify-center shadow-xs">
              <QrCode className="w-12 h-12 text-forest" />
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-cream/60 border-t border-forest/10 flex items-center justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-forest text-cream text-xs font-semibold hover:bg-forest-600 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
