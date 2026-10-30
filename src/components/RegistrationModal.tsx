import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Sparkles, User, Mail, School, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Activity, EventConfig, Registration } from '../types';
import { storageService } from '../services/storageService';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: Activity[];
  config: EventConfig;
  preSelectedActivityTitle?: string;
  onRegistrationSuccess: (registration: Registration) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  activities,
  config,
  preSelectedActivityTitle,
  onRegistrationSuccess,
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('Semester 3 (Year 2)');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Full Day / Flexible');
  const [consent, setConsent] = useState(false);

  // Status & Error handling
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRegistration, setSubmittedRegistration] = useState<Registration | null>(null);

  // Sync pre-selected activity if provided
  useEffect(() => {
    if (preSelectedActivityTitle) {
      setSelectedActivities((prev) => {
        if (!prev.includes(preSelectedActivityTitle)) {
          return [...prev, preSelectedActivityTitle];
        }
        return prev;
      });
    }
  }, [preSelectedActivityTitle]);

  if (!isOpen) return null;

  // Toggle activity selection
  const handleToggleActivity = (title: string) => {
    setSelectedActivities((prev) => {
      if (prev.includes(title)) {
        return prev.filter((t) => t !== title);
      } else {
        return [...prev, title];
      }
    });
    // Clear error
    if (errors.selectedActivities) {
      setErrors((prev) => ({ ...prev, selectedActivities: '' }));
    }
  };

  // Form Validation
  const validateForm = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid college or student email address.';
    }

    if (!college.trim()) {
      errs.college = 'Please enter your college or institution name.';
    }

    if (!department.trim()) {
      errs.department = 'Please state your course or academic department.';
    }

    if (selectedActivities.length === 0) {
      errs.selectedActivities = 'Please select at least one activity to register for.';
    }

    if (!consent) {
      errs.consent = 'You must confirm consent to register for the event.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await storageService.registerStudent({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        college: college.trim(),
        department: department.trim(),
        semester,
        contactNumber: contactNumber.trim() || undefined,
        selectedActivities,
        preferredTimeSlot,
        consent,
      });

      if (!result.success || !result.registration) {
        setSubmitError(result.error || 'Registration failed. Please check the information and try again.');
        setIsSubmitting(false);
        return;
      }

      // Success! Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A8BDA5', '#25483B', '#DCD4F2', '#F1D5C8'],
        });
      } catch (e) {
        // confetti fallback
      }

      setSubmittedRegistration(result.registration);
      onRegistrationSuccess(result.registration);
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFullName('');
    setEmail('');
    setCollege('');
    setDepartment('');
    setSelectedActivities([]);
    setContactNumber('');
    setConsent(false);
    setErrors({});
    setSubmitError(null);
    setSubmittedRegistration(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Background click to dismiss (only if not currently submitting) */}
      <div className="absolute inset-0" onClick={() => !isSubmitting && onClose()} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-lg border border-sage/40 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-forest text-cream p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors disabled:opacity-50"
            aria-label="Close registration modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-peach animate-ping" />
            <span className="text-xs font-semibold tracking-wider uppercase text-peach">
              Student Registration • MINDSPACE 2026
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Reserve Your Place at the Fest
          </h2>

          <p className="text-cream/80 text-xs sm:text-sm mt-1">
            Free entry for college students. Choose single or multiple activities below.
          </p>
        </div>

        {/* Content Body: Either Success View OR Registration Form */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">

          {/* Master Registration Status Notice */}
          {config.registrationStatus !== 'open' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-800">
                <p className="font-bold">Registrations Are Currently {config.registrationStatus.toUpperCase()}</p>
                <p className="mt-0.5">The organizer committee has temporarily disabled new registrations. Please check back later.</p>
              </div>
            </div>
          )}

          {/* SUCCESS SCREEN */}
          {submittedRegistration ? (
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className="w-16 h-16 rounded-full bg-sage/40 text-forest mx-auto flex items-center justify-center shadow-soft">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl font-bold text-forest">
                  You're Confirmed!
                </h3>
                <p className="text-sm text-forest/75 max-w-md mx-auto">
                  Thank you, <strong>{submittedRegistration.fullName}</strong>. Your place has been reserved for MINDSPACE 2026.
                </p>
              </div>

              {/* Confirmation ID Card */}
              <div className="p-5 rounded-2xl bg-cream border border-forest/15 max-w-sm mx-auto space-y-2 text-left">
                <div className="flex items-center justify-between text-xs text-forest/60">
                  <span>Unique Registration ID</span>
                  <span className="text-emerald-700 font-semibold uppercase">Confirmed</span>
                </div>
                <p className="font-mono text-2xl font-bold text-forest tracking-wider">
                  {submittedRegistration.registrationId}
                </p>
                <div className="text-xs text-forest/70 pt-2 border-t border-forest/10 space-y-1">
                  <p><strong>Registered Activities:</strong> {submittedRegistration.selectedActivities.join(', ')}</p>
                  <p><strong>Email:</strong> {submittedRegistration.email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-forest text-cream text-sm font-semibold hover:bg-forest-600 transition-colors shadow-soft"
                >
                  View / Print Digital Pass
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-forest/20 text-forest text-sm font-semibold hover:bg-cream transition-colors"
                >
                  Register Another Student
                </button>
              </div>
            </div>
          ) : (

            /* REGISTRATION FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Privacy / No-Sensitive-Data Assurance */}
              <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage/40 flex items-start gap-2.5 text-xs text-forest/80">
                <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Student Privacy Guarantee:</strong> We do not ask for or store medical history, therapy records, or personal diagnoses. This form is strictly for event logistics and workshop capacity.
                </span>
              </div>

              {/* General Error Banner */}
              {submitError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Row 1: Full Name & College Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-forest/60" /> Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya Sen"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/30 transition-all ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-sage/50 bg-cream/30'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 font-medium">{errors.fullName}</p>}
                </div>

                {/* College Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-forest/60" /> College Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ananya.s@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/30 transition-all ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-sage/50 bg-cream/30'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
                </div>

              </div>

              {/* Row 2: College & Course/Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* College / Institution */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1">
                    <School className="w-3.5 h-3.5 text-forest/60" /> College / Institution <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. University Campus / College Name"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/30 transition-all ${
                      errors.college ? 'border-rose-400 bg-rose-50/30' : 'border-sage/50 bg-cream/30'
                    }`}
                  />
                  {errors.college && <p className="text-[11px] text-rose-600 font-medium">{errors.college}</p>}
                </div>

                {/* Course / Department */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-forest/60" /> Course / Department <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech CS / Psychology / Arts"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/30 transition-all ${
                      errors.department ? 'border-rose-400 bg-rose-50/30' : 'border-sage/50 bg-cream/30'
                    }`}
                  />
                  {errors.department && <p className="text-[11px] text-rose-600 font-medium">{errors.department}</p>}
                </div>

              </div>

              {/* Row 3: Semester/Year & Contact Number (optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Semester / Year */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider">
                    Semester / Year <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sage/50 bg-cream/30 text-sm text-forest focus:outline-none focus:ring-2 focus:ring-forest/30"
                  >
                    <option value="Semester 1 (Year 1 - Fresher)">Semester 1 (Year 1 - Fresher)</option>
                    <option value="Semester 2 (Year 1)">Semester 2 (Year 1)</option>
                    <option value="Semester 3 (Year 2)">Semester 3 (Year 2)</option>
                    <option value="Semester 4 (Year 2)">Semester 4 (Year 2)</option>
                    <option value="Semester 5 (Year 3)">Semester 5 (Year 3)</option>
                    <option value="Semester 6 (Year 3)">Semester 6 (Year 3)</option>
                    <option value="Semester 7/8 (Year 4 - Final)">Semester 7/8 (Year 4 - Final)</option>
                    <option value="Postgraduate / Masters Scholar">Postgraduate / Masters Scholar</option>
                  </select>
                </div>

                {/* Optional Contact Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider">
                    Contact Number <span className="text-forest/40 text-[10px] font-normal">(Optional for SMS updates)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sage/50 bg-cream/30 text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/30"
                  />
                </div>

              </div>

              {/* Select Activities (Multiple Allowed) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider">
                    Select Activities to Attend <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[11px] text-forest/60">
                    {selectedActivities.length} selected (Multiple allowed)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto p-3 rounded-2xl bg-cream/50 border border-sage/40">
                  {activities.map((act) => {
                    const isSelected = selectedActivities.includes(act.title);
                    const isFull = act.registeredCount >= act.capacity;

                    return (
                      <button
                        type="button"
                        key={act.id}
                        disabled={!act.isOpen || isFull}
                        onClick={() => handleToggleActivity(act.title)}
                        className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-forest text-cream border-forest shadow-sm'
                            : !act.isOpen || isFull
                            ? 'bg-forest/5 text-forest/40 border-forest/10 cursor-not-allowed opacity-60'
                            : 'bg-white text-forest border-sage/40 hover:border-forest/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-xs font-bold line-clamp-1">{act.title}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                              isSelected ? 'bg-peach text-forest' : 'bg-cream text-forest/70'
                            }`}
                          >
                            {act.duration}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[10px]">
                          <span className={isSelected ? 'text-cream/80' : 'text-forest/60'}>
                            {act.category}
                          </span>
                          <span className={isFull ? 'text-rose-500 font-bold' : isSelected ? 'text-cream/90' : 'text-forest/70'}>
                            {isFull ? 'Full' : `${act.capacity - act.registeredCount} spots left`}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.selectedActivities && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.selectedActivities}</p>
                )}
              </div>

              {/* Preferred Time Slot */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-forest/60" /> Preferred Time Slot
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-sage/50 bg-cream/30 text-sm text-forest focus:outline-none focus:ring-2 focus:ring-forest/30"
                >
                  <option value="Full Day / Flexible">Full Day / Flexible (Attend multiple sessions)</option>
                  <option value="Morning Slots (10:00 AM – 01:00 PM)">Morning Slots (10:00 AM – 01:00 PM)</option>
                  <option value="Afternoon Slots (01:00 PM – 04:30 PM)">Afternoon Slots (01:00 PM – 04:30 PM)</option>
                  <option value="Evening Closing & Open Mic (04:30 PM – 06:00 PM)">Evening Closing & Open Mic (04:30 PM – 06:00 PM)</option>
                </select>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-forest focus:ring-forest border-sage/60"
                  />
                  <span className="text-xs text-forest/80 leading-relaxed group-hover:text-forest">
                    I confirm that I am a college student and agree to the use of my registration details for event check-in and festival communications by the College Mental Health Fest Committee. <span className="text-rose-600">*</span>
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] text-rose-600 font-medium mt-1">{errors.consent}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-forest/10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl border border-forest/20 text-forest text-sm font-semibold hover:bg-cream transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || config.registrationStatus !== 'open'}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-forest text-cream font-semibold text-sm hover:bg-forest-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-peach" />
                      <span>Securing Your Spot...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-peach" />
                      <span>Confirm Registration</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
