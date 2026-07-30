'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Sparkles,
  Mail,
  X,
  ChevronRight,
  HeartHandshake,
} from 'lucide-react';
import { TeamMember, MainTeamInfo } from '@/lib/types';
import { DEFAULT_MAIN_TEAM_INFO, MOCK_TEAM_MEMBERS } from '@/lib/apps-script-client';
import { assetPath } from '@/lib/prefix';
import { useAppStore } from '@/lib/store';

export default function TeamPage() {
  const { setVolunteerWizardOpen } = useAppStore();
  const [teamInfo] = useState<MainTeamInfo>(DEFAULT_MAIN_TEAM_INFO);
  const [members] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="space-y-0 text-[var(--text-main)] bg-[var(--app-bg)] min-h-screen pt-20 md:pt-24 transition-colors duration-300">
      
      {/* HERO SECTION - MAIN TEAM PICTURE & VISION */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="py-8 md:py-12 px-4 md:px-8 max-w-6xl mx-auto space-y-8"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--primary-accent)] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/20">
            <Users className="w-3.5 h-3.5" /> Salus Core Leadership
          </span>
          <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-main)] leading-tight">
            {teamInfo.title}
          </h1>
          <p className="editorial-body text-xs sm:text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-normal max-w-2xl mx-auto">
            {teamInfo.subtitle}
          </p>
        </div>
      </motion.section>

      {/* TEAM MEMBERS DISPLAY GRID */}
      <section className="py-12 md:py-16 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)]">
              Core Leadership & Advisory
            </span>
            <h2 className="editorial-title text-2xl md:text-4xl font-bold text-[var(--text-main)]">
              Meet The Core Team
            </h2>
          </div>

          {/* 3 Members Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-3xl bg-[var(--card-bg)] border border-white/10 hover:border-[var(--primary-accent)]/40 transition-all overflow-hidden flex flex-col justify-between shadow-editorial"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative w-full h-80 overflow-hidden bg-[var(--card-inner-bg)] border-b border-white/10">
                    <img
                      src={assetPath(member.imageUrl)}
                      alt={member.name}
                      style={{ objectPosition: member.imageUrl.includes('thanush') ? 'center 45%' : 'center top' }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--primary-accent)] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="editorial-title text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[var(--primary-accent)] font-mono mt-0.5">{member.category}</p>
                    </div>

                    <p className="editorial-body text-xs text-[var(--text-muted)] leading-relaxed line-clamp-4 whitespace-pre-line">
                      {member.bio}
                    </p>

                    {member.quote && (
                      <blockquote className="p-3.5 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5 text-[11px] text-[var(--text-main)] italic leading-snug">
                        &quot;{member.quote}&quot;
                      </blockquote>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 px-6 bg-[var(--card-inner-bg)]/50 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="text-xs font-bold text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1"
                  >
                    Read Full Story & Bio <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                      title="Contact Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FELLOWSHIP / JOIN CALLOUT */}
      <section className="py-16 md:py-20 px-4 md:px-8 border-t border-white/10 bg-[var(--card-inner-bg)]/30">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/20">
            <HeartHandshake className="w-3.5 h-3.5" /> Become Part Of The Story
          </span>
          <h2 className="editorial-title text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-main)]">
            Join The Salus Peer Movement
          </h2>
          <p className="editorial-body text-xs md:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            We are always looking for student advocates, storytellers, design creators, and campus leads to make conversations on mental health more open.
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--card-bg)] border border-white/15 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 pt-2">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/15 shrink-0 bg-[var(--card-inner-bg)]">
                  <img
                    src={assetPath(selectedMember.imageUrl)}
                    alt={selectedMember.name}
                    style={{ objectPosition: selectedMember.imageUrl.includes('thanush') ? 'center 45%' : 'center top' }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--primary-accent)] bg-[var(--primary-accent)]/10 px-2.5 py-0.5 rounded-full border border-[var(--primary-accent)]/20">
                    {selectedMember.role}
                  </span>
                  <h3 className="editorial-title text-2xl font-bold text-[var(--text-main)]">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono">{selectedMember.category}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-[var(--primary-accent)] tracking-wider">Full Story & Biography</h4>
                <p className="editorial-body text-xs md:text-sm text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                  {selectedMember.bio}
                </p>
              </div>

              {selectedMember.quote && (
                <div className="p-4 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[var(--primary-accent)]">Personal Quote</span>
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
                    className="px-4 py-2 rounded-full bg-[var(--primary-accent)] text-[var(--button-text)] hover:bg-[var(--accent-hover)] transition-colors font-semibold shadow-peach-glow"
                  >
                    Contact {selectedMember.name.split(' ')[0]}
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
