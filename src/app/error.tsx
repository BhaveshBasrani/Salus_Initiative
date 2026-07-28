'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception to console
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#0F1012] text-[#F6F4EF]">
      <div className="max-w-md w-full bg-[#1B1D21] p-8 rounded-3xl border border-white/10 shadow-2xl text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#15171B] border border-white/10 text-[#FF7E67] flex items-center justify-center">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="editorial-title text-2xl font-bold text-[#F6F4EF]">
            Something Went Wrong
          </h2>
          <p className="text-xs text-[#C7C4BE] leading-relaxed">
            An unexpected error occurred while loading this view. We have recorded the event for review.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#FF7E67] hover:bg-[#F69A84] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-peach-glow"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#15171B] border border-white/15 text-[#F6F4EF] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#FF7E67]" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
