'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  PenSquare,
  BookOpen,
  ArrowRight,
  Sparkles,
  Quote as QuoteIcon,
  ShieldAlert,
  LogIn,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { MOCK_STORIES } from '@/lib/apps-script-client';

export default function HomePage() {
  const { setStoryModalOpen } = useAppStore();
  const featuredStories = MOCK_STORIES.filter((s) => s.isFeatured || s.status === 'Approved').slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--text-main)] select-none overflow-x-hidden transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 md:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--card-inner-bg)] border border-white/15 text-xs font-mono text-[var(--primary-accent)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Indian Youth Initiative</span>
            </div>

            <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-main)] leading-[1.08]">
              Youth Mental Health & <br />
              <span className="italic font-serif text-[var(--primary-accent)]">Sanctuary for the Soul.</span>
            </h1>

            <p className="editorial-body text-xs sm:text-sm md:text-base text-[var(--text-muted)] max-w-xl font-normal leading-relaxed">
              Salus Initiative is a peer-led student movement bridging human warmth and quiet reflection. Empowering students, parents, and schools through authentic storytelling and evidence-guided toolkits.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => setStoryModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs flex items-center justify-center gap-2.5 shadow-peach-glow active:scale-95 transition-all duration-150"
              >
                <PenSquare className="w-4 h-4" />
                Share Your Story
              </button>
              
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--card-inner-bg)] hover:bg-white/10 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30 font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all duration-150"
              >
                <LogIn className="w-4 h-4" />
                Sign In / Portal
              </Link>

              <Link
                href="/stories"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--card-bg)] hover:bg-white/10 text-[var(--text-main)] border border-white/10 font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all duration-150"
              >
                <BookOpen className="w-4 h-4 text-[var(--primary-accent)]" />
                Explore Journal
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Centerpiece Logo Exhibition (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-[var(--card-bg)] border border-white/15 shadow-editorial space-y-6 text-center relative overflow-hidden transition-colors duration-300">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-white/10 pb-4">
                <span>Sanctuary Exhibit</span>
                <span className="text-[var(--primary-accent)]">VOL 01</span>
              </div>

              <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
                <Image
                  src="/Logo.png"
                  alt="Anatomy of Mental Sanctuary Brain Illustration"
                  fill
                  className="object-contain logo-invert drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <blockquote className="editorial-title text-sm md:text-base font-semibold text-[var(--text-main)] italic">
                  &quot;You are not alone in the quiet struggle.&quot;
                </blockquote>
                <span className="block text-[11px] font-mono text-[var(--text-muted)]">
                  Daily Peer Whisper • Salus Initiative
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FEATURED COMMUNITY STORIES SECTION */}
      <section className="py-20 px-4 md:px-8 border-b border-white/10 bg-[var(--card-bg)]/50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)]">
                Reflective Journal
              </span>
              <h2 className="editorial-title text-3xl md:text-4xl font-bold text-[var(--text-main)] mt-1">
                Community Stories
              </h2>
            </div>
            <Link
              href="/stories"
              className="text-xs font-semibold text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1.5 self-start md:self-auto"
            >
              View All Peer Stories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-3xl bg-[var(--card-bg)] border border-white/10 hover:border-[var(--primary-accent)]/40 transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30">
                    {story.category}
                  </span>
                  <h3 className="editorial-title text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                    {story.title}
                  </h3>
                  <p className="editorial-body text-xs text-[var(--text-muted)] line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{story.authorName}</span>
                  <Link href="/stories" className="text-[var(--primary-accent)] font-semibold flex items-center gap-1">
                    Read Story <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
