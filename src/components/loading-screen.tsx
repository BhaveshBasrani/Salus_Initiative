'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, RefreshCw, Mail } from 'lucide-react';
import { assetPath } from '@/lib/prefix';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [healthError, setHealthError] = useState<string | null>(null);

  const runHealthChecks = async () => {
    setHealthError(null);

    try {
      const firebaseKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
      const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

      // If no backend env vars are configured (e.g. static GitHub Pages deploy),
      // skip checks silently and let the app load with mock/fallback data.
      if (!firebaseKey || !appsScriptUrl || appsScriptUrl.includes('demo')) {
        setTimeout(() => { setIsLoading(false); }, 700);
        return;
      }

      // If env vars ARE set, do a quick connectivity check
      try {
        const res = await fetch(`${appsScriptUrl}?action=ping`, { method: 'GET', signal: AbortSignal.timeout(5000) });
        // Any response (even error JSON) means server is reachable
      } catch {
        // Network failure — still allow loading, data methods have their own fallbacks
      }

      setTimeout(() => { setIsLoading(false); }, 700);
    } catch {
      // Unexpected error — still proceed, don't block the app
      setTimeout(() => { setIsLoading(false); }, 700);
    }
  };

  useEffect(() => {
    runHealthChecks();
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="salus-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--app-bg)] text-[var(--text-main)] select-none p-4 transition-colors duration-300"
        >
          {/* Logo Centerpiece */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-20 h-20 md:w-24 md:h-24 mb-6"
          >
            <Image
              src={assetPath('/Logo.png')}
              alt="Salus Logo"
              fill
              className="object-contain logo-invert"
              priority
            />
          </motion.div>

          {/* Editorial Title */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-1.5"
          >
            <h1 className="editorial-title text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-main)]">
              SALUS <span className="text-[var(--primary-accent)]">INITIATIVE</span>
            </h1>
            <p className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase">
              Youth Mental Health & Emotional Well-Being
            </p>
          </motion.div>

          {/* Diagnostic Notice (If Error Occurs) */}
          {healthError ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 rounded-3xl bg-[var(--card-bg)] border border-red-500/30 max-w-sm text-center space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-red-400">System Connection Issue</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  System setup encountered an issue. Please contact developer.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={runHealthChecks}
                  className="flex-1 py-2.5 rounded-2xl bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-bold text-xs shadow-peach-glow transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retry
                </button>
                <a
                  href="mailto:bhaveshkumarbasrani@gmail.com"
                  className="flex-1 py-2.5 rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 hover:bg-white/5 text-[var(--text-main)] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--primary-accent)]" /> Contact
                </a>
              </div>
            </motion.div>
          ) : (
            /* Minimal Ambient Pulse Line (No Technical Verifying Text) */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)] animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)]/60 animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-[var(--primary-accent)]/30" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
