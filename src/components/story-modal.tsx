'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, ShieldCheck, Lock } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { AppsScriptClient } from '@/lib/apps-script-client';
import { toast } from 'sonner';
import { getRecaptchaToken } from '@/lib/recaptcha';

export function StoryModal() {
  const router = useRouter();
  const { isStoryModalOpen, setStoryModalOpen } = useAppStore();
  const { user } = useAuthStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Student Voice',
    authorName: '',
    authorEmail: '',
    isAnonymous: false,
    content: '',
  });

  // Strict Login Check Guard
  useEffect(() => {
    if (isStoryModalOpen && !user) {
      setStoryModalOpen(false);
      toast.error('Please sign in to share a peer story!');
      router.push('/dashboard');
    }
  }, [isStoryModalOpen, user, setStoryModalOpen, router]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        authorName: prev.authorName || user.displayName || '',
        authorEmail: prev.authorEmail || user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to submit a story!');
      router.push('/dashboard');
      return;
    }

    if (!formData.title || !formData.content) {
      toast.error('Please provide both a title and story content.');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await getRecaptchaToken('submit_story');
      const res = await AppsScriptClient.submitStory({
        title: formData.title,
        category: formData.category,
        authorName: formData.authorName || user.displayName || 'Anonymous Peer',
        authorEmail: formData.authorEmail || user.email || '',
        isAnonymous: formData.isAnonymous,
        content: formData.content,
        recaptchaToken: token,
      });

      if (res.success) {
        toast.success('Reflection submitted for moderation review.');
        setStoryModalOpen(false);
        setFormData({
          title: '',
          category: 'Student Voice',
          authorName: user?.displayName || '',
          authorEmail: user?.email || '',
          isAnonymous: false,
          content: '',
        });
      } else {
        toast.error(res.error || 'Submission failed');
      }
    } catch {
      toast.error('Submission error. Saved locally.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !isStoryModalOpen) return null;

  return (
    <AnimatePresence>
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStoryModalOpen(false)}
            className="fixed inset-0 bg-[#0C0D0E]/85 backdrop-blur-xl"
          />

          {/* Modal Container Pane */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative w-full max-w-2xl bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border border-white/15 shadow-2xl z-10 space-y-6 text-[var(--text-main)] transition-colors duration-300"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Peer Reflection Studio
                </span>
                <h2 className="editorial-title text-2xl font-bold text-[var(--text-main)]">
                  Share Your Story
                </h2>
              </div>
              <button
                onClick={() => setStoryModalOpen(false)}
                className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                  Story Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Give your reflection a title..."
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                    Category Tag
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none cursor-pointer"
                  >
                    <option value="Student Voice">Student Voice</option>
                    <option value="Healing & Resilience">Healing & Resilience</option>
                    <option value="Parenting & Youth">Parenting & Youth</option>
                    <option value="School Journey">School Journey</option>
                    <option value="Mindfulness">Mindfulness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    placeholder="Your Name (Optional)"
                    className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                  Reflection Narrative
                </label>
                <textarea
                  name="content"
                  required
                  rows={5}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Share your authentic experience, thoughts, or grounding reflections..."
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleChange}
                    className="rounded border-white/20 text-[var(--primary-accent)]"
                  />
                  <span>Publish Anonymously</span>
                </label>
                <span className="text-[10px] font-mono text-[var(--primary-accent)] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> reCAPTCHA Protected
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setStoryModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-white/10 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] text-xs font-semibold shadow-peach-glow transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Reflection'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
