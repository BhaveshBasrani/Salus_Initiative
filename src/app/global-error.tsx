'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex items-center justify-center bg-[#0F1012] text-[#F6F4EF] font-sans antialiased p-4">
        <div className="max-w-md w-full bg-[#1B1D21] p-8 rounded-3xl border border-white/10 text-center space-y-6 shadow-2xl">
          <h1 className="text-2xl font-bold font-serif text-[#F6F4EF]">Global System Error</h1>
          <p className="text-xs text-[#C7C4BE] leading-relaxed">
            A root-level exception occurred. Please reset the session or reload the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-[#FF7E67] text-white font-semibold text-xs hover:bg-[#F69A84] transition-colors shadow-lg"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
