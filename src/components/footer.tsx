'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Shield, PhoneCall, ExternalLink, Send } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { assetPath } from '@/lib/prefix';
import { toast } from 'sonner';

export function Footer() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for subscribing to Salus Quiet Digest!');
  };

  // ONLY USE MINIMAL FOOTER AT THE LOGIN PAGE (/dashboard when not logged in)
  if (!user && pathname === '/dashboard') {
    return (
      <footer className="py-6 px-4 text-center bg-[var(--app-bg)] text-[var(--text-muted)] text-xs border-t border-white/5 transition-colors duration-300">
        <p className="font-mono">
          Designed & Developed by{' '}
          <a
            href="https://rendervoid.com"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1 font-bold"
          >
            RenderVoid <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </footer>
    );
  }

  return (
    <footer className="bg-[var(--app-bg)] border-t border-white/10 text-[var(--text-muted)] text-xs pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12">
        {/* Helpline Banner */}
        <div className="p-6 rounded-3xl bg-[var(--card-bg)] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-editorial">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary-accent)]/15 border border-[var(--primary-accent)]/30 text-[var(--primary-accent)] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[var(--primary-accent)]" /> Crisis Support & National Helplines
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                If you or a peer are experiencing acute distress, connect with verified national helplines: <strong>KIRAN (1800-599-0019)</strong> • <strong>Tele-MANAS (14416)</strong> • <strong>Vandrevala Foundation (+91 9999 666 555)</strong>.
              </p>
            </div>
          </div>

          <a
            href="tel:18005990019"
            className="px-6 py-3 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] font-semibold text-xs shrink-0 shadow-peach-glow transition-all"
          >
            Call KIRAN 1800-599-0019
          </a>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-lg bg-[var(--card-inner-bg)] border border-white/10 flex items-center justify-center">
                <Image src={assetPath('/Logo.png')} alt="Salus Logo" width={20} height={20} className="object-contain logo-invert" />
              </div>
              <span className="editorial-title text-base font-bold text-[var(--text-main)]">
                SALUS <span className="font-light opacity-70">INITIATIVE</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              A peer-led youth mental health initiative. Fusing authentic emotional storytelling, quiet reflections, and active student advocacy.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-mono uppercase text-[var(--primary-accent)] tracking-wider">Navigation</h5>
            <ul className="space-y-1.5">
              <li><Link href="/" className="hover:text-[var(--text-main)]">Home</Link></li>
              <li><Link href="/about" className="hover:text-[var(--text-main)]">About Mission</Link></li>
              <li><Link href="/team" className="hover:text-[var(--text-main)]">Main Team & Leadership</Link></li>
              <li><Link href="/stories" className="hover:text-[var(--text-main)]">Community Stories</Link></li>
              <li><Link href="/volunteer" className="hover:text-[var(--text-main)]">Join Us</Link></li>
              <li><Link href="/dashboard" className="hover:text-[var(--text-main)]">User Dashboard</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="text-xs font-mono uppercase text-[var(--primary-accent)] tracking-wider">Support Circles</h5>
            <ul className="space-y-1.5">
              <li><Link href="/about#faq" className="hover:text-[var(--text-main)]">Common Questions</Link></li>
              <li><Link href="/stories" className="hover:text-[var(--text-main)]">Editorial Portal</Link></li>
              <li><Link href="/volunteer" className="hover:text-[var(--text-main)]">Student Chapters</Link></li>
              <li><Link href="/volunteer" className="hover:text-[var(--text-main)]">Youth Peer Mentors</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs font-mono uppercase text-[var(--primary-accent)] tracking-wider">Monthly Digest</h5>
            <p className="text-xs text-[var(--text-muted)]">Quiet reflections and mental well-being guides delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter email address..."
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--card-inner-bg)] text-xs text-[var(--text-main)] border border-white/10 focus:border-[var(--primary-accent)] focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[var(--primary-accent)] text-[var(--button-text)] shadow-peach-glow hover:bg-[var(--accent-hover)] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Salus Initiative • Youth Peer Support & Advocacy</p>
          <p className="font-mono">
            Designed & Developed by{' '}
            <a
              href="https://rendervoid.com"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1 font-bold"
            >
              RenderVoid <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
