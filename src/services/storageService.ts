import type { Activity, EventConfig, Registration, EmotionPost } from '../types';
import { INITIAL_ACTIVITIES, INITIAL_CONFIG, INITIAL_EMOTION_POSTS } from '../data/initialData';

const KEYS = {
  ACTIVITIES: 'mindspace_activities_v2',
  REGISTRATIONS: 'mindspace_registrations_v2',
  CONFIG: 'mindspace_config_v2',
  EMOTIONS: 'mindspace_emotions_v2',
  ADMIN_AUTH: 'mindspace_admin_session_v2'
};

// Initial sample registrations to make the dashboard feel real and useful immediately
const SAMPLE_REGISTRATIONS: Registration[] = [
  {
    registrationId: "MS26-7841",
    timestamp: "2026-10-28T14:32:00.000Z",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@college.edu",
    college: "Institute of Technology & Science",
    department: "Computer Science & Engineering",
    semester: "Semester 5 (Year 3)",
    contactNumber: "+91 98765 43210",
    selectedActivities: ["OPEN MIC — VOICES UNFILTERED", "ART THERAPY-INSPIRED CREATIVE CORNER"],
    preferredTimeSlot: "Full Day / Any Time Slot",
    consent: true,
    status: "confirmed"
  },
  {
    registrationId: "MS26-9214",
    timestamp: "2026-10-29T09:15:00.000Z",
    fullName: "Priya Nair",
    email: "priya.nair@college.edu",
    college: "Institute of Technology & Science",
    department: "Applied Psychology",
    semester: "Semester 3 (Year 2)",
    contactNumber: "+91 98123 45678",
    selectedActivities: ["MINDFULNESS & MEDITATION", "STRESS MANAGEMENT WORKSHOP"],
    preferredTimeSlot: "Morning Slots (10:00 AM – 01:00 PM)",
    consent: true,
    status: "confirmed"
  },
  {
    registrationId: "MS26-5502",
    timestamp: "2026-10-29T16:48:00.000Z",
    fullName: "Rohan Varma",
    email: "rohan.v@college.edu",
    college: "St. Xavier's Academic Campus",
    department: "Media & Visual Arts",
    semester: "Semester 1 (Year 1)",
    contactNumber: "+91 97531 86420",
    selectedActivities: ["HUMAN LIBRARY — LISTEN WITHOUT JUDGMENT"],
    preferredTimeSlot: "Afternoon Slots (01:00 PM – 05:00 PM)",
    consent: true,
    status: "confirmed"
  }
];

class StorageService {
  // Config
  getConfig(): EventConfig {
    try {
      const data = localStorage.getItem(KEYS.CONFIG);
      if (data) {
        return { ...INITIAL_CONFIG, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error("Error reading config from storage", e);
    }
    return INITIAL_CONFIG;
  }

  saveConfig(config: EventConfig): void {
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('mindspace_config_updated', { detail: config }));
  }

  // Activities
  getActivities(): Activity[] {
    try {
      const data = localStorage.getItem(KEYS.ACTIVITIES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading activities from storage", e);
    }
    // initialize if not found
    localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
    return INITIAL_ACTIVITIES;
  }

  saveActivities(activities: Activity[]): void {
    localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(activities));
    window.dispatchEvent(new CustomEvent('mindspace_activities_updated', { detail: activities }));
  }

  updateActivity(id: string, updates: Partial<Activity>): Activity[] {
    const current = this.getActivities();
    const updated = current.map(act => act.id === id ? { ...act, ...updates } : act);
    this.saveActivities(updated);
    return updated;
  }

  // Registrations
  getRegistrations(): Registration[] {
    try {
      const data = localStorage.getItem(KEYS.REGISTRATIONS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading registrations from storage", e);
    }
    // initialize with initial realistic sample data
    localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify(SAMPLE_REGISTRATIONS));
    return SAMPLE_REGISTRATIONS;
  }

  saveRegistrations(registrations: Registration[]): void {
    localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify(registrations));
    window.dispatchEvent(new CustomEvent('mindspace_registrations_updated', { detail: registrations }));
  }

