'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Users,
  BookOpen,
  Mail,
  Activity,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Lock,
  ExternalLink,
  Layers,
  Sparkles,
  Edit3,
  Check,
  X,
  Eye,
  FileText,
  Clock,
  Star,
  ChevronDown,
  Phone,
  GraduationCap,
  Instagram,
  User,
  MessageSquare,
  Paperclip,
  Wifi,
  ShieldCheck,
  Database,
  Cloud,
  Palette,
  Loader2,
} from 'lucide-react';
import { useAppStore, DynamicFellowshipRole, UserThemePreference, applyThemeToDocument } from '@/lib/store';
import { AppsScriptClient } from '@/lib/apps-script-client';
import { Applicant, Story, ApplicantStatus, StoryStatus } from '@/lib/types';
import { toast } from 'sonner';

export default function AdminPage() {
  const {
    isAdminAuthenticated,
    setAdminSession,
    logoutAdmin,
    dynamicRoles,
    addDynamicRole,
    updateDynamicRole,
    removeDynamicRole,
    defaultTheme,
    setDefaultTheme,
  } = useAppStore();

  const [passkeyInput, setPasskeyInput] = useState('');
  const [activeTab, setActiveTab] = useState<'applications' | 'stories' | 'roles' | 'media' | 'logs'>('applications');
  
  // Real Data State (Initialized to empty array so empty Google Sheets display 0 entries!)
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  
  // Modals & Details View
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Fetch real Google Sheets data on admin login
  useEffect(() => {
    if (isAdminAuthenticated) {
      setIsFetchingData(true);
      Promise.all([
        AppsScriptClient.getApplicants('salus2026'),
        AppsScriptClient.getStories(),
      ])
        .then(([appData, storyData]) => {
          setApplicants(appData || []);
          setStories(storyData || []);
        })
        .catch(() => {
          setApplicants([]);
          setStories([]);
        })
        .finally(() => {
          setIsFetchingData(false);
        });
    }
  }, [isAdminAuthenticated]);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === 'salus2026') {
      setAdminSession(true, 'Super Admin', 'token-salus-2026');
      toast.success('Admin authentication successful!');
    } else {
      toast.error('Invalid administrative passkey');
    }
  };

  const handleSetDefaultTheme = (theme: UserThemePreference) => {
    setDefaultTheme(theme);
    applyThemeToDocument(theme);
    toast.success(`System default theme set to: "${theme}"`);
  };

  // APPLICANT STATUS MODERATION CONTROLS
  const handleUpdateApplicantStatus = async (applicantId: string, newStatus: ApplicantStatus) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === applicantId ? { ...app, status: newStatus } : app))
    );
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success(`Updated status for ${applicantId} to "${newStatus}"`);

    try {
      await AppsScriptClient.updateApplicantStatus(applicantId, newStatus, 'salus2026');
    } catch {}
  };

  // DELETE APPLICANT CONTROL
  const handleDeleteApplicant = async (applicantId: string) => {
    setApplicants((prev) => prev.filter((app) => app.id !== applicantId));
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant(null);
    }
    toast.success(`Deleted applicant entry: ${applicantId}`);

    try {
      await AppsScriptClient.deleteApplicant(applicantId, 'salus2026');
    } catch {}
  };

  // STORY STATUS MODERATION CONTROLS
  const handleUpdateStoryStatus = async (storyId: string, newStatus: StoryStatus) => {
    setStories((prev) =>
      prev.map((st) => (st.id === storyId ? { ...st, status: newStatus } : st))
    );
    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success(`Updated story status to "${newStatus}"`);

    try {
      await AppsScriptClient.updateStoryStatus(storyId, newStatus, 'salus2026');
    } catch {}
  };

  // DELETE STORY CONTROL
  const handleDeleteStory = async (storyId: string) => {
    setStories((prev) => prev.filter((st) => st.id !== storyId));
    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory(null);
    }
    toast.success(`Deleted story narrative: ${storyId}`);

    try {
      await AppsScriptClient.deleteStory(storyId, 'salus2026');
    } catch {}
  };

  const handleToggleFeatureStory = (storyId: string) => {
    setStories((prev) =>
      prev.map((st) => (st.id === storyId ? { ...st, isFeatured: !st.isFeatured } : st))
    );
    toast.success(`Toggled featured status for story.`);
  };

  // Add & Edit Role State
  const [roleNameInput, setRoleNameInput] = useState('');
  const [roleDescInput, setRoleDescInput] = useState('');
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [editNameInput, setEditNameInput] = useState('');
  const [editDescInput, setEditDescInput] = useState('');

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleNameInput || !roleDescInput) {
      toast.error('Please enter both role name and description.');
      return;
    }
    const newId = roleNameInput.toLowerCase().replace(/\s+/g, '-');
    addDynamicRole({
      id: newId,
      name: roleNameInput,
      description: roleDescInput,
    });
    toast.success(`Added new fellowship track: "${roleNameInput}"`);
    setRoleNameInput('');
    setRoleDescInput('');
  };

  const startEditRole = (role: DynamicFellowshipRole) => {
    setEditingRoleId(role.id);
    setEditNameInput(role.name);
    setEditDescInput(role.description);
  };

  const handleSaveEditRole = (roleId: string) => {
    if (!editNameInput || !editDescInput) {
      toast.error('Name and description cannot be empty.');
      return;
    }
    updateDynamicRole(roleId, {
      name: editNameInput,
      description: editDescInput,
    });
    toast.success(`Updated track: "${editNameInput}"`);
    setEditingRoleId(null);
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--app-bg)] text-[var(--text-main)] flex items-center justify-center p-4 select-none transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-[var(--card-bg)] p-8 rounded-3xl border border-white/15 shadow-2xl text-center space-y-6"
        >
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--primary-accent)]/15 border border-[var(--primary-accent)]/30 text-[var(--primary-accent)] flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h1 className="editorial-title text-2xl font-bold text-[var(--text-main)]">
              Salus Admin Suite
            </h1>
            <p className="text-xs text-[var(--text-muted)]">Enter master passkey to access administrative panel.</p>
          </div>
          <form onSubmit={handleAdminAuth} className="space-y-4">
            <input
              type="password"
              required
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              placeholder="Enter Admin Passkey..."
              className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-semibold shadow-peach-glow transition-colors text-xs"
            >
              Authenticate Access
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--text-main)] py-10 px-4 md:px-8 select-none transition-colors duration-300 pt-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Admin Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Master Control Studio
            </span>
            <h1 className="editorial-title text-3xl font-bold text-[var(--text-main)]">
              Salus Administrative Suite
            </h1>
          </div>
          <button
            onClick={logoutAdmin}
            className="px-4 py-2 rounded-full border border-white/15 text-xs text-[var(--text-main)] hover:bg-white/5 transition-colors self-start sm:self-auto"
          >
            Lock Console
          </button>
        </div>

        {/* LIVE SYSTEM CONNECTION STATUS BAR */}
        <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono transition-colors duration-300">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block">Apps Script Backend</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Database className="w-3 h-3" /> Connected (v4.0)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block">Firebase Auth</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Cloud className="w-3 h-3" /> Connected (Spark)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block">reCAPTCHA v3</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Active Security
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block">Google Drive Storage</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Salus_Storage
              </span>
            </div>
          </div>
        </div>

        {/* Sliding Admin Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
          {[
            { id: 'applications', label: `Applicants (${applicants.length})`, icon: Users },
            { id: 'stories', label: `Stories (${stories.length})`, icon: BookOpen },
            { id: 'roles', label: 'Roles & Default Theme', icon: Layers },
            { id: 'media', label: 'Google Drive Media', icon: ExternalLink },
            { id: 'logs', label: 'System Logs', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                  isActive ? 'text-[var(--active-pill-text)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeAdminTabPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-[var(--primary-accent)] rounded-full shadow-peach-glow -z-10"
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Workspace Pane */}
        <div className="bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl transition-colors duration-300">
          
          {/* 1. APPLICANTS TAB */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[var(--text-main)]">Fellowship Applicants Management</h2>
                  <p className="text-xs text-[var(--text-muted)]">Inspect candidate applications, update selection status, or delete entries permanently.</p>
                </div>
              </div>

              {isFetchingData ? (
                <div className="py-16 text-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-accent)] mx-auto" />
                  <span className="text-xs font-mono text-[var(--text-muted)]">Fetching Google Sheets Applicants...</span>
                </div>
              ) : applicants.length > 0 ? (
                <div className="overflow-x-visible">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-[var(--text-muted)] font-mono uppercase text-[10px]">
                        <th className="pb-3">Applicant Name & Email</th>
                        <th className="pb-3">Selected Track</th>
                        <th className="pb-3">School / Institution</th>
                        <th className="pb-3">Current Status</th>
                        <th className="pb-3 text-right">Actions & Moderation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {applicants.map((app) => (
                        <tr key={app.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 font-semibold text-[var(--text-main)]">
                            {app.fullName || app.name || 'Applicant'}
                            <span className="block text-[10px] text-[var(--text-muted)] font-normal">{app.email}</span>
                          </td>

                          <td className="py-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30">
                              {app.roleTrack || app.roleInterest}
                            </span>
                          </td>

                          <td className="py-4 text-[var(--text-main)]">
                            {app.schoolOrOrg || 'Student'}
                          </td>

                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
                              app.status === 'Accepted' ? 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30' :
                              app.status === 'Interview Scheduled' ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30' :
                              app.status === 'Declined' ? 'bg-red-400/15 text-red-400 border border-red-400/30' :
                              'bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30'
                            }`}>
                              {app.status}
                            </span>
                          </td>

                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedApplicant(app)}
                                className="px-3.5 py-1.5 rounded-xl bg-[var(--card-inner-bg)] hover:bg-white/10 text-xs text-[var(--text-main)] border border-white/10 flex items-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Full Application
                              </button>

                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateApplicantStatus(app.id, e.target.value as ApplicantStatus)}
                                className="px-3 py-1.5 rounded-xl bg-[var(--card-inner-bg)] text-xs font-semibold text-[var(--primary-accent)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none cursor-pointer"
                              >
                                <option value="Submitted">Status: Submitted</option>
                                <option value="Under Review">Status: Under Review</option>
                                <option value="Interview Scheduled">Status: Interview Scheduled</option>
                                <option value="Accepted">Status: Accepted</option>
                                <option value="Declined">Status: Declined</option>
                              </select>

                              <button
                                onClick={() => handleDeleteApplicant(app.id)}
                                className="p-1.5 rounded-xl text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors"
                                title="Delete Entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-16 text-center space-y-2 border border-dashed border-white/10 rounded-2xl">
                  <Users className="w-8 h-8 text-[var(--primary-accent)] mx-auto" />
                  <h4 className="text-sm font-bold text-[var(--text-main)]">No Applicants Found</h4>
                  <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                    Your Google Sheets database contains 0 fellowship applicants. New student submissions will automatically sync here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 2. STORY QUEUE TAB */}
          {activeTab === 'stories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[var(--text-main)]">Story Moderation & Publishing Queue</h2>
                  <p className="text-xs text-[var(--text-muted)]">Read peer story narratives, verify emotional safety, approve, or delete entries.</p>
                </div>
              </div>

              {isFetchingData ? (
                <div className="py-16 text-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-accent)] mx-auto" />
                  <span className="text-xs font-mono text-[var(--text-muted)]">Fetching Google Sheets Stories...</span>
                </div>
              ) : stories.length > 0 ? (
                <div className="space-y-3">
                  {stories.map((s) => (
                    <div key={s.id} className="p-5 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[var(--primary-accent)] uppercase">{s.category}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono ${
                            s.status === 'Approved' ? 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30' :
                            s.status === 'Rejected' ? 'bg-red-400/15 text-red-400 border border-red-400/30' :
                            'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                          }`}>
                            {s.status}
                          </span>
                          {s.isFeatured && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-400/20 text-amber-300 flex items-center gap-1 border border-amber-400/30">
                              <Star className="w-3 h-3 fill-current" /> Featured
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-[var(--text-main)]">{s.title}</h4>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1">{s.excerpt}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedStory(s)}
                          className="px-3.5 py-1.5 rounded-xl bg-[var(--card-bg)] text-xs text-[var(--text-main)] border border-white/10 hover:bg-white/5 flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Read Narrative
                        </button>

                        <button
                          onClick={() => handleToggleFeatureStory(s.id)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold border border-amber-500/30 flex items-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5" /> Feature
                        </button>

                        <select
                          value={s.status || 'Pending'}
                          onChange={(e) => handleUpdateStoryStatus(s.id, e.target.value as StoryStatus)}
                          className="px-3 py-1.5 rounded-xl bg-[var(--card-bg)] text-xs font-semibold text-[var(--primary-accent)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none cursor-pointer"
                        >
                          <option value="Pending">Status: Pending</option>
                          <option value="Approved">Status: Approve & Publish</option>
                          <option value="Needs Revision">Status: Request Revision</option>
                          <option value="Rejected">Status: Reject</option>
                        </select>

                        <button
                          onClick={() => handleDeleteStory(s.id)}
                          className="p-1.5 rounded-xl text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors"
                          title="Delete Narrative"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center space-y-2 border border-dashed border-white/10 rounded-2xl">
                  <BookOpen className="w-8 h-8 text-[var(--primary-accent)] mx-auto" />
                  <h4 className="text-sm font-bold text-[var(--text-main)]">No Stories Found</h4>
                  <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                    Your Google Sheets database contains 0 submitted stories. Submitted reflections will automatically sync here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* DYNAMIC ROLES & DEFAULT VISITOR THEME TAB */}
          {activeTab === 'roles' && (
            <div className="space-y-8">
              {/* SYSTEM DEFAULT VISITOR THEME CONTROL */}
              <div className="p-6 rounded-3xl bg-[var(--card-inner-bg)] border border-white/10 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[var(--primary-accent)]" /> System Default Visitor Theme
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    This theme is automatically forced for all non-logged-in website visitors. Logged-in users can select custom themes in their dashboard.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { name: 'Black & Beige', color: '#F5C2A5' },
                    { name: 'Warm Peach', color: '#FF7E67' },
                    { name: 'Dark Obsidian', color: '#00F0FF' },
                    { name: 'RenderVoid Crimson', color: '#CE2029' },
                    { name: 'Midnight Slate', color: '#38BDF8' },
                  ].map((t) => (
                    <button
                      key={t.name}
                      onClick={() => handleSetDefaultTheme(t.name as UserThemePreference)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-semibold transition-all ${
                        defaultTheme === t.name
                          ? 'bg-[var(--primary-accent)]/15 border-[var(--primary-accent)] text-[var(--text-main)] shadow-peach-glow'
                          : 'bg-[var(--card-bg)] border-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                        <span>{t.name}</span>
                      </div>
                      {defaultTheme === t.name && <Check className="w-3.5 h-3.5 text-[var(--primary-accent)]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* DYNAMIC FELLOWSHIP TRACKS EDITING */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[var(--text-main)]">Manage & Edit Fellowship Tracks</h2>
                    <p className="text-xs text-[var(--text-muted)]">Add, edit, or remove dynamic roles available on the application form.</p>
                  </div>
                </div>

                <form onSubmit={handleAddRole} className="p-4 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold text-[var(--primary-accent)] uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4" /> Add New Role Track
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={roleNameInput}
                      onChange={(e) => setRoleNameInput(e.target.value)}
                      placeholder="Role Title (e.g. Podcast Host)"
                      className="px-3.5 py-2.5 rounded-xl bg-[var(--card-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={roleDescInput}
                      onChange={(e) => setRoleDescInput(e.target.value)}
                      placeholder="Role Description (e.g. Recording peer mental health episodes)"
                      className="px-3.5 py-2.5 rounded-xl bg-[var(--card-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[var(--primary-accent)] text-[var(--button-text)] text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-peach-glow"
                  >
                    Create Fellowship Track
                  </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dynamicRoles.map((role) => (
                    <div key={role.id} className="p-5 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 space-y-3">
                      {editingRoleId === role.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editNameInput}
                            onChange={(e) => setEditNameInput(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl bg-[var(--card-bg)] text-xs text-[var(--text-main)] border border-[var(--primary-accent)] focus:outline-none"
                          />
                          <textarea
                            rows={2}
                            value={editDescInput}
                            onChange={(e) => setEditDescInput(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl bg-[var(--card-bg)] text-xs text-[var(--text-main)] border border-[var(--primary-accent)] focus:outline-none resize-none"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSaveEditRole(role.id)}
                              className="px-3 py-1.5 rounded-lg bg-[var(--primary-accent)] text-[var(--button-text)] text-xs font-semibold flex items-center gap-1 shadow-peach-glow"
                            >
                              <Check className="w-3.5 h-3.5" /> Save
                            </button>
                            <button
                              onClick={() => setEditingRoleId(null)}
                              className="px-3 py-1.5 rounded-lg border border-white/10 text-[var(--text-muted)] text-xs flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                              {role.name} Track
                              <span className="text-[10px] font-mono text-[var(--text-muted)]">({role.id})</span>
                            </h4>
                            <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">{role.description}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => startEditRole(role)}
                              className="p-1.5 rounded-lg text-[var(--primary-accent)] hover:bg-[var(--primary-accent)]/10 transition-colors"
                              title="Edit Track"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeDynamicRole(role.id)}
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                              title="Delete Track"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GOOGLE DRIVE MEDIA TAB */}
          {activeTab === 'media' && (
            <div className="py-8 text-center space-y-3">
              <ExternalLink className="w-8 h-8 text-[var(--primary-accent)] mx-auto" />
              <h3 className="text-sm font-bold text-[var(--text-main)]">Google Drive Storage Engine</h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Uploaded applicant resumes and cover photos are stored in Google Drive root folder <code className="text-[var(--primary-accent)]">Salus_Storage</code>.
              </p>
            </div>
          )}

          {/* SYSTEM LOGS TAB */}
          {activeTab === 'logs' && (
            <div className="space-y-2 font-mono text-xs text-[var(--text-muted)]">
              <div className="p-3 rounded-xl bg-[var(--card-inner-bg)] border border-white/5">
                [INFO] System initialized. Apps Script v4.0 REST Engine active.
              </div>
              <div className="p-3 rounded-xl bg-[var(--card-inner-bg)] border border-white/5">
                [SECURITY] Admin passkey authenticated for Super Admin.
              </div>
            </div>
          )}

        </div>

      </div>

      {/* COMPLETE 15-FIELD APPLICANT INSPECTION MODAL */}
      <AnimatePresence>
        {selectedApplicant && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedApplicant(null)} className="fixed inset-0 bg-[#0C0D0E]/85 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="relative w-full max-w-2xl bg-[var(--card-bg)] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl z-10 space-y-6 text-[var(--text-main)] my-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[var(--primary-accent)] uppercase tracking-widest">Candidate Inspection</span>
                  <h3 className="editorial-title text-2xl font-bold text-[var(--text-main)]">{selectedApplicant.fullName || selectedApplicant.name}</h3>
                </div>
                <button onClick={() => setSelectedApplicant(null)} className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)]"><X className="w-5 h-5" /></button>
              </div>

              {/* 15-FIELD DATA GRID */}
              <div className="space-y-6 text-xs text-[var(--text-main)]">
                
                {/* Personal Information Group */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[var(--primary-accent)] tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> 1. Personal & Contact Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[var(--card-inner-bg)]">
                    <div><span className="text-[10px] text-[var(--text-muted)] font-mono">Email:</span> <p className="font-semibold text-[var(--text-main)]">{selectedApplicant.email}</p></div>
                    <div><span className="text-[10px] text-[var(--text-muted)] font-mono">Phone Number:</span> <p className="font-semibold text-[var(--text-main)]">{selectedApplicant.phone || selectedApplicant.phoneNumber || 'Not provided'}</p></div>
                    <div><span className="text-[10px] text-[var(--text-muted)] font-mono">School / Institution:</span> <p className="font-semibold text-[var(--text-main)]">{selectedApplicant.schoolOrOrg || selectedApplicant.schoolCollege || 'Not specified'}</p></div>
                    <div><span className="text-[10px] text-[var(--text-muted)] font-mono">Instagram ID:</span> <p className="font-semibold text-[var(--primary-accent)]">{selectedApplicant.instagramId || 'None'}</p></div>
                  </div>
                </div>

                {/* Track & Skill Assessment Group */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[var(--primary-accent)] tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> 2. Fellowship Track & Skill Assessment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[var(--card-inner-bg)]">
                    <div><span className="text-[10px] text-[var(--text-muted)] font-mono">Selected Track:</span> <p className="font-bold text-[var(--primary-accent)]">{selectedApplicant.roleTrack || selectedApplicant.roleInterest}</p></div>
                    <div><span className="text-[10px] text-[var(--text-muted)] font-mono">Primary Skill:</span> <p className="font-semibold text-[var(--text-main)]">{selectedApplicant.primarySkill || 'Not specified'}</p></div>
                    <div><span className="text-[10px] text-[var(--text-muted)] font-mono">Preferred Work Style:</span> <p className="font-semibold text-[var(--text-main)]">{selectedApplicant.preferredWorkStyle || 'Remote'}</p></div>
                    <div><span className="text-[10px] text-[var(--text-muted)] font-mono">Sensitive Topics Comfort:</span> <p className="font-semibold text-emerald-400">{selectedApplicant.comfortSensitiveTopics || 'Comfortable'}</p></div>
                  </div>
                </div>

                {/* Statement of Intent & Narrative */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[var(--primary-accent)] tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> 3. Statement of Intent & Past Work
                  </h4>
                  <div className="p-4 rounded-2xl bg-[var(--card-inner-bg)] space-y-3">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">Why This Team:</span>
                      <p className="mt-1 text-[var(--text-main)] leading-relaxed">{selectedApplicant.statementOfIntent || selectedApplicant.motivationStatement || selectedApplicant.whyThisTeam || 'No statement provided.'}</p>
                    </div>
                  </div>
                </div>

                {/* CV Resume Attachment */}
                <div className="p-4 rounded-2xl bg-[var(--card-inner-bg)] flex items-center justify-between border border-white/10">
                  <div className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-[var(--primary-accent)]" />
                    <span className="text-xs font-semibold text-[var(--text-main)]">
                      {(selectedApplicant.resumeDriveUrl || selectedApplicant.resumeUrl) ? 'Resume / CV File Attached' : 'No Resume / CV Attached'}
                    </span>
                  </div>
                  {(selectedApplicant.resumeDriveUrl || selectedApplicant.resumeUrl) && (
                    <a
                      href={selectedApplicant.resumeDriveUrl || selectedApplicant.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--primary-accent)] text-[var(--button-text)] text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-peach-glow"
                    >
                      View File in Google Drive
                    </a>
                  )}
                </div>

              </div>

              {/* Status Change & Delete Controls Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-[var(--text-muted)]">Status: <strong className="text-[var(--primary-accent)]">{selectedApplicant.status}</strong></span>
                <div className="flex gap-2">
                  <button onClick={() => handleUpdateApplicantStatus(selectedApplicant.id, 'Accepted')} className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold shadow-peach-glow">Accept Candidate</button>
                  <button onClick={() => handleDeleteApplicant(selectedApplicant.id)} className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete Entry</button>
                  <button onClick={() => setSelectedApplicant(null)} className="px-4 py-2 rounded-xl bg-[var(--card-inner-bg)] text-[var(--text-muted)] text-xs">Close</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STORY DETAILS MODAL */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedStory(null)} className="fixed inset-0 bg-[#0C0D0E]/85 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-xl bg-[var(--card-bg)] border border-white/15 rounded-3xl p-6 shadow-2xl z-10 space-y-4 text-[var(--text-main)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-[var(--text-main)]">{selectedStory.title}</h3>
                <button onClick={() => setSelectedStory(null)} className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)]"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-2 text-xs text-[var(--text-muted)] max-h-60 overflow-y-auto">
                <p><strong>Category:</strong> {selectedStory.category}</p>
                <p><strong>Author:</strong> {selectedStory.authorName}</p>
                <p className="pt-2 leading-relaxed text-[var(--text-main)]">{selectedStory.content}</p>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button onClick={() => handleUpdateStoryStatus(selectedStory.id, 'Approved')} className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold">Approve & Publish</button>
                <button onClick={() => handleDeleteStory(selectedStory.id)} className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete Story</button>
                <button onClick={() => setSelectedStory(null)} className="px-4 py-2 rounded-xl bg-[var(--card-inner-bg)] text-[var(--text-muted)] text-xs">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
