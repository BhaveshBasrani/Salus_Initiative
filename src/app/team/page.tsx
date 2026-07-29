'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Sparkles,
  Award,
  Heart,
  Linkedin,
  Mail,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Calendar,
  UserCheck,
  HeartHandshake,
} from 'lucide-react';
import { TeamMember, MainTeamInfo } from '@/lib/types';
import { DEFAULT_MAIN_TEAM_INFO, MOCK_TEAM_MEMBERS } from '@/lib/apps-script-client';
import { assetPath } from '@/lib/prefix';
import { useAppStore } from '@/lib/store';

export default function TeamPage() {
  const { setVolunteerWizardOpen } = useAppStore();
  const [teamInfo, setTeamInfo] = useState<MainTeamInfo>(DEFAULT_MAIN_TEAM_INFO);
  const [members, setMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    // Load custom team info or members from localStorage if customized in admin panel
    try {
      const savedInfo = localStorage.getItem('salus_main_team_info');
      if (savedInfo) {
        setTeamInfo(JSON.parse(savedInfo));
      }
      const savedMembers = localStorage.getItem('salus_team_members');
      if (savedMembers) {
        setMembers(JSON.parse(savedMembers));
      }
    } catch (e) {
      console.warn('Using default team data', e);
    }
  }, []);

  const categories = ['All', 'Leadership', 'Peer Leads', 'Editorial & Design', 'Advisors & Mentors'];

  const filteredMembers = activeCategory === 'All'
    ? members
    : members.filter((m) => m.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="space-y-0 text-[var(--text-main)] bg-[var(--app-bg)] min-h-screen pt-20 md:pt-24 transition-colors duration-300">
      
      {/* HERO SECTION - MAIN TEAM PICTURE & NARRATIVE */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="py-8 md:py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-8"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--primary-accent)] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/20">
            <Users className="w-3 h-3" /> Salus Sanctuary Collective
          </span>
          <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-main)] leading-tight">
            {teamInfo.title}
          </h1>
          <p className="editorial-body text-xs sm:text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-normal max-w-2xl mx-auto">
            {teamInfo.subtitle}
          </p>
        </div>

        {/* MAIN TEAM FEATURED DISPLAY BOARD (PICTURE & TEXT) */}
        <div className="bg-[var(--card-bg)] p-6 md:p-10 rounded-3xl border border-white/10 shadow-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center overflow-hidden relative">
          
          {/* Main Team Image Container */}
          <div className="lg:col-span-7 relative w-full h-64 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden bg-[var(--card-inner-bg)] border border-white/10 group">
            <img
              src={assetPath(teamInfo.mainTeamImageUrl)}
              alt="Salus Initiative Main Team"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--primary-accent)] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 w-max mb-1">
                Official Group Showcase
              </span>
              <p className="editorial-title text-lg md:text-xl font-bold text-white">
                Salus Executive & Peer Lead Assembly
              </p>
            </div>
          </div>

          {/* Main Team Narrative & Key Statistics */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--primary-accent)]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--primary-accent)]">
                  Behind The Movement
                </span>
              </div>
              <h2 className="editorial-title text-2xl font-bold text-[var(--text-main)]">
                Peer Advocates & Clinical Mentors Working Side-by-Side
              </h2>
              <p className="editorial-body text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                {teamInfo.narrativeText}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 text-center">
                <span className="text-xl font-bold text-[var(--primary-accent)] font-mono">{teamInfo.foundingYear}</span>
                <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5 uppercase">Established</p>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 text-center">
                <span className="text-xl font-bold text-[var(--primary-accent)] font-mono">{teamInfo.chapterCount}</span>
                <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5 uppercase">Campus Chapters</p>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 text-center">
                <span className="text-xl font-bold text-[var(--primary-accent)] font-mono">{teamInfo.totalMembersCount}</span>
                <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5 uppercase">Team Members</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* TEAM MEMBERS GRID SECTION */}
      <section className="py-12 md:py-16 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)]">
                Our People
              </span>
              <h2 className="editorial-title text-2xl md:text-4xl font-bold text-[var(--text-main)] mt-1">
                Meet The Individuals
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[var(--primary-accent)] text-[var(--button-text)] shadow-peach-glow'
                      : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-white/10 hover:text-[var(--text-main)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Members Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-3xl bg-[var(--card-bg)] border border-white/10 hover:border-[var(--primary-accent)]/40 transition-all overflow-hidden flex flex-col justify-between shadow-editorial"
              >
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[var(--card-inner-bg)] border border-white/10 shrink-0">
                      <img
                        src={assetPath(member.imageUrl)}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--primary-accent)] bg-[var(--primary-accent)]/10 px-2.5 py-0.5 rounded-full border border-[var(--primary-accent)]/20">
                        {member.category}
                      </span>
                      <h3 className="editorial-title text-base font-bold text-[var(--text-main)] mt-1.5 group-hover:text-[var(--primary-accent)] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] font-medium">{member.role}</p>
                    </div>
                  </div>

                  <p className="editorial-body text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  {member.quote && (
                    <blockquote className="p-3 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 text-[11px] text-[var(--text-main)] italic leading-snug">
                      &quot;{member.quote}&quot;
                    </blockquote>
                  )}
                </div>

                <div className="p-4 px-6 bg-[var(--card-inner-bg)]/40 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="text-xs font-bold text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1"
                  >
                    Read Profile <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/10 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/10 transition-colors"
                        title="Contact Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN TEAM / FELLOWSHIP CALLOUT */}
      <section className="py-16 md:py-20 px-4 md:px-8 border-t border-white/10 bg-[var(--card-inner-bg)]/30">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/20">
            <HeartHandshake className="w-3.5 h-3.5" /> Become Part Of The Story
          </span>
          <h2 className="editorial-title text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-main)]">
            Want to Join the Salus Main Team or Chapter Leadership?
          </h2>
          <p className="editorial-body text-xs md:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            We are always looking for passionate youth advocates, writers, design creators, and chapter leads to build the next generation of youth well-being.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setVolunteerWizardOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-semibold text-xs transition-all shadow-peach-glow inline-flex items-center gap-2"
            >
              <span>Apply For Youth Fellowship</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* MEMBER DETAIL MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--card-bg)] border border-white/15 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 pt-2">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/15 shrink-0">
                  <img
                    src={assetPath(selectedMember.imageUrl)}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--primary-accent)] bg-[var(--primary-accent)]/10 px-2.5 py-0.5 rounded-full border border-[var(--primary-accent)]/20">
                    {selectedMember.category}
                  </span>
                  <h3 className="editorial-title text-xl font-bold text-[var(--text-main)]">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">{selectedMember.role}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-[var(--primary-accent)] tracking-wider">Biography</h4>
                <p className="editorial-body text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              {selectedMember.quote && (
                <div className="p-4 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[var(--primary-accent)]">Personal Reflection</span>
                  <p className="text-xs text-[var(--text-main)] italic">
                    &quot;{selectedMember.quote}&quot;
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">Salus Initiative Team Member</span>
                {selectedMember.email && (
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="px-4 py-2 rounded-full bg-[var(--card-inner-bg)] border border-white/10 text-[var(--text-main)] hover:bg-white/10 transition-colors font-semibold"
                  >
                    Email {selectedMember.name.split(' ')[0]}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