  // Register student
  async registerStudent(newRegistration: Omit<Registration, 'registrationId' | 'timestamp' | 'status'>): Promise<{
    success: boolean;
    registration?: Registration;
    error?: string;
  }> {
    const config = this.getConfig();

    if (config.registrationStatus === 'closed') {
      return { success: false, error: "Registrations are currently closed by the organizers." };
    }

    if (config.registrationStatus === 'paused') {
      return { success: false, error: "Registrations are temporarily paused. Please check back shortly." };
    }

    const currentRegistrations = this.getRegistrations();
    const currentActivities = this.getActivities();

    // Check duplicate: Same email registered for ANY of the selected activities
    const emailNormalized = newRegistration.email.trim().toLowerCase();
    for (const actTitle of newRegistration.selectedActivities) {
      const alreadyRegistered = currentRegistrations.some(reg => 
        reg.email.trim().toLowerCase() === emailNormalized &&
        reg.status !== 'cancelled' &&
        reg.selectedActivities.includes(actTitle)
      );

      if (alreadyRegistered) {
        return {
          success: false,
          error: `This email is already registered for "${actTitle}". Please choose another activity or contact the organizers.`
        };
      }
    }

    // Check capacity for each selected activity
    for (const actTitle of newRegistration.selectedActivities) {
      const act = currentActivities.find(a => a.title === actTitle || a.id === actTitle);
      if (act) {
        if (!act.isOpen) {
          return { success: false, error: `Activity "${act.title}" is currently closed for registration.` };
        }
        if (act.registeredCount >= act.capacity) {
          return { success: false, error: `Activity "${act.title}" has reached full capacity (${act.capacity} seats).` };
        }
      }
    }

    // Generate unique Registration ID e.g. MS26-5892
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `MS26-${randomNum}`;

    const registration: Registration = {
      ...newRegistration,
      registrationId,
      timestamp: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save registration
    const updatedRegistrations = [registration, ...currentRegistrations];
    this.saveRegistrations(updatedRegistrations);

    // Update activity counts
    const updatedActivities = currentActivities.map(act => {
      if (newRegistration.selectedActivities.includes(act.title) || newRegistration.selectedActivities.includes(act.id)) {
        return { ...act, registeredCount: act.registeredCount + 1 };
      }
      return act;
    });
    this.saveActivities(updatedActivities);

    // If Google Sheets webhook is configured, sync in background
    if (config.googleSheetsWebhookUrl && config.googleSheetsWebhookUrl.trim().startsWith('http')) {
      this.syncToGoogleSheets(registration, config.googleSheetsWebhookUrl).catch(err => {
        console.warn("Background Google Sheets sync notice:", err);
      });
    }

    return { success: true, registration };
  }

  // Google Sheets Webhook Sync
  async syncToGoogleSheets(reg: Registration, webhookUrl: string): Promise<boolean> {
    try {
      const payload = {
        action: 'register',
        registrationId: reg.registrationId,
        timestamp: reg.timestamp,
        fullName: reg.fullName,
        email: reg.email,
        college: reg.college,
        department: reg.department,
        semester: reg.semester,
        contactNumber: reg.contactNumber || 'N/A',
        selectedActivities: reg.selectedActivities.join(', '),
        preferredTimeSlot: reg.preferredTimeSlot,
        consent: reg.consent ? 'Agreed' : 'No',
        status: reg.status
      };

      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // standard Apps Script web app endpoint handling
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return true;
    } catch (e) {
      console.error("Google Sheets sync failed:", e);
      return false;
    }
  }

  // Emotions Wall
  getEmotions(): EmotionPost[] {
    try {
      const data = localStorage.getItem(KEYS.EMOTIONS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading emotions", e);
    }
    localStorage.setItem(KEYS.EMOTIONS, JSON.stringify(INITIAL_EMOTION_POSTS));
    return INITIAL_EMOTION_POSTS;
  }

  saveEmotions(posts: EmotionPost[]): void {
    localStorage.setItem(KEYS.EMOTIONS, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent('mindspace_emotions_updated', { detail: posts }));
  }

  addEmotion(text: string, emotion: string, authorTag: string, color: 'sage' | 'lavender' | 'peach' | 'cream'): EmotionPost {
    const posts = this.getEmotions();
    const newPost: EmotionPost = {
      id: `post-${Date.now()}`,
      text: text.trim(),
      emotion: emotion.trim() || 'Mindful',
      authorTag: authorTag.trim() || 'Anonymous Student',
      timestamp: 'Just now',
      likes: 1,
      color
    };
    const updated = [newPost, ...posts];
    this.saveEmotions(updated);
    return newPost;
  }

  likeEmotion(id: string): void {
    const posts = this.getEmotions();
    const updated = posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
    this.saveEmotions(updated);
  }

  // Admin Auth Session
  isAdminLoggedIn(): boolean {
    return sessionStorage.getItem(KEYS.ADMIN_AUTH) === 'true';
  }

  loginAdmin(passcode: string): boolean {
    const config = this.getConfig();
    if (passcode === config.adminPasscodeHash) {
      sessionStorage.setItem(KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  }

  logoutAdmin(): void {
    sessionStorage.removeItem(KEYS.ADMIN_AUTH);
  }

  // Export registrations as CSV with UTF-8 BOM
  exportRegistrationsCSV(): void {
    const registrations = this.getRegistrations();
    if (registrations.length === 0) {
      alert("No registration records found to export.");
      return;
    }

    const headers = [
      "Registration ID",
      "Submission Timestamp",
      "Full Name",
      "College Email",
      "College / Institution",
      "Course / Department",
      "Semester / Year",
      "Contact Number",
      "Selected Activities",
      "Preferred Time Slot",
      "Consent Agreed",
      "Registration Status"
    ];

    const rows = registrations.map(reg => [
      `"${reg.registrationId}"`,
      `"${new Date(reg.timestamp).toLocaleString()}"`,
      `"${reg.fullName.replace(/"/g, '""')}"`,
      `"${reg.email}"`,
      `"${reg.college.replace(/"/g, '""')}"`,
      `"${reg.department.replace(/"/g, '""')}"`,
      `"${reg.semester}"`,
      `"${reg.contactNumber || 'N/A'}"`,
      `"${reg.selectedActivities.join('; ').replace(/"/g, '""')}"`,
      `"${reg.preferredTimeSlot}"`,
      `"${reg.consent ? 'YES' : 'NO'}"`,
      `"${reg.status.toUpperCase()}"`
    ]);

    // UTF-8 BOM for Microsoft Excel compatibility
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MINDSPACE_2026_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const storageService = new StorageService();
