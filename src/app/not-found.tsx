'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#0F1012] text-[#F6F4EF]">
      <div className="max-w-md w-full bg-[#1B1D21] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#15171B] border border-white/10 text-[#FF7E67] flex items-center justify-center">
          <Compass className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF7E67]">
            404 • Page Uncharted
          </span>
          <h1 className="editorial-title text-3xl font-bold text-[#F6F4EF]">
            Quiet Corner
          </h1>
          <p className="editorial-body text-xs text-[#C7C4BE] leading-relaxed">
            The journal entry or resource path you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF7E67] hover:bg-[#F69A84] text-white text-xs font-semibold transition-colors shadow-peach-glow"
          >
            <Home className="w-4 h-4" /> Return to Main Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
