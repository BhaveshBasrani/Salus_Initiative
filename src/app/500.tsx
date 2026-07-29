'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home } from 'lucide-react';

export default function Custom500() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[var(--app-bg)] text-[var(--text-main)]">
      <div className="max-w-md w-full bg-[var(--card-bg)] p-8 rounded-3xl border border-white/10 shadow-2xl text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--card-inner-bg)] border border-white/10 text-[var(--primary-accent)] flex items-center justify-center">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="editorial-title text-2xl font-bold text-[var(--text-main)]">
            500 • Server Exception
          </h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            An internal server exception occurred while rendering this page.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] text-xs font-semibold transition-colors shadow-peach-glow"
          >
            <Home className="w-3.5 h-3.5" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
