import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Users, 
  Calendar, 
  Download, 
  Search, 
  Settings, 
  Edit3, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Save, 
  Database, 
  Copy, 
  ShieldCheck
} from 'lucide-react';
import type { Activity, EventConfig, Registration } from '../types';
import { storageService } from '../services/storageService';
import { GOOGLE_APPS_SCRIPT_CODE } from '../services/googleSheetsGuide';

interface OrganizerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: EventConfig;
  onConfigUpdated: (config: EventConfig) => void;
  activities: Activity[];
  onActivitiesUpdated: (activities: Activity[]) => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({
  isOpen,
  onClose,
  config,
  onConfigUpdated,
  activities,
  onActivitiesUpdated,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations' | 'activities' | 'settings' | 'google-sheets'>('overview');

  // Registrations state
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivityFilter, setSelectedActivityFilter] = useState('All');

  // Activity Edit State
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Settings State
  const [settingsForm, setSettingsForm] = useState<EventConfig>(config);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState('');
  const [copyNotice, setCopyNotice] = useState(false);

  // Load state on mount / open
  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(storageService.isAdminLoggedIn());
      setRegistrations(storageService.getRegistrations());
      setSettingsForm(config);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (storageService.loginAdmin(passcodeInput.trim())) {
      setIsAuthenticated(true);
      setPasscodeInput('');
    } else {
      setAuthError('Incorrect organizer passcode. Default demo passcode is "mindspace2026".');
    }
  };

  const handleLogout = () => {
    storageService.logoutAdmin();
    setIsAuthenticated(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    storageService.exportRegistrationsCSV();
  };

  // Activity edit handlers
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity) return;

    const updated = storageService.updateActivity(editingActivity.id, editingActivity);
    onActivitiesUpdated(updated);
    setEditingActivity(null);
    setSaveSuccessNotice('Activity details updated successfully!');
    setTimeout(() => setSaveSuccessNotice(''), 3000);
  };

  const handleToggleActivityStatus = (id: string, currentStatus: boolean) => {
    const updated = storageService.updateActivity(id, { isOpen: !currentStatus });
    onActivitiesUpdated(updated);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveConfig(settingsForm);
    onConfigUpdated(settingsForm);
    setSaveSuccessNotice('Festival configuration and placeholders saved!');
    setTimeout(() => setSaveSuccessNotice(''), 3500);
  };

  // Copy Google Apps Script
  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopyNotice(true);
    setTimeout(() => setCopyNotice(false), 2500);
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      reg.fullName.toLowerCase().includes(q) ||
      reg.email.toLowerCase().includes(q) ||
      reg.registrationId.toLowerCase().includes(q) ||
      reg.department.toLowerCase().includes(q);

    const matchesActivity =
      selectedActivityFilter === 'All' ||
      reg.selectedActivities.includes(selectedActivityFilter);

    return matchesSearch && matchesActivity;
  });

  // KPI calculations
  const totalRegistrations = registrations.length;
  const totalCapacity = activities.reduce((sum, a) => sum + a.capacity, 0);
  const totalSpotsFilled = activities.reduce((sum, a) => sum + a.registeredCount, 0);
  const averageFillRate = Math.round((totalSpotsFilled / totalCapacity) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-forest/60 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-soft-lg border border-sage/40 overflow-hidden z-10 h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Top Bar */}
        <div className="bg-forest text-cream p-4 sm:p-6 flex items-center justify-between border-b border-forest-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cream/10 border border-white/20 flex items-center justify-center text-peach">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-2xl font-bold">
                  Organizer & Committee Dashboard
                </h2>
                <span className="text-[10px] font-semibold bg-peach text-forest px-2 py-0.5 rounded-full">
                  Admin Control
                </span>
              </div>
              <p className="text-xs text-cream/70">
                Manage activities, live student enrollments, capacity limits, and backend integrations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-cream transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Dashboard</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full text-cream/70 hover:bg-white/10"
              aria-label="Close dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NOT AUTHENTICATED: AUTHENTICATION GATE */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-cream/40">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-sage/50 shadow-soft space-y-6 text-center">
              
              <div className="w-16 h-16 rounded-2xl bg-forest text-cream mx-auto flex items-center justify-center shadow-soft">
                <Lock className="w-8 h-8 text-peach" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl font-bold text-forest">
                  Organizer Passcode Required
                </h3>
                <p className="text-xs text-forest/70 leading-relaxed">
                  To protect student privacy and attendance data, access to registration records is restricted to fest organizers.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-left flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider">
                    Enter Committee Passcode
                  </label>
                  <input
                    type="password"
                    placeholder="Enter admin passcode"
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sage/60 text-sm text-forest focus:outline-none focus:ring-2 focus:ring-forest/30"
                  />
                  <p className="text-[11px] text-forest/50 mt-1">
                    Demo default passcode: <strong className="font-mono text-forest">mindspace2026</strong> (can be updated inside settings).
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-forest text-cream text-xs font-bold uppercase tracking-wider hover:bg-forest-600 transition-colors shadow-soft"
                >
                  Unlock Organizer Console
                </button>
              </form>

              <div className="p-3 rounded-xl bg-cream border border-forest/10 text-[11px] text-forest/60">
                Notice: If you are an evaluator or student demonstrator, use the default passcode above to explore all features.
              </div>

            </div>
          </div>
        ) : (

          /* AUTHENTICATED: MAIN DASHBOARD TABS */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Navigation */}
            <div className="bg-cream/60 px-6 border-b border-forest/10 flex items-center justify-between gap-4 overflow-x-auto">
              <div className="flex items-center gap-1 sm:gap-3 py-2.5">
                {[
                  { id: 'overview', label: 'Fest Overview', icon: Layers },
                  { id: 'registrations', label: `Registrations (${registrations.length})`, icon: Users },
                  { id: 'activities', label: 'Activity Manager', icon: Calendar },
                  { id: 'settings', label: 'Fest Settings', icon: Settings },
                  { id: 'google-sheets', label: 'Google Sheets Sync', icon: Database },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-forest text-cream shadow-xs'
                          : 'text-forest/70 hover:text-forest hover:bg-white/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick CSV Export Button */}
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-sage/50 text-forest text-xs font-semibold hover:bg-cream transition-colors flex-shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-forest" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Notification alert banner */}
            {saveSuccessNotice && (
              <div className="bg-emerald-50 text-emerald-800 text-xs px-6 py-2.5 border-b border-emerald-200 flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{saveSuccessNotice}</span>
              </div>
            )}

            {/* Content Body per Tab */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">

              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  
                  {/* KPI Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-3xl bg-cream border border-sage/40 space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-forest/60">Total Students Registered</span>
                      <p className="font-serif text-3xl font-bold text-forest">{totalRegistrations}</p>
                      <span className="text-[11px] text-emerald-700 font-medium">Active & verified entries</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-cream border border-sage/40 space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-forest/60">Total Activity Seats</span>
                      <p className="font-serif text-3xl font-bold text-forest">{totalSpotsFilled} / {totalCapacity}</p>
                      <span className="text-[11px] text-forest/60 font-medium">{averageFillRate}% overall engagement</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-cream border border-sage/40 space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-forest/60">Proposed Activities</span>
                      <p className="font-serif text-3xl font-bold text-forest">{activities.length}</p>
                      <span className="text-[11px] text-forest/60 font-medium">Ready for schedule lock</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-cream border border-sage/40 space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-forest/60">Master Registration Switch</span>
                      <p className="font-serif text-2xl font-bold text-forest capitalize">{config.registrationStatus}</p>
                      <span className={`text-[11px] font-semibold ${config.registrationStatus === 'open' ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {config.registrationStatus === 'open' ? 'Accepting student forms' : 'Form submissions restricted'}
                      </span>
                    </div>
                  </div>

                  {/* Activity Enrollment Breakdown */}
                  <div className="p-6 rounded-3xl bg-white border border-sage/40 shadow-soft space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-forest">Activity Enrollment & Capacity Status</h3>
                        <p className="text-xs text-forest/60">Real-time enrollment tracker across all 10 festival workshops.</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('activities')}
                        className="text-xs font-bold text-forest hover:underline"
                      >
                        Edit Capacities →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {activities.map((act) => {
                        const pct = Math.min(100, Math.round((act.registeredCount / act.capacity) * 100));
                        return (
                          <div key={act.id} className="p-3.5 rounded-2xl bg-cream/40 border border-sage/30 space-y-2">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="text-forest line-clamp-1">{act.title}</span>
                              <span className="text-forest/70">{act.registeredCount} / {act.capacity} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-cream overflow-hidden">
                              <div
                                className={`h-full rounded-full ${pct >= 100 ? 'bg-rose-500' : pct > 75 ? 'bg-amber-500' : 'bg-forest'}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Registrations Quick Table */}
                  <div className="p-6 rounded-3xl bg-white border border-sage/40 shadow-soft space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-bold text-forest">Recent Registrations</h3>
                      <button
                        onClick={() => setActiveTab('registrations')}
                        className="text-xs font-bold text-forest hover:underline"
                      >
                        View All Registrations →
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-forest/10 text-forest/60 uppercase">
                            <th className="py-2">Reg ID</th>
                            <th className="py-2">Student Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Activities</th>
                            <th className="py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-forest/5">
                          {registrations.slice(0, 5).map((r) => (
                            <tr key={r.registrationId} className="hover:bg-cream/40">
                              <td className="py-3 font-mono font-bold text-forest">{r.registrationId}</td>
                              <td className="py-3 font-semibold text-forest">{r.fullName}</td>
                              <td className="py-3 text-forest/70">{r.email}</td>
                              <td className="py-3 text-forest/80 truncate max-w-xs">{r.selectedActivities.join(', ')}</td>
                              <td className="py-3">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[10px]">
                                  {r.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: REGISTRATIONS LIST & EXPORT */}
              {activeTab === 'registrations' && (
                <div className="space-y-6">
                  
                  {/* Filters Bar */}
                  <div className="p-4 rounded-2xl bg-cream border border-sage/40 flex flex-col md:flex-row gap-3 items-center justify-between">
                    
                    <div className="relative w-full md:w-80">
                      <Search className="w-4 h-4 text-forest/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search student, email, ID, or dept..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-sage/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-forest/30"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <select
                        value={selectedActivityFilter}
                        onChange={(e) => setSelectedActivityFilter(e.target.value)}
                        className="px-3 py-2 text-xs rounded-xl border border-sage/50 bg-white text-forest focus:outline-none"
                      >
                        <option value="All">All Registered Activities</option>
                        {activities.map((act) => (
                          <option key={act.id} value={act.title}>
                            {act.title}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest text-cream text-xs font-semibold hover:bg-forest-600 transition-colors shadow-soft"
                      >
                        <Download className="w-3.5 h-3.5 text-peach" />
                        <span>Export CSV</span>
                      </button>
                    </div>

                  </div>

                  {/* Registrations Full Table */}
                  <div className="rounded-3xl bg-white border border-sage/40 shadow-soft overflow-hidden">
                    <div className="overflow-x-auto max-h-[500px]">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-cream sticky top-0 border-b border-forest/10 text-forest/70 uppercase">
                          <tr>
                            <th className="p-3.5 font-bold">ID</th>
                            <th className="p-3.5 font-bold">Timestamp</th>
                            <th className="p-3.5 font-bold">Full Name</th>
                            <th className="p-3.5 font-bold">Email</th>
                            <th className="p-3.5 font-bold">Institution / Department</th>
                            <th className="p-3.5 font-bold">Semester</th>
                            <th className="p-3.5 font-bold">Selected Activities</th>
                            <th className="p-3.5 font-bold">Time Slot</th>
                            <th className="p-3.5 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-forest/5">
                          {filteredRegistrations.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="text-center py-12 text-forest/60">
                                No student registrations match your filter criteria.
                              </td>
                            </tr>
                          ) : (
                            filteredRegistrations.map((reg) => (
                              <tr key={reg.registrationId} className="hover:bg-cream/30 transition-colors">
                                <td className="p-3.5 font-mono font-bold text-forest">{reg.registrationId}</td>
                                <td className="p-3.5 text-forest/60">{new Date(reg.timestamp).toLocaleDateString()}</td>
                                <td className="p-3.5 font-semibold text-forest">{reg.fullName}</td>
                                <td className="p-3.5 text-forest/80 font-mono">{reg.email}</td>
                                <td className="p-3.5 text-forest/80">
                                  <span className="block font-medium">{reg.college}</span>
                                  <span className="text-[11px] text-forest/60">{reg.department}</span>
                                </td>
                                <td className="p-3.5 text-forest/70">{reg.semester}</td>
                                <td className="p-3.5 text-forest/90 font-medium max-w-xs">
                                  <ul className="list-disc pl-3 space-y-0.5">
                                    {reg.selectedActivities.map((a, i) => (
                                      <li key={i} className="line-clamp-1">{a}</li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="p-3.5 text-forest/70">{reg.preferredTimeSlot}</td>
                                <td className="p-3.5">
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                                    {reg.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 bg-cream/50 border-t border-forest/10 text-xs text-forest/60 flex items-center justify-between">
                      <span>Showing {filteredRegistrations.length} of {registrations.length} registrations</span>
                      <span className="font-semibold text-forest">Export CSV supports Excel and Google Sheets</span>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: ACTIVITY MANAGER */}
              {activeTab === 'activities' && (
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-forest">Activity Manager</h3>
                      <p className="text-xs text-forest/70">Modify session limits, change proposed descriptions, or toggle registration availability.</p>
                    </div>
                  </div>

                  {/* Activities Table */}
                  <div className="rounded-3xl bg-white border border-sage/40 shadow-soft overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-cream border-b border-forest/10 text-forest/70 uppercase">
                          <tr>
                            <th className="p-3.5 font-bold">Activity Name</th>
                            <th className="p-3.5 font-bold">Category</th>
                            <th className="p-3.5 font-bold">Duration</th>
                            <th className="p-3.5 font-bold">Capacity</th>
                            <th className="p-3.5 font-bold">Registered</th>
                            <th className="p-3.5 font-bold">Status</th>
                            <th className="p-3.5 font-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-forest/5">
                          {activities.map((act) => (
                            <tr key={act.id} className="hover:bg-cream/30">
                              <td className="p-3.5 font-bold text-forest">{act.title}</td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 rounded-full bg-sage/30 text-forest text-[10px] font-semibold">
                                  {act.category}
                                </span>
                              </td>
                              <td className="p-3.5 text-forest/70">{act.duration}</td>
                              <td className="p-3.5 font-mono font-bold text-forest">{act.capacity} seats</td>
                              <td className="p-3.5 font-mono text-forest/80">{act.registeredCount}</td>
                              <td className="p-3.5">
                                <button
                                  onClick={() => handleToggleActivityStatus(act.id, act.isOpen)}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                                    act.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}
                                >
                                  {act.isOpen ? 'Open' : 'Closed'}
                                </button>
                              </td>
                              <td className="p-3.5">
                                <button
                                  onClick={() => setEditingActivity(act)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cream hover:bg-sage/30 text-forest text-xs font-semibold border border-forest/15 transition-colors"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Edit</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Edit Activity Modal Sub-dialog */}
                  {editingActivity && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/40 backdrop-blur-xs">
                      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-sage/50 shadow-soft-lg space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-forest/10">
                          <h4 className="font-serif text-xl font-bold text-forest">Edit Activity</h4>
                          <button onClick={() => setEditingActivity(null)} className="text-forest/60 hover:text-forest">
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <form onSubmit={handleSaveActivity} className="space-y-4 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-forest uppercase">Activity Title</label>
                            <input
                              type="text"
                              value={editingActivity.title}
                              onChange={(e) => setEditingActivity({ ...editingActivity, title: e.target.value })}
                              className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-forest uppercase">Short Description</label>
                            <textarea
                              rows={2}
                              value={editingActivity.shortDescription}
                              onChange={(e) => setEditingActivity({ ...editingActivity, shortDescription: e.target.value })}
                              className="w-full p-2.5 rounded-xl border border-sage/60 text-xs text-forest"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="font-bold text-forest uppercase">Capacity</label>
                              <input
                                type="number"
                                min={1}
                                max={500}
                                value={editingActivity.capacity}
                                onChange={(e) => setEditingActivity({ ...editingActivity, capacity: parseInt(e.target.value) || 30 })}
                                className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-bold text-forest uppercase">Duration</label>
                              <input
                                type="text"
                                value={editingActivity.duration}
                                onChange={(e) => setEditingActivity({ ...editingActivity, duration: e.target.value })}
                                className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-forest uppercase">Tentative Time Slot</label>
                            <input
                              type="text"
                              value={editingActivity.timeSlot}
                              onChange={(e) => setEditingActivity({ ...editingActivity, timeSlot: e.target.value })}
                              className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest"
                            />
                          </div>

                          <div className="pt-3 border-t border-forest/10 flex items-center justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setEditingActivity(null)}
                              className="px-4 py-2 rounded-xl border border-forest/20 text-forest font-semibold"
                            >
                              Cancel
                            </button>

                            <button
                              type="submit"
                              className="px-5 py-2 rounded-xl bg-forest text-cream font-semibold hover:bg-forest-600 shadow-soft"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 4: FEST SETTINGS & PLACEHOLDERS */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-3xl">
                  
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-forest">Festival Metadata & Placeholders</h3>
                    <p className="text-xs text-forest/70">Update organizer details and campus placeholders without touching code.</p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                    
                    {/* Master Registration Switch */}
                    <div className="p-4 rounded-2xl bg-cream border border-sage/40 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-forest text-sm">Master Registration Control</p>
                        <p className="text-forest/70 text-xs">Toggle to open, pause, or close all public registrations instantly.</p>
                      </div>

                      <select
                        value={settingsForm.registrationStatus}
                        onChange={(e) => setSettingsForm({ ...settingsForm, registrationStatus: e.target.value as any })}
                        className="px-3 py-2 rounded-xl border border-sage/60 bg-white font-bold text-xs text-forest"
                      >
                        <option value="open">Open (Publicly Active)</option>
                        <option value="paused">Paused (Temporary Hold)</option>
                        <option value="closed">Closed (Fest Full)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="font-bold text-forest uppercase">Fest Name</label>
                        <input
                          type="text"
                          value={settingsForm.festName}
                          onChange={(e) => setSettingsForm({ ...settingsForm, festName: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-forest uppercase">Fest Tagline</label>
                        <input
                          type="text"
                          value={settingsForm.tagline}
                          onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-forest uppercase">College Name Placeholder</label>
                        <input
                          type="text"
                          value={settingsForm.collegePlaceholder}
                          onChange={(e) => setSettingsForm({ ...settingsForm, collegePlaceholder: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-forest uppercase">Venue Placeholder</label>
                        <input
                          type="text"
                          value={settingsForm.venuePlaceholder}
                          onChange={(e) => setSettingsForm({ ...settingsForm, venuePlaceholder: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-forest uppercase">Official Email Placeholder</label>
                        <input
                          type="text"
                          value={settingsForm.officialEmailPlaceholder}
                          onChange={(e) => setSettingsForm({ ...settingsForm, officialEmailPlaceholder: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-forest uppercase">Instagram Handle Placeholder</label>
                        <input
                          type="text"
                          value={settingsForm.instagramPlaceholder}
                          onChange={(e) => setSettingsForm({ ...settingsForm, instagramPlaceholder: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest font-mono"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="font-bold text-forest uppercase">Admin Passcode (Security)</label>
                        <input
                          type="text"
                          value={settingsForm.adminPasscodeHash}
                          onChange={(e) => setSettingsForm({ ...settingsForm, adminPasscodeHash: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-sage/60 text-sm text-forest font-mono"
                        />
                        <p className="text-[11px] text-forest/50">Change this passcode to restrict dashboard access to your committee.</p>
                      </div>

                    </div>

                    <div className="pt-4 flex items-center justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest text-cream font-bold text-xs uppercase tracking-wider hover:bg-forest-600 transition-colors shadow-soft"
                      >
                        <Save className="w-4 h-4 text-peach" />
                        <span>Save Settings</span>
                      </button>
                    </div>

                  </form>

                </div>
              )}

              {/* TAB 5: GOOGLE SHEETS SYNC SETUP */}
              {activeTab === 'google-sheets' && (
                <div className="space-y-6 max-w-3xl">
                  
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-forest">Live Google Sheets Cloud Backend</h3>
                    <p className="text-xs text-forest/70">
                      Sync every student registration directly into a private Google Spreadsheet in real-time using Google Apps Script. 100% free with no servers required.
                    </p>
                  </div>

                  {/* Webhook URL Input */}
                  <div className="p-6 rounded-3xl bg-cream border border-sage/40 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-forest uppercase tracking-wider">
                        Google Apps Script Webhook URL (Deployed Web App)
                      </label>
                      <input
                        type="url"
                        placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                        value={settingsForm.googleSheetsWebhookUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, googleSheetsWebhookUrl: e.target.value })}
                        className="w-full p-3 rounded-xl border border-sage/60 text-sm text-forest font-mono bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-forest/70">
                        {settingsForm.googleSheetsWebhookUrl ? '✅ Webhook configured. Registrations will sync automatically.' : '⚪ Optional cloud webhook. Data is always stored locally.'}
                      </span>

                      <button
                        onClick={handleSaveSettings}
                        className="px-4 py-2 rounded-xl bg-forest text-cream font-semibold hover:bg-forest-600 transition-colors"
                      >
                        Save Webhook URL
                      </button>
                    </div>
                  </div>

                  {/* Ready-to-paste Apps Script Code */}
                  <div className="p-6 rounded-3xl bg-white border border-sage/40 shadow-soft space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-forest">Ready-to-Deploy Code.gs Script</span>
                      <button
                        onClick={handleCopyScript}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest text-cream text-xs font-semibold hover:bg-forest-600 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5 text-peach" />
                        <span>{copyNotice ? 'Copied to Clipboard!' : 'Copy Apps Script Code'}</span>
                      </button>
                    </div>

                    <pre className="p-4 rounded-2xl bg-forest-900 text-cream/90 font-mono text-[11px] overflow-x-auto max-h-56 leading-relaxed select-all">
                      {GOOGLE_APPS_SCRIPT_CODE}
                    </pre>

                    <div className="p-4 rounded-2xl bg-sage-50 border border-sage/40 text-xs text-forest/80 space-y-2">
                      <p className="font-bold text-forest">3-Step Free Setup Guide:</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>Create a Google Sheet at <code>sheets.new</code> named <em>MINDSPACE 2026 Registrations</em>.</li>
                        <li>Click <strong>Extensions &gt; Apps Script</strong>, paste the code above, and click <strong>Deploy &gt; New deployment</strong>.</li>
                        <li>Select <strong>Web app</strong> (Execute as: <em>Me</em>, Who has access: <em>Anyone</em>), deploy, and paste the generated URL into the box above.</li>
                      </ol>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
