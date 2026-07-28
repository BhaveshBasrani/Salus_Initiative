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
      <body className="min-h-screen flex items-center justify-center bg-[var(--app-bg)] text-[var(--text-main)] font-sans antialiased p-4">
        <div className="max-w-md w-full bg-[var(--card-bg)] p-8 rounded-3xl border border-white/10 text-center space-y-6 shadow-2xl">
          <h1 className="text-2xl font-bold font-serif text-[var(--text-main)]">Global System Error</h1>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            A root-level exception occurred. Please reset the session or reload the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-[var(--primary-accent)] text-[var(--button-text)] font-semibold text-xs hover:bg-[var(--accent-hover)] transition-colors shadow-lg"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
