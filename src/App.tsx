import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ActivitiesExplorer } from './components/ActivitiesExplorer';
import { ScheduleSection } from './components/ScheduleSection';
import { AwarenessCorner } from './components/AwarenessCorner';
import { EmotionWallInteractive } from './components/EmotionWallInteractive';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { DigitalPassModal } from './components/DigitalPassModal';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { PolicyModals } from './components/PolicyModals';
import type { Activity, EventConfig, Registration } from './types';
import { storageService } from './services/storageService';

export const App: React.FC = () => {
  // Global config and activities state
  const [config, setConfig] = useState<EventConfig>(() => storageService.getConfig());
  const [activities, setActivities] = useState<Activity[]>(() => storageService.getActivities());

  // Modals & Panels
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [preSelectedActivity, setPreSelectedActivity] = useState<string | undefined>(undefined);
  const [activePassRegistration, setActivePassRegistration] = useState<Registration | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  // Sync state when storage changes
  useEffect(() => {
    const handleConfigChange = (e: any) => {
      setConfig(e.detail || storageService.getConfig());
    };
    const handleActivitiesChange = (e: any) => {
      setActivities(e.detail || storageService.getActivities());
    };

    window.addEventListener('mindspace_config_updated', handleConfigChange);
    window.addEventListener('mindspace_activities_updated', handleActivitiesChange);

    return () => {
      window.removeEventListener('mindspace_config_updated', handleConfigChange);
      window.removeEventListener('mindspace_activities_updated', handleActivitiesChange);
    };
  }, []);

  // Handlers
  const handleOpenRegister = (activityTitle?: string) => {
    setPreSelectedActivity(activityTitle);
    setIsRegisterOpen(true);
  };

  const handleRegistrationComplete = (registration: Registration) => {
    // Show digital pass modal upon successful registration
    setActivePassRegistration(registration);
    // Refresh activities to update seat counts
    setActivities(storageService.getActivities());
  };

  const scrollToActivities = () => {
    const el = document.getElementById('activities');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-forest flex flex-col font-sans selection:bg-sage selection:text-forest-900">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        config={config}
        onOpenRegister={() => handleOpenRegister()}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          config={config}
          onOpenRegister={() => handleOpenRegister()}
          onExploreActivities={scrollToActivities}
        />

        {/* 2. About the Fest ("A Little Space to Breathe.") */}
        <About />

        {/* 3. Activities / Event Explorer (10 Proposed Activities) */}
        <ActivitiesExplorer
          activities={activities}
          onRegisterActivity={(title) => handleOpenRegister(title)}
        />

        {/* 4. Event Schedule (Tentative Flow) */}
        <ScheduleSection />

        {/* 5. Mental Health Awareness Corner ("Let’s Talk About Mental Health") */}
        <AwarenessCorner />

        {/* 6. Interactive Emotion Wall (Activity #5 Realization) */}
        <EmotionWallInteractive />

        {/* 7. FAQ Section */}
        <FAQSection />

      </main>

      {/* 8. Footer */}
      <Footer
        config={config}
        onOpenPrivacy={() => setPolicyType('privacy')}
        onOpenTerms={() => setPolicyType('terms')}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Registration Modal Dialog */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        activities={activities}
        config={config}
        preSelectedActivityTitle={preSelectedActivity}
        onRegistrationSuccess={handleRegistrationComplete}
      />

      {/* Digital Pass Modal (Downloadable & Printable Entry Card) */}
      <DigitalPassModal
        registration={activePassRegistration}
        onClose={() => setActivePassRegistration(null)}
      />

      {/* Organizer Administrator Console & Settings */}
      <OrganizerDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        config={config}
        onConfigUpdated={(newConfig) => setConfig(newConfig)}
        activities={activities}
        onActivitiesUpdated={(newActs) => setActivities(newActs)}
      />

      {/* Privacy Policy & Terms Modal */}
      <PolicyModals
        type={policyType}
        onClose={() => setPolicyType(null)}
      />

    </div>
  );
};

export default App;
