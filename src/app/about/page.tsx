'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Heart, ChevronDown, Users, BookOpen, Sparkles, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_FAQS } from '@/lib/apps-script-client';
import { assetPath } from '@/lib/prefix';

export default function AboutPage() {
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const filteredFaqs = activeFaqCategory === 'All'
    ? MOCK_FAQS
    : MOCK_FAQS.filter((f) => f.audienceCategory === activeFaqCategory);

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
          <Sparkles className="w-3 h-3" /> The Salus Origin
        </span>
        <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-main)] leading-tight">
          The Anatomy of Emotional Sanctuary
        </h1>
        <p className="editorial-body text-xs sm:text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-normal max-w-2xl mx-auto">
          Rooted in ancient principles of well-being (&quot;Salus&quot;) and designed for modern youth, we combine editorial beauty with non-clinical peer support.
        </p>
      </motion.section>

      {/* ANATOMICAL LOGO EXHIBITION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="py-12 md:py-16 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto bg-[var(--card-bg)] p-6 md:p-12 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center shadow-editorial transition-colors duration-300 relative overflow-hidden">
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-[var(--card-inner-bg)] p-6 border border-white/10 flex items-center justify-center">
            <Image
              src={assetPath('/Logo.png')}
              alt="Salus Initiative Vintage Anatomical Illustration"
              fill
              className="object-contain p-6 filter logo-invert"
            />
          </div>

          <div className="space-y-5">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)]">
              Exhibition Notes • Plate 01
            </span>
            <h2 className="editorial-title text-2xl md:text-4xl font-bold text-[var(--text-main)]">
              Why the Anatomical Brain?
            </h2>
            <p className="editorial-body text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
              Our brand mark fuses vintage neurological illustration with bold modern typography. It signifies two core truths:
            </p>
            <ul className="space-y-3 text-xs text-[var(--text-muted)]">
              <li className="flex items-start gap-3 p-3 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)] mt-1.5 shrink-0" />
                <span><strong>Mental Health is Physical Health</strong>: Mental struggles are not moral failures or personal weakness; they are biological and emotional human experiences.</span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-2xl bg-[var(--card-inner-bg)] border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)] mt-1.5 shrink-0" />
                <span><strong>Science + Compassion</strong>: Understanding brain chemistry must be paired with deep human warmth and active listening.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* CORE PILLARS SECTION */}
      <section className="py-16 md:py-20 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)]">
              Our Core Architecture
            </span>
            <h2 className="editorial-title text-2xl md:text-4xl font-bold text-[var(--text-main)]">
              Three Pillars of Salus Initiative
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Peer-Led Authenticity",
                desc: "We prioritize real voices over clinical jargon. Students sharing lived experiences helps destigmatize mental health discussions in schools.",
              },
              {
                icon: Shield,
                title: "Safety & Privacy First",
                desc: "100% anonymous story sharing options, reCAPTCHA protection, and strict content moderation ensure a safe reflection environment.",
              },
              {
                icon: BookOpen,
                title: "Evidence-Guided Toolkits",
                desc: "Actionable grounding techniques, mindfulness exercises, and verified helpline directory developed alongside mental health professionals.",
              },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-6 md:p-8 rounded-3xl bg-[var(--card-bg)] border border-white/10 hover:border-[var(--primary-accent)]/40 transition-all space-y-4 shadow-editorial"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 text-[var(--primary-accent)] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="editorial-title text-lg md:text-xl font-bold text-[var(--text-main)]">{p.title}</h3>
                  <p className="editorial-body text-xs text-[var(--text-muted)] leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN TEAM SPOTLIGHT BANNER */}
      <section className="py-16 md:py-20 px-4 md:px-8 border-t border-white/10 bg-[var(--card-inner-bg)]/40">
        <div className="max-w-6xl mx-auto bg-[var(--card-bg)] p-6 md:p-12 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-editorial">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/20">
              <Users className="w-3.5 h-3.5" /> Main Leadership & Advocates
            </span>
            <h2 className="editorial-title text-2xl md:text-4xl font-bold text-[var(--text-main)]">
              Meet The Architects Behind Salus Initiative
            </h2>
            <p className="editorial-body text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
              Our core team combines peer youth advocates, creative storytellers, and clinical advisory mentors working together to empower student well-being.
            </p>
          </div>

          <Link
            href="/team"
            className="px-6 py-3.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-semibold text-xs transition-all shadow-peach-glow inline-flex items-center gap-2 shrink-0"
          >
            <span>Explore Main Team Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* INTERACTIVE FAQ ACCORDION SECTION */}
      <section className="py-16 md:py-20 px-4 md:px-8 border-t border-white/10" id="faq">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--primary-accent)]">
              Knowledge Base
            </span>
            <h2 className="editorial-title text-2xl md:text-3xl font-bold text-[var(--text-main)]">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {['All', 'Students', 'Parents', 'Schools'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFaqCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFaqCategory === cat
                    ? 'bg-[var(--primary-accent)] text-[var(--button-text)] shadow-peach-glow'
                    : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-white/10 hover:text-[var(--text-main)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion Items */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[var(--card-bg)] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs md:text-sm text-[var(--text-main)] hover:bg-white/5 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[var(--primary-accent)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 md:p-5 pt-0 text-xs text-[var(--text-muted)] border-t border-white/5 leading-relaxed bg-[var(--card-inner-bg)]/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
