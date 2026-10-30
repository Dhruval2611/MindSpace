export type ActivityCategory = 
  | 'Expression' 
  | 'Creativity' 
  | 'Wellness' 
  | 'Awareness' 
  | 'Connection' 
  | 'Learning' 
  | 'Games';

export interface Activity {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ActivityCategory;
  duration: string;
  capacity: number;
  registeredCount: number;
  isProposed: boolean;
  isOpen: boolean;
  timeSlot: string;
  venue: string;
  highlights: string[];
  whatToBring?: string;
}

export interface Registration {
  registrationId: string;
  timestamp: string;
  fullName: string;
  email: string;
  college: string;
  department: string;
  semester: string;
  contactNumber?: string;
  selectedActivities: string[]; // activity titles or IDs
  preferredTimeSlot: string;
  consent: boolean;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
}

export interface EventConfig {
  festName: string;
  tagline: string;
  expectedDates: string;
  venuePlaceholder: string;
  collegePlaceholder: string;
  organizerPlaceholder: string;
  officialEmailPlaceholder: string;
  instagramPlaceholder: string;
  registrationStatus: 'open' | 'closed' | 'paused';
  entryInfo: string;
  googleSheetsWebhookUrl?: string;
  adminPasscodeHash: string; // default hashed/stored securely
}

export interface EmotionPost {
  id: string;
  text: string;
  emotion: string;
  authorTag: string;
  timestamp: string;
  likes: number;
  color: 'sage' | 'lavender' | 'peach' | 'cream';
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  category: string;
  description: string;
  location: string;
  speakerOrHost: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPlaceholderConfirmed: boolean;
}
