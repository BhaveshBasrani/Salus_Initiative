'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Share2, Quote, Check, BookOpen } from 'lucide-react';
import { MOCK_WHISPERS } from '@/lib/apps-script-client';
import { WhisperQuote } from '@/lib/types';
import { toast } from 'sonner';

export function TodaysWhisper() {
  const [whispers, setWhispers] = useState<WhisperQuote[]>(MOCK_WHISPERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [copied, setCopied] = useState(false);




  const activeWhisper = whispers[currentIndex] || MOCK_WHISPERS[0];

  const handleShuffle = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % whispers.length);
      setIsRotating(false);
    }, 200);
  };

  const handleShare = () => {
    const textToCopy = `"${activeWhisper.quote}" — ${activeWhisper.author} (Salus Initiative)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Whisper reflection copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto my-8 md:my-12 select-none">
      <motion.div
        layout
        className="relative bg-[var(--card-bg)] p-6 md:p-12 rounded-3xl border border-white/10 shadow-editorial backdrop-blur-xl transition-colors duration-300"
      >
        {/* Header Metadata */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[var(--card-inner-bg)] border border-white/10 text-[var(--primary-accent)]">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--primary-accent)]">
                Daily Journal Reflection
              </span>
              <p className="text-xs text-[var(--text-muted)]">Salus Today's Whisper</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-[var(--card-inner-bg)] text-[var(--text-main)] border border-white/10">
            {activeWhisper.category || 'Mindfulness'}
          </span>
        </div>

        {/* Dynamic Quote Text Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWhisper.id || currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 my-4 text-center md:text-left"
          >
            <Quote className="w-8 h-8 text-[var(--primary-accent)]/30 mx-auto md:mx-0" />
            <blockquote className="editorial-title text-xl md:text-2xl font-normal leading-relaxed text-[var(--text-main)] italic">
              &quot;{activeWhisper.quote}&quot;
            </blockquote>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="h-0.5 w-6 bg-[var(--primary-accent)]" />
              <span className="text-xs font-mono tracking-wide text-[var(--primary-accent)] uppercase">
                {activeWhisper.author}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10 text-xs">
          <button
            onClick={handleShuffle}
            className="px-4 py-2 rounded-full bg-[var(--card-inner-bg)] hover:bg-white/10 text-[var(--text-main)] border border-white/10 font-semibold flex items-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[var(--primary-accent)] ${isRotating ? 'animate-spin' : ''}`} />
            <span>Shuffle Reflection</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-full bg-[var(--card-inner-bg)] hover:bg-white/10 text-[var(--primary-accent)] border border-white/10 font-semibold flex items-center gap-2 transition-all active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share Quote'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
