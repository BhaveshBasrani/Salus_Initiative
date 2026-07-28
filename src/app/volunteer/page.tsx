'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { toast } from 'sonner';

export default function VolunteerPage() {
  const router = useRouter();
  const { setVolunteerWizardOpen } = useAppStore();
  const { user } = useAuthStore();

  const handleApplyClick = () => {
    if (!user) {
      toast.error('Please sign in to apply for the Salus Fellowship!');
      router.push('/dashboard');
      return;
    }
    setVolunteerWizardOpen(true);
  };

  return (
    <div className="space-y-0 text-[var(--text-main)] bg-[var(--app-bg)] min-h-screen pt-20 md:pt-24 transition-colors duration-300">
      {/* MANIFESTO HEADER - PERFECT RESPONSIVE TOP MARGIN */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="py-6 md:py-10 px-4 md:px-8 text-center max-w-3xl mx-auto space-y-4"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/20">
          The Salus Fellowship
        </span>
        <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-main)] leading-tight">
          Join the Leadership Movement for Youth Mental Health
        </h1>
        <p className="editorial-body text-xs sm:text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-normal max-w-2xl mx-auto">
          We are not looking for corporate volunteers. We are gathering compassionate student advocates, peer leaders, and creative champions committed to restoring emotional dignity in their local communities.
        </p>
        <div className="pt-2">
          <button
            onClick={handleApplyClick}
            className="px-8 py-3.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-semibold text-xs inline-flex items-center gap-2.5 shadow-peach-glow transition-all"
          >
            <HeartHandshake className="w-4 h-4" /> Start Ambassador Fellowship Application
          </button>
        </div>
      </motion.section>

      {/* ROLES GRID */}
      <section className="py-16 md:py-20 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)]">
              Fellowship Pathways
            </span>
            <h2 className="editorial-title text-2xl md:text-3xl font-bold text-[var(--text-main)] mt-1">
              Leadership & Advocacy Roles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "Student Ambassador",
                time: "2–4 hours/week",
                desc: "Serve as the empathetic voice of Salus in your high school or college. Distribute toolkits, host monthly quiet reflection corners, and share crisis resources.",
                perks: ["Official Certificate of Leadership", "Mentorship from mental health pros", "Swag & Toolkit box"],
              },
              {
                title: "School Chapter Leader",
                time: "4–6 hours/week",
                desc: "Charter an official Salus Initiative club at your school. Lead executive board meetings, host guest speakers, and organize campus-wide wellness weeks.",
                perks: ["Chapter Starter Funding", "National Leadership Network", "Annual Summit Invitation"],
              },
              {
                title: "Content & Creative Contributor",
                time: "2–3 hours/week",
                desc: "Design editorial graphics, write articles for our story hub, and record voice clips for 'Today's Whisper' reflections.",
                perks: ["Published Portfolio Work", "Creative Autonomy", "Graphic Design Toolkits"],
              },
              {
                title: "Peer Mentor Circle Facilitator",
                time: "3–5 hours/week",
                desc: "Facilitate virtual peer support circles with active listening training. Help students feel heard and less alone in their struggles.",
                perks: ["Active Listening Certification", "Supervised Peer Coaching", "High Impact"],
              },
            ].map((role, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl bg-[var(--card-bg)] border border-white/10 hover:border-[var(--primary-accent)]/40 transition-all space-y-6 flex flex-col justify-between shadow-editorial"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="editorial-title text-lg md:text-xl font-bold text-[var(--text-main)]">{role.title}</h3>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[var(--card-inner-bg)] text-[var(--primary-accent)] border border-white/10">
                      {role.time}
                    </span>
                  </div>
                  <p className="editorial-body text-xs text-[var(--text-muted)] leading-relaxed">{role.desc}</p>
                  <ul className="space-y-2 pt-2 text-xs text-[var(--text-main)]">
                    {role.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--primary-accent)]" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={handleApplyClick}
                    className="w-full py-3 rounded-2xl bg-[var(--card-inner-bg)] hover:bg-white/10 text-[var(--text-main)] text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
                  >
                    <span>Apply for {role.title}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--primary-accent)]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
