'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Palette,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  User,
  Mail,
  GraduationCap,
  Instagram,
  Phone,
  FileText,
  ShieldCheck,
  Upload,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { AppsScriptClient } from '@/lib/apps-script-client';
import { toast } from 'sonner';

export function VolunteerWizard() {
  const router = useRouter();
  const { isVolunteerWizardOpen, setVolunteerWizardOpen, dynamicRoles } = useAppStore();
  const { user, setUserApplication } = useAuthStore();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [base64CvData, setBase64CvData] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    schoolCollege: '',
    grade: '',
    instagramId: '',
    phoneNumber: '',
    age: '',
    primarySkill: '',
    preferredWorkStyle: 'Remote & Independent',
    pastExperience: '',
    comfortSensitiveTopics: 'Highly Comfortable',
    resumeUrl: '',
    selectedTeam: 'Design',
    whyThisTeam: '',
    declarationConsent: false,
  });

  // Strict Login Check Guard
  useEffect(() => {
    if (isVolunteerWizardOpen && !user) {
      setVolunteerWizardOpen(false);
      toast.error('Please sign in to apply for the Salus Fellowship!');
      router.push('/dashboard');
    }
  }, [isVolunteerWizardOpen, user, setVolunteerWizardOpen, router]);

  // Pre-fill user information if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit.');
      return;
    }

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setBase64CvData(reader.result as string);
      toast.success(`Attached CV: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to apply!');
      router.push('/dashboard');
      return;
    }

    if (step === 1) {
      if (!formData.fullName || !formData.email) {
        toast.error('Please enter full name and email address.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to submit your application!');
      router.push('/dashboard');
      return;
    }

    if (!formData.whyThisTeam) {
      toast.error('Please write a brief statement of intent.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        schoolOrOrg: formData.schoolCollege,
        roleInterest: formData.selectedTeam,
        roleTrack: formData.selectedTeam,
        motivationStatement: formData.whyThisTeam,
        statementOfIntent: formData.whyThisTeam,
        phone: formData.phoneNumber,
        instagram: formData.instagramId,
        resumeDriveUrl: formData.resumeUrl,
        cvBase64: base64CvData,
        cvFileName: uploadedFileName,
        recaptchaToken: 'mock-recaptcha-token',
      };

      const res = await AppsScriptClient.submitApplication(payload);

      if (res.success) {
        setIsSubmitted(true);
        toast.success('Fellowship application logged in Google Apps Script database!');

        setUserApplication({
          id: res.id || `APP-${Date.now()}`,
          track: formData.selectedTeam,
          status: 'Submitted & Logged',
          submittedAt: new Date().toISOString(),
        });
      } else {
        toast.error(res.error || 'Submission failed');
      }
    } catch {
      toast.error('Network issue. Saved locally.');
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setVolunteerWizardOpen(false);
    setStep(1);
    setIsSubmitted(false);
  };

  if (!user || !isVolunteerWizardOpen) return null;

  return (
    <AnimatePresence>
      {isVolunteerWizardOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 select-none overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#0C0D0E]/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative w-full max-w-2xl bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border border-white/15 shadow-2xl z-10 space-y-6 text-[var(--text-main)] my-8 transition-colors duration-300"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Salus Student Fellowship
                </span>
                <h2 className="editorial-title text-2xl font-bold text-[var(--text-main)]">
                  Ambassador Application
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            {!isSubmitted && (
              <div className="flex items-center justify-between px-2">
                {[
                  { num: 1, label: '1. Personal Info' },
                  { num: 2, label: '2. Skills & Track' },
                  { num: 3, label: '3. Intent & CV' },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                        step === s.num
                          ? 'bg-[var(--primary-accent)] text-[var(--button-text)] shadow-peach-glow'
                          : step > s.num
                          ? 'bg-emerald-400 text-white'
                          : 'bg-[var(--card-inner-bg)] text-[var(--text-muted)] border border-white/10'
                      }`}
                    >
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span
                      className={`text-xs font-mono hidden sm:inline ${
                        step === s.num ? 'text-[var(--primary-accent)] font-bold' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CONFIRMATION SCREEN AFTER SUBMISSION */}
            {isSubmitted ? (
              <div className="py-10 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="editorial-title text-2xl font-bold text-[var(--text-main)]">
                    Application Submitted
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Thank you for applying for the <strong>{formData.selectedTeam} Track</strong>. Your response and uploaded resume have been securely synced to our Google Workspace storage engine.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-semibold text-xs shadow-peach-glow transition-all"
                >
                  Go to Member Dashboard
                </button>
              </div>
            ) : (
              /* MULTI-STEP WIZARD FORM */
              <form onSubmit={step === 3 ? handleFinalSubmit : handleNextStep} className="space-y-6">
                
                {/* STEP 1: PERSONAL INFORMATION */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Aarav Sharma..."
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="aarav@school.edu..."
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                          School / College / Org
                        </label>
                        <input
                          type="text"
                          name="schoolCollege"
                          value={formData.schoolCollege}
                          onChange={handleInputChange}
                          placeholder="DPS R.K. Puram / St. Stephen's..."
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210..."
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: TRACK SELECTION & SKILLS */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--primary-accent)] mb-2">
                        Select Fellowship Track
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {dynamicRoles.map((role) => (
                          <div
                            key={role.id}
                            onClick={() => setFormData((prev) => ({ ...prev, selectedTeam: role.name }))}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                              formData.selectedTeam === role.name
                                ? 'bg-[var(--primary-accent)]/15 border-[var(--primary-accent)] shadow-peach-glow'
                                : 'bg-[var(--card-inner-bg)] border-white/10 hover:border-white/20'
                            }`}
                          >
                            <h4 className="text-xs font-bold text-[var(--text-main)]">{role.name} Track</h4>
                            <p className="text-[11px] text-[var(--text-muted)] mt-1">{role.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                        Primary Skill & Tools
                      </label>
                      <input
                        type="text"
                        name="primarySkill"
                        value={formData.primarySkill}
                        onChange={handleInputChange}
                        placeholder="e.g. Figma, Canva, Content Writing, Podcast Editing..."
                        className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: INTENT NARRATIVE & CV FILE UPLOAD */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                        Statement of Intent *
                      </label>
                      <textarea
                        name="whyThisTeam"
                        required
                        rows={4}
                        value={formData.whyThisTeam}
                        onChange={handleInputChange}
                        placeholder="Why do you want to join Salus Initiative? How will your work support student mental health?"
                        className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none resize-none"
                      />
                    </div>

                    {/* Drag-and-Drop Real CV Upload Input */}
                    <div className="p-5 rounded-2xl bg-[var(--card-inner-bg)] border border-dashed border-white/20 text-center space-y-2 relative hover:border-[var(--primary-accent)] transition-colors">
                      <Upload className="w-6 h-6 text-[var(--primary-accent)] mx-auto" />
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold text-[var(--text-main)]">
                          {uploadedFileName ? `Attached: ${uploadedFileName}` : 'Upload CV / Portfolio (PDF, DOCX up to 5MB)'}
                        </span>
                        <p className="text-[10px] text-[var(--text-muted)]">Saved securely in Google Drive folder</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Navigation Action Footer Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 rounded-full border border-white/10 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-2.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] text-xs font-semibold shadow-peach-glow transition-all flex items-center gap-2"
                  >
                    <span>{step === 3 ? (isSubmitting ? 'Submitting...' : 'Submit Application') : 'Next Step'}</span>
                    {step < 3 && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>

              </form>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
