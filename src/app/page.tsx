'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { assetPath } from '@/lib/prefix';
import {
  PenSquare,
  BookOpen,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Users,
  Compass,
  Zap,
  Star,
  LogIn,
  CheckCircle2,
  Smile,
  Layers,
  MessageCircle,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { AppsScriptClient } from '@/lib/apps-script-client';
import { Story } from '@/lib/types';
import { TodaysWhisper } from '@/components/todays-whisper';

export default function HomePage() {
  const { setStoryModalOpen, setVolunteerWizardOpen } = useAppStore();
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'students' | 'parents'>('all');

  useEffect(() => {
    AppsScriptClient.getStories()
      .then((data) => {
        setFeaturedStories((data || []).slice(0, 3));
      })
      .catch(() => {
        setFeaturedStories([]);
      });
  }, []);

  const stats = [
    { label: 'Active Advocates', value: '1,200+', icon: Users },
    { label: 'Psychological Safety', value: '100%', icon: ShieldCheck },
    { label: 'Fellowship Tracks', value: '04', icon: Layers },
    { label: 'Story Support', value: '24/7', icon: MessageCircle },
  ];

  const pillars = [
    {
      id: 'storytelling',
      title: 'Peer Storytelling & Expression',
      category: 'Psychological Safety',
      description: 'A quiet, anonymous sanctuary to write and share authentic reflections about academic stress, identity, and inner resilience.',
      icon: FeatherIcon,
      actionText: 'Write A Story',
      onClick: () => setStoryModalOpen(true),
    },
    {
      id: 'fellowship',
      title: 'Fellowship & Campus Chapters',
      category: 'Youth Empowerment',
      description: 'Join student-led chapters across school campuses in Design, Editorial, Marketing, and Research tracks.',
      icon: HeartHandshake,
      actionText: 'Apply For Fellowship',
      onClick: () => setVolunteerWizardOpen(true),
    },
    {
      id: 'toolkits',
      title: 'Evidence-Guided Toolkits',
      category: 'Mental Well-Being',
      description: 'Access curated grounding guides, sensory tools, and mindful strategies designed for youth emotional health.',
      icon: Compass,
      actionText: 'Explore Toolkits',
      href: '/stories',
    },
    {
      id: 'community',
      title: 'Parent & Educator Dialogues',
      category: 'Intergenerational Bridge',
      description: 'Bridging the silent divide between parents and students through empathetic listening frameworks.',
      icon: Sparkles,
      actionText: 'View Insights',
      href: '/about',
    },
  ];

  function FeatherIcon(props: any) {
    return <PenSquare {...props} />;
  }

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--text-main)] select-none overflow-x-hidden transition-colors duration-300 relative">
      
      {/* Dynamic Animated Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[var(--primary-accent)]/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-[var(--primary-accent)]/15 rounded-full blur-[130px]"
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--card-inner-bg)] border border-white/15 text-xs font-mono text-[var(--primary-accent)] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Independent Youth Mental Health Initiative</span>
            </div>

            <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-main)] leading-[1.05]">
              Youth Mental Health & <br />
              <span className="italic font-serif text-[var(--primary-accent)]">Sanctuary for Every Mind.</span>
            </h1>

            <p className="editorial-body text-sm sm:text-base md:text-lg text-[var(--text-muted)] max-w-xl font-normal leading-relaxed">
              Salus Initiative is a peer-led student movement bridging human warmth, psychological safety, and quiet reflection. Empowering students, parents, and schools through authentic storytelling.
            </p>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStoryModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-bold text-xs flex items-center justify-center gap-2.5 shadow-peach-glow transition-all duration-150"
              >
                <PenSquare className="w-4 h-4" />
                <span>Share Your Story</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVolunteerWizardOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--card-inner-bg)] hover:bg-white/10 text-[var(--primary-accent)] border border-[var(--primary-accent)]/40 font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-150"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Join Fellowship</span>
              </motion.button>

              <Link
                href="/stories"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--card-bg)] hover:bg-white/10 text-[var(--text-main)] border border-white/15 font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-150"
              >
                <BookOpen className="w-4 h-4 text-[var(--primary-accent)]" />
                <span>Explore Journal</span>
              </Link>
            </div>

            {/* Micro Highlights Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-[var(--text-muted)] border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Anonymous & Free</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--primary-accent)]" />
                <span>Verified Peer Moderation</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Exhibit Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-[var(--card-bg)] border border-white/15 shadow-editorial space-y-6 text-center relative overflow-hidden transition-colors duration-300 group">
              
              {/* Decorative Corner Orbs */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-[var(--primary-accent)]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-white/10 pb-4">
                <span className="flex items-center gap-1.5 text-[var(--primary-accent)] font-bold">
                  <Zap className="w-3 h-3" /> Sanctuary Exhibit
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--card-inner-bg)] border border-white/10 text-[var(--text-main)]">
                  VOL 2026
                </span>
              </div>

              {/* Floating Animated Brain Logo */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-44 h-44 md:w-52 md:h-52 mx-auto my-2 flex items-center justify-center"
              >
                <Image
                  src={assetPath('/Logo.png')}
                  alt="Anatomy of Mental Sanctuary Brain Illustration"
                  fill
                  className="object-contain logo-invert filter drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </motion.div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <blockquote className="editorial-title text-sm md:text-base font-semibold text-[var(--text-main)] italic">
                  &quot;You are not alone in the quiet struggle.&quot;
                </blockquote>
                <span className="block text-[11px] font-mono text-[var(--primary-accent)]">
                  Daily Peer Reflection • Salus Sanctuary
                </span>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => setStoryModalOpen(true)}
                  className="w-full py-2.5 rounded-2xl bg-[var(--card-inner-bg)] hover:bg-[var(--primary-accent)]/15 border border-white/10 text-xs font-semibold text-[var(--text-main)] hover:text-[var(--primary-accent)] transition-all flex items-center justify-center gap-1.5"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>Submit Peer Story</span>
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* LIVE IMPACT COUNTER STATS BAR */}
      <section className="py-10 px-4 md:px-8 border-b border-white/10 bg-[var(--card-inner-bg)]/40 transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-[var(--card-bg)] border border-white/10 text-center space-y-1.5 hover:border-[var(--primary-accent)]/30 transition-colors"
              >
                <Icon className="w-5 h-5 text-[var(--primary-accent)] mx-auto mb-2" />
                <h3 className="editorial-title text-2xl md:text-3xl font-bold text-[var(--text-main)]">
                  {stat.value}
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE DAILY WHISPER SECTION */}
      <section className="py-16 md:py-20 px-4 md:px-8 border-b border-white/10 relative">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/20">
            <Sparkles className="w-3.5 h-3.5" /> Mindful Sanctuary Reflection
          </span>
          <h2 className="editorial-title text-3xl md:text-4xl font-bold text-[var(--text-main)]">
            Today's Peer Whisper
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto">
            Uplifting reminders created by students for students. Shuffle to reflect on your daily state of mind.
          </p>
        </div>

        <TodaysWhisper />
      </section>

      {/* PILLARS OF SANCTUARY Showcase Grid */}
      <section className="py-20 px-4 md:px-8 border-b border-white/10 bg-[var(--card-bg)]/30 transition-colors duration-300">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)]">
              Core Ecosystem
            </span>
            <h2 className="editorial-title text-3xl md:text-5xl font-bold text-[var(--text-main)]">
              Pillars of Salus Initiative
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Designed to foster psychological safety, youth leadership, and empathetic community connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="p-6 rounded-3xl bg-[var(--card-bg)] border border-white/10 hover:border-[var(--primary-accent)]/40 shadow-xl transition-all space-y-5 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 text-[var(--primary-accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--primary-accent)] block">
                      {pillar.category}
                    </span>
                    <h3 className="editorial-title text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="editorial-body text-xs text-[var(--text-muted)] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    {pillar.onClick ? (
                      <button
                        onClick={pillar.onClick}
                        className="w-full py-2 rounded-full bg-[var(--card-inner-bg)] hover:bg-[var(--primary-accent)] text-[var(--text-main)] hover:text-[var(--button-text)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>{pillar.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <Link
                        href={pillar.href || '/stories'}
                        className="w-full py-2 rounded-full bg-[var(--card-inner-bg)] hover:bg-[var(--primary-accent)] text-[var(--text-main)] hover:text-[var(--button-text)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>{pillar.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

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
                Community Reflections
              </h2>
            </div>
            <Link
              href="/stories"
              className="text-xs font-semibold text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1.5 self-start md:self-auto"
            >
              View All Peer Stories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {featuredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredStories.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ y: -4 }}
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
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 md:p-12 rounded-3xl bg-[var(--card-bg)] border border-white/10 text-center space-y-4 max-w-xl mx-auto">
              <BookOpen className="w-10 h-10 text-[var(--primary-accent)] mx-auto" />
              <div className="space-y-1">
                <h3 className="editorial-title text-xl font-bold text-[var(--text-main)]">
                  Be The First Voice
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Our community story box is open for reflections. Share your experience anonymously and inspire peers across school campuses.
                </p>
              </div>
              <button
                onClick={() => setStoryModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-bold text-xs shadow-peach-glow transition-all"
              >
                Submit First Story
              </button>
            </div>
          )}

        </div>
      </section>

      {/* CALL TO ACTION (CTA) BANNER */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-3xl bg-[var(--card-bg)] border border-[var(--primary-accent)]/30 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-accent)]/10 via-transparent to-[var(--primary-accent)]/10 pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--card-inner-bg)] border border-white/15 text-xs font-mono text-[var(--primary-accent)]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Join The Movement</span>
          </div>

          <h2 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-main)] max-w-2xl mx-auto leading-tight">
            Break the Silence. <br />
            <span className="italic font-serif text-[var(--primary-accent)]">Share Your Voice Today.</span>
          </h2>

          <p className="editorial-body text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            Whether you want to publish a personal story or join our student fellowship, your presence helps build a kinder, safer space for youth mental health.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setStoryModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-bold text-xs shadow-peach-glow transition-all flex items-center gap-2"
            >
              <PenSquare className="w-4 h-4" />
              <span>Share Story Anonymously</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setVolunteerWizardOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[var(--card-inner-bg)] hover:bg-white/10 text-[var(--text-main)] border border-white/15 font-semibold text-xs transition-all flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-[var(--primary-accent)]" />
              <span>Become a Student Fellow</span>
            </motion.button>
          </div>

        </div>
      </section>

    </div>
  );
}
