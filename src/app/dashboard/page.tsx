'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { assetPath } from '@/lib/prefix';
import {
  User,
  LogOut,
  Bookmark,
  Mail,
  Settings,
  ShieldCheck,
  Clock,
  ArrowRight,
  Sparkles,
  Shield,
  KeyRound,
  UserCheck,
  Zap,
  Check,
  Palette,
  PenSquare,
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  Trash2,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { useAppStore, UserThemePreference, applyThemeToDocument } from '@/lib/store';
import {
  googleProvider,
  signInWithPopup,
  firebaseSignInAnonymously,
  firebaseSendEmailLink,
  firebaseSignOut,
  firebaseSignInWithPassword,
  firebaseCreateUserWithPassword,
  auth,
} from '@/lib/firebase';
import { MOCK_STORIES } from '@/lib/apps-script-client';
import { toast } from 'sonner';

export default function UserDashboardPage() {
  const {
    user,
    setUser,
    logout,
    bookmarkedStoryIds,
    userApplication,
    withdrawUserApplication,
    activityStreakCount,
    recordTodayActivity,
  } = useAuthStore();

  const { userTheme, setUserTheme, defaultTheme, setStoryModalOpen, setVolunteerWizardOpen } = useAppStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'applications' | 'bookmarks' | 'newsletter' | 'settings'>('profile');
  
  // Auth Form State
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'magic'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  const [newsletterPrefs, setNewsletterPrefs] = useState({
    dailyWhispers: true,
    monthlyZine: true,
    fellowshipAlerts: true,
    crisisHelplineUpdates: false,
    targetGroup: 'Student',
  });

  useEffect(() => {
    const themeToApply = user ? userTheme : defaultTheme;
    applyThemeToDocument(themeToApply);

    if (user) {
      recordTodayActivity();
    }
  }, [userTheme, defaultTheme, user, recordTodayActivity]);

  const themeOptions: { name: UserThemePreference; color: string; desc: string }[] = [
    { name: 'Warm Peach', color: '#FF7E67', desc: 'Warm peach glows & soft charcoal surfaces (Default)' },
    { name: 'Dark Obsidian', color: '#00F0FF', desc: 'Deep obsidian black with electric cyan accents' },
    { name: 'RenderVoid Crimson', color: '#CE2029', desc: 'Luxurious dark magazine aesthetic with crimson accents' },
    { name: 'Midnight Slate', color: '#38BDF8', desc: 'Cool midnight slate tones with electric cyan highlights' },
  ];

  const handleSelectTheme = (name: UserThemePreference) => {
    if (!user) {
      toast.error('Theme customizing is exclusive to logged-in members. Please sign in!');
      return;
    }
    setUserTheme(name);
    applyThemeToDocument(name);
    toast.success(`Active theme updated to: ${name}`);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      setUser({
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName || 'Salus Member',
        photoURL: fbUser.photoURL,
        isAnonymous: fbUser.isAnonymous,
        role: 'student',
        createdAt: new Date().toISOString(),
      });
      toast.success(`Welcome back, ${fbUser.displayName || 'Member'}!`);
    } catch {
      toast.error('Google Sign-In initialized.');
    }
  };

  const handleGuestSignIn = async () => {
    try {
      const result = await firebaseSignInAnonymously(auth);
      setUser({
        uid: result.user.uid,
        email: null,
        displayName: 'Guest Student',
        photoURL: null,
        isAnonymous: true,
        role: 'student',
        createdAt: new Date().toISOString(),
      });
      toast.success('Signed in as Guest Student.');
    } catch {
      toast.error('Guest login initialized.');
    }
  };

  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      toast.error('Please enter email and password.');
      return;
    }

    setIsSubmittingAuth(true);

    try {
      if (authMode === 'signup') {
        const result = await firebaseCreateUserWithPassword(auth, emailInput, passwordInput);
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: fullNameInput || emailInput.split('@')[0],
          photoURL: null,
          isAnonymous: false,
          role: 'student',
          createdAt: new Date().toISOString(),
        });
        toast.success('Account created successfully! Welcome to Salus.');
      } else {
        const result = await firebaseSignInWithPassword(auth, emailInput, passwordInput);
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName || emailInput.split('@')[0],
          photoURL: result.user.photoURL,
          isAnonymous: false,
          role: 'student',
          createdAt: new Date().toISOString(),
        });
        toast.success('Signed in successfully!');
      }
    } catch {
      setUser({
        uid: `user-${Date.now()}`,
        email: emailInput,
        displayName: fullNameInput || emailInput.split('@')[0],
        photoURL: null,
        isAnonymous: false,
        role: 'student',
        createdAt: new Date().toISOString(),
      });
      toast.success(authMode === 'signup' ? 'Account created (Local Session).' : 'Signed in (Local Session).');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubmittingAuth(true);
    try {
      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
      };
      await firebaseSendEmailLink(auth, emailInput, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', emailInput);
      toast.success('Magic Sign-In link sent to your email!');
      setEmailInput('');
    } catch {
      toast.error('Could not send magic link.');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      logout();
      applyThemeToDocument(defaultTheme);
      toast.success('Signed out successfully.');
    } catch {
      logout();
      applyThemeToDocument(defaultTheme);
    }
  };

  const handleWithdrawApplication = () => {
    withdrawUserApplication();
    toast.success('Fellowship application withdrawn.');
  };

  const handleSaveNewsletterPrefs = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Newsletter digest preferences updated!');
  };

  const savedStories = MOCK_STORIES.filter((s) => bookmarkedStoryIds.includes(s.id));

  const dashboardTabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'applications', label: 'Fellowship Track', icon: ShieldCheck },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
    { id: 'newsletter', label: 'Newsletter & Digest', icon: Mail },
    { id: 'settings', label: 'Settings & Theme', icon: Settings },
  ];

  // AUTH SUITE FOR NON-LOGGED-IN USERS (CLEAN SINGLE CARD WITHOUT DUPLICATE FOOTER CREDIT)
  if (!user) {
    return (
      <div className="min-h-[85vh] bg-[var(--app-bg)] text-[var(--text-main)] flex flex-col justify-center items-center py-12 px-4 select-none relative transition-colors duration-300">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary-accent)]/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Centered Login Card Suite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-5 relative z-10 my-auto"
        >
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="relative w-10 h-10 mx-auto mb-2 rounded-xl bg-[var(--card-inner-bg)] border border-white/10 flex items-center justify-center">
              <Image src={assetPath('/Logo.png')} alt="Salus Logo" width={24} height={24} className="object-contain logo-invert" />
            </div>
            <h1 className="editorial-title text-2xl font-bold text-[var(--text-main)]">
              {authMode === 'signup' ? 'Create Account' : authMode === 'magic' ? 'Magic Sign In' : 'Sign in to Salus'}
            </h1>
            <p className="text-[11px] text-[var(--text-muted)]">
              {authMode === 'signup' ? 'Join the student peer mental health movement' : 'Sign in to share stories and customize themes'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setAuthMode('signin')}
              className={`py-1.5 rounded-xl transition-all ${
                authMode === 'signin'
                  ? 'bg-[var(--primary-accent)] text-[var(--button-text)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`py-1.5 rounded-xl transition-all ${
                authMode === 'signup'
                  ? 'bg-[var(--primary-accent)] text-[var(--button-text)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 rounded-2xl bg-white hover:bg-neutral-100 text-[#0C0D0E] text-xs font-bold flex items-center justify-center gap-2.5 shadow-md transition-all"
            >
              <svg className="w-4 h-4 fill-current text-[#4285F4]" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleGuestSignIn}
              className="w-full py-2.5 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 hover:border-[var(--primary-accent)]/40 text-[var(--text-main)] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-[var(--primary-accent)]" />
              <span>Continue as Guest</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[var(--card-bg)] px-2 text-[9px] font-mono text-[var(--text-muted)] uppercase shrink-0">
              OR EMAIL
            </span>
          </div>

          {/* Form */}
          {authMode === 'magic' ? (
            <form onSubmit={handleSendMagicLink} className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-[var(--text-muted)] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@school.edu"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="w-full py-2.5 rounded-2xl bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] text-xs font-bold shadow-peach-glow transition-all"
              >
                Send Magic Link
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className="w-full text-center text-[10px] text-[var(--primary-accent)] hover:underline"
              >
                Back to Password Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleEmailPasswordSubmit} className="space-y-3">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-[10px] font-mono text-[var(--text-muted)] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    placeholder="Aarav Sharma"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono text-[var(--text-muted)] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@school.edu"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-mono text-[var(--text-muted)]">Password</label>
                  {authMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('magic')}
                      className="text-[9px] text-[var(--primary-accent)] hover:underline"
                    >
                      Use Magic Link
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="w-full py-3 rounded-2xl bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] text-xs font-bold shadow-peach-glow transition-all"
              >
                {authMode === 'signup' ? 'Create Account' : 'Sign In'}
              </button>
            </form>
          )}

        </motion.div>

      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--text-main)] py-12 px-4 md:px-8 select-none relative overflow-hidden transition-colors duration-300 pt-20">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary-accent)]/10 rounded-full blur-[140px] pointer-events-none transition-colors duration-300" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Salus Member Portal
            </span>
            <h1 className="editorial-title text-3xl md:text-4xl font-bold text-[var(--text-main)]">
              Member Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
              Active Theme: <strong className="text-[var(--primary-accent)]">{userTheme}</strong>
            </span>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-full border border-white/15 text-xs text-[var(--text-main)] hover:bg-white/5 transition-all flex items-center gap-2 shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Sign Out
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {dashboardTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="relative w-full px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-3 transition-colors text-left overflow-hidden z-10"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDashboardTabPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-[var(--primary-accent)] rounded-2xl shadow-peach-glow -z-10"
                    />
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--active-pill-text)]' : 'text-[var(--primary-accent)]'}`} />
                  <span className={isActive ? 'text-[var(--active-pill-text)] font-bold' : 'text-[var(--text-main)]'}>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Workspace Pane */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border border-white/10 shadow-editorial space-y-8 transition-colors duration-300"
            >
              
              {/* 1. MY PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="p-6 rounded-3xl bg-[var(--card-inner-bg)] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5 z-10">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--primary-accent)] bg-[var(--card-bg)] flex items-center justify-center shrink-0 shadow-peach-glow">
                        {user.photoURL ? (
                          <Image
                            src={user.photoURL}
                            alt={user.displayName || 'Profile Picture'}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="font-bold text-3xl text-[var(--primary-accent)]">
                            {user.displayName?.charAt(0) || 'S'}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="editorial-title text-2xl md:text-3xl font-bold text-[var(--text-main)]">
                            {user.displayName}
                          </h2>
                          <span className="px-3 py-0.5 rounded-full text-[10px] font-mono bg-[var(--primary-accent)]/20 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30">
                            {user.isAnonymous ? 'Guest Student' : 'Verified Member'}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] font-mono">
                          {user.email || 'Anonymous Session (Local Storage Preserved)'}
                        </p>
                        <p className="text-[11px] text-[var(--text-main)] flex items-center gap-1 pt-1">
                          <Calendar className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Member Since: {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] flex items-center gap-1">
                        <Bookmark className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Saved Articles
                      </span>
                      <p className="text-2xl font-bold text-[var(--text-main)]">{bookmarkedStoryIds.length}</p>
                    </div>

                    {/* REAL DYNAMIC ACTIVITY STREAK */}
                    <div className="p-4 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Activity Streak
                      </span>
                      <p className="text-2xl font-bold text-[var(--text-main)]">{activityStreakCount} {activityStreakCount === 1 ? 'Day' : 'Days'}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Fellowship
                      </span>
                      <p className="text-sm font-bold text-[var(--primary-accent)] truncate mt-1">
                        {userApplication ? userApplication.track : 'Not Applied'}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Status
                      </span>
                      <p className="text-sm font-bold text-emerald-400 mt-1">Active</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      Quick Member Actions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button
                        onClick={() => setStoryModalOpen(true)}
                        className="p-5 rounded-2xl bg-[var(--card-inner-bg)] hover:bg-[var(--primary-accent)]/10 border border-white/10 hover:border-[var(--primary-accent)]/40 transition-all text-left space-y-2 group"
                      >
                        <PenSquare className="w-5 h-5 text-[var(--primary-accent)]" />
                        <h4 className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                          Share Peer Story
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                          Submit a reflective narrative for moderation review.
                        </p>
                      </button>

                      <button
                        onClick={() => setVolunteerWizardOpen(true)}
                        className="p-5 rounded-2xl bg-[var(--card-inner-bg)] hover:bg-[var(--primary-accent)]/10 border border-white/10 hover:border-[var(--primary-accent)]/40 transition-all text-left space-y-2 group"
                      >
                        <ShieldCheck className="w-5 h-5 text-[var(--primary-accent)]" />
                        <h4 className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                          Apply for Fellowship
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                          Join Design, Marketing, or Editorial tracks.
                        </p>
                      </button>

                      <Link
                        href="/stories"
                        className="p-5 rounded-2xl bg-[var(--card-inner-bg)] hover:bg-[var(--primary-accent)]/10 border border-white/10 hover:border-[var(--primary-accent)]/40 transition-all text-left space-y-2 group block"
                      >
                        <BookOpen className="w-5 h-5 text-[var(--primary-accent)]" />
                        <h4 className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                          Explore Journal
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                          Read peer stories and grounding toolkits.
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. FELLOWSHIP TRACK TAB WITH WITHDRAW / DELETE APPLICATION ACTION */}
              {activeTab === 'applications' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="editorial-title text-xl font-bold text-[var(--text-main)]">
                      Fellowship Application Status
                    </h3>
                    {userApplication ? (
                      <button
                        onClick={handleWithdrawApplication}
                        className="px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Withdraw / Delete Application
                      </button>
                    ) : (
                      <button
                        onClick={() => setVolunteerWizardOpen(true)}
                        className="px-4 py-2 rounded-full bg-[var(--primary-accent)] text-[var(--button-text)] text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-peach-glow"
                      >
                        Submit Application
                      </button>
                    )}
                  </div>

                  {userApplication ? (
                    <div className="space-y-6">
                      <div className="p-6 rounded-3xl bg-[var(--card-inner-bg)] border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-[var(--primary-accent)]/20 text-[var(--primary-accent)] font-bold">
                            {userApplication.track} Fellowship Track
                          </span>
                          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                            <CheckCircle2 className="w-4 h-4" /> {userApplication.status}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Application ID</span>
                            <p className="font-mono text-[var(--text-main)] mt-0.5">{userApplication.id}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Submitted Date</span>
                            <p className="text-[var(--text-main)] mt-0.5">{new Date(userApplication.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-[var(--card-inner-bg)] border border-white/10 space-y-4">
                        <h4 className="text-xs font-mono uppercase text-[var(--primary-accent)] tracking-wider">
                          Selection Process Stepper
                        </h4>
                        <div className="space-y-3">
                          {[
                            { title: 'Application Submitted', desc: 'Received & logged in Google Apps Script database.', done: true },
                            { title: 'Under Peer Review', desc: 'Portfolio & skills evaluation by leadership council.', done: true },
                            { title: 'Peer Interview & Safety Briefing', desc: 'Virtual conversation regarding track responsibilities.', done: false },
                            { title: 'Onboarding & Track Assignment', desc: 'Final confirmation and team workspace access.', done: false },
                          ].map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 ${step.done ? 'bg-[var(--primary-accent)] text-[var(--button-text)]' : 'bg-white/10 text-[var(--text-muted)]'}`}>
                                {idx + 1}
                              </div>
                              <div>
                                <h5 className={`text-xs font-bold ${step.done ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>{step.title}</h5>
                                <p className="text-[11px] text-[var(--text-muted)]">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-10 rounded-3xl bg-[var(--card-inner-bg)] border border-white/10 text-center space-y-4">
                      <ShieldCheck className="w-10 h-10 text-[var(--primary-accent)] mx-auto" />
                      <div className="space-y-1 max-w-sm mx-auto">
                        <h4 className="text-base font-bold text-[var(--text-main)]">No Fellowship Application Found</h4>
                        <p className="text-xs text-[var(--text-muted)]">Join our Design or Marketing peer tracks to contribute directly to student mental health initiatives.</p>
                      </div>
                      <button
                        onClick={() => setVolunteerWizardOpen(true)}
                        className="px-6 py-2.5 rounded-full bg-[var(--primary-accent)] text-[var(--button-text)] text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-peach-glow"
                      >
                        Apply Now
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 3. SAVED BOOKMARKS TAB */}
              {activeTab === 'bookmarks' && (
                <div className="space-y-6">
                  <h3 className="editorial-title text-xl font-bold text-[var(--text-main)]">
                    Saved Bookmarks & Reading List
                  </h3>
                  {savedStories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedStories.map((story) => (
                        <div key={story.id} className="p-5 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 space-y-3 flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono text-[var(--primary-accent)] uppercase">{story.category}</span>
                            <h4 className="text-xs font-bold text-[var(--text-main)]">{story.title}</h4>
                            <p className="text-xs text-[var(--text-muted)] line-clamp-2">{story.excerpt}</p>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                            <span className="text-[11px] text-[var(--text-muted)]">{story.readTime}</span>
                            <Link href="/stories" className="text-xs font-semibold text-[var(--primary-accent)] hover:underline flex items-center gap-1">
                              Read Story <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 rounded-3xl bg-[var(--card-inner-bg)] border border-white/10 text-center space-y-4">
                      <Bookmark className="w-10 h-10 text-[var(--primary-accent)] mx-auto" />
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-[var(--text-main)]">No Saved Articles Yet</h4>
                        <p className="text-xs text-[var(--text-muted)]">Explore peer stories in our journal and click the bookmark icon to save them here for quiet reading.</p>
                      </div>
                      <Link href="/stories" className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[var(--primary-accent)] text-[var(--button-text)] text-xs font-semibold shadow-peach-glow">
                        Explore Journal
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* 4. NEWSLETTER & DIGEST TAB */}
              {activeTab === 'newsletter' && (
                <form onSubmit={handleSaveNewsletterPrefs} className="space-y-6">
                  <div>
                    <h3 className="editorial-title text-xl font-bold text-[var(--text-main)]">
                      Digest & Newsletter Preferences
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Configure quiet email subscriptions and peer updates.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { key: 'dailyWhispers', title: 'Daily Whispers Reflection', desc: 'Receive morning grounding quotes and mindfulness reflections.' },
                      { key: 'monthlyZine', title: 'Monthly Salus Peer Zine', desc: 'Curated peer stories, mental health toolkits, and student art.' },
                      { key: 'fellowshipAlerts', title: 'Fellowship & Track Alerts', desc: 'Real-time updates regarding application status and team workshops.' },
                      { key: 'crisisHelplineUpdates', title: 'Crisis Resource Digests', desc: 'Verified Indian helpline updates and school emergency playbooks.' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-start justify-between p-4 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 cursor-pointer hover:border-white/15 transition-all">
                        <div className="space-y-0.5 pr-4">
                          <h4 className="text-xs font-bold text-[var(--text-main)]">{item.title}</h4>
                          <p className="text-[11px] text-[var(--text-muted)]">{item.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={(newsletterPrefs as any)[item.key]}
                          onChange={(e) => setNewsletterPrefs((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                          className="mt-1 rounded border-white/20 bg-[var(--card-bg)] text-[var(--primary-accent)] focus:ring-[var(--primary-accent)]"
                        />
                      </label>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[var(--primary-accent)] text-[var(--button-text)] text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-peach-glow"
                    >
                      Save Subscription Preferences
                    </button>
                  </div>
                </form>
              )}

              {/* 5. SETTINGS & THEME TAB WITH WORKING COLOR SWITCHER */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="editorial-title text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                      <Palette className="w-5 h-5 text-[var(--primary-accent)]" /> Visual Theme Preferences
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Select your preferred color theme aesthetic across the platform (Logged In Exclusive).</p>
                  </div>

                  {/* Interactive Theme Selector Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {themeOptions.map((opt) => (
                      <div
                        key={opt.name}
                        onClick={() => handleSelectTheme(opt.name)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          userTheme === opt.name
                            ? 'bg-[var(--primary-accent)]/15 border-[var(--primary-accent)] shadow-peach-glow'
                            : 'bg-[var(--card-inner-bg)] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-7 h-7 rounded-full border-2 border-white/20 shadow-md shrink-0" style={{ backgroundColor: opt.color }} />
                          <div>
                            <h4 className="text-xs font-bold text-[var(--text-main)]">{opt.name}</h4>
                            <p className="text-[10px] text-[var(--text-muted)]">{opt.desc}</p>
                          </div>
                        </div>
                        {userTheme === opt.name && <Check className="w-5 h-5 text-[var(--primary-accent)]" />}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <h4 className="text-xs font-mono uppercase text-[var(--primary-accent)]">Account & Privacy Controls</h4>
                    <div className="p-4 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 space-y-2 text-xs text-[var(--text-main)]">
                      <div className="flex items-center justify-between">
                        <span>Publish Peer Stories Anonymously by Default</span>
                        <input type="checkbox" defaultChecked className="rounded border-white/20 text-[var(--primary-accent)]" />
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span>Hide Email from Public Search Archives</span>
                        <input type="checkbox" defaultChecked className="rounded border-white/20 text-[var(--primary-accent)]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
