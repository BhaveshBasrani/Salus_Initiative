'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PenSquare, Eye, User, X, Sparkles, BookOpen, Clock, Bookmark, Loader2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { MOCK_STORIES, AppsScriptClient } from '@/lib/apps-script-client';
import { Story } from '@/lib/types';
import { toast } from 'sonner';

export default function StoriesPage() {
  const router = useRouter();
  const { setStoryModalOpen } = useAppStore();
  const { user, bookmarkedStoryIds, toggleBookmarkStory } = useAuthStore();
  
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    setIsLoading(true);
    AppsScriptClient.getStories()
      .then((data) => {
        setStories(data || []);
      })
      .catch(() => {
        setStories([]);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 200);
      });
  }, []);

  const categories = ['All', 'Student Voice', 'Healing & Resilience', 'Parenting & Youth', 'School Journey', 'Mindfulness'];

  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter((s) => s.category === activeCategory);

  const handleShareClick = () => {
    if (!user) {
      toast.error('Please sign in to share a story!');
      router.push('/dashboard');
      return;
    }
    setStoryModalOpen(true);
  };

  return (
    <div className="space-y-0 text-[var(--text-main)] bg-[var(--app-bg)] min-h-screen pt-20 md:pt-24 transition-colors duration-300">
      
      {/* HEADER SECTION - PERFECT RESPONSIVE TOP MARGIN */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="py-6 md:py-10 px-4 md:px-8 text-center max-w-3xl mx-auto space-y-4"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--primary-accent)] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/20">
          <Sparkles className="w-3 h-3" /> Community Archive
        </span>
        <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-main)] leading-tight">
          Stories of Courage & Resilience
        </h1>
        <p className="editorial-body text-xs sm:text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-normal max-w-2xl mx-auto">
          Every article in this repository is authored by students, parents, and peer mentors. Read, reflect, or contribute your own voice.
        </p>
        <div className="pt-2">
          <button
            onClick={handleShareClick}
            className="px-7 py-3 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-semibold text-xs inline-flex items-center gap-2 shadow-peach-glow transition-all"
          >
            <PenSquare className="w-4 h-4" /> Share Your Reflection
          </button>
        </div>
      </motion.section>

      {/* CATEGORY FILTER TABS */}
      <section className="py-5 px-4 border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--primary-accent)] text-[var(--button-text)] shadow-peach-glow font-semibold'
                  : 'bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* STORIES ARCHIVE GRID & ELEGANT LOADER */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* LOADER STATE */}
          {isLoading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[var(--card-bg)] border border-[var(--primary-accent)]/30 text-[var(--primary-accent)] flex items-center justify-center shadow-peach-glow">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                Fetching Community Reflections...
              </p>
            </div>
          ) : filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredStories.map((story) => {
                const isBookmarked = bookmarkedStoryIds.includes(story.id);
                const safeAuthorName = story.authorName || (story as any).author || 'Anonymous Peer';
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 rounded-3xl bg-[var(--card-bg)] border border-white/10 hover:border-[var(--primary-accent)]/40 transition-all flex flex-col justify-between space-y-6 shadow-editorial group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[var(--primary-accent)] uppercase tracking-wider">
                          {story.category}
                        </span>
                        <button
                          onClick={() => toggleBookmarkStory(story.id)}
                          className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--primary-accent)] transition-colors"
                          title="Bookmark story"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[var(--primary-accent)] text-[var(--primary-accent)]' : ''}`} />
                        </button>
                      </div>

                      <h3 className="editorial-title text-base md:text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                        {story.title}
                      </h3>

                      <p className="editorial-body text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[var(--card-inner-bg)] border border-white/10 flex items-center justify-center text-[10px] font-bold text-[var(--primary-accent)]">
                          {safeAuthorName.charAt(0)}
                        </div>
                        <span className="text-[11px] text-[var(--text-main)]">{safeAuthorName}</span>
                      </div>

                      <button
                        onClick={() => setSelectedStory(story)}
                        className="px-3 py-1.5 rounded-full bg-[var(--card-inner-bg)] hover:bg-white/10 text-[var(--text-main)] text-[11px] font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Read Narrative
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-[var(--text-muted)]">
              No stories found in the &quot;{activeCategory}&quot; category.
            </div>
          )}

        </div>
      </section>

      {/* STORY DETAIL MODAL */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStory(null)}
              className="fixed inset-0 bg-[#0C0D0E]/85 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[var(--card-bg)] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl z-10 space-y-6 text-[var(--text-main)] my-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[var(--primary-accent)] uppercase tracking-wider">
                    {selectedStory.category}
                  </span>
                  <h2 className="editorial-title text-2xl font-bold text-[var(--text-main)] mt-0.5">
                    {selectedStory.title}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Authored by <strong>{selectedStory.authorName || (selectedStory as any).author || 'Anonymous Peer'}</strong> • {selectedStory.readTime || '3 min read'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="editorial-body text-xs md:text-sm text-[var(--text-main)] leading-relaxed space-y-4 whitespace-pre-wrap">
                {selectedStory.content || selectedStory.excerpt}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-2 rounded-full bg-[var(--primary-accent)] text-[var(--button-text)] font-semibold text-xs shadow-peach-glow"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
