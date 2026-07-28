'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  PenSquare,
  Menu,
  X,
  BookOpen,
  HeartHandshake,
  Home,
  Info,
  User as UserIcon,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { SearchModal } from '@/components/search-modal';
import { toast } from 'sonner';

export function DynamicIsland() {
  const pathname = usePathname();
  const router = useRouter();
  const { setStoryModalOpen } = useAppStore();
  const { user } = useAuthStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-search-modal', handleOpenSearch);
    return () => window.removeEventListener('open-search-modal', handleOpenSearch);
  }, []);

  const handleShareStoryClick = () => {
    if (!user) {
      toast.error('Please sign in to share your peer story!');
      router.push('/dashboard');
      return;
    }
    setStoryModalOpen(true);
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { href: '/stories', label: 'Stories', icon: BookOpen },
    { href: '/volunteer', label: 'Volunteer', icon: HeartHandshake },
  ];

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`pointer-events-auto transition-all duration-300 flex items-center justify-between gap-4 select-none ${
            isScrolled
              ? 'mt-4 px-4 py-2.5 rounded-full border border-white/15 bg-[var(--card-bg)]/90 backdrop-blur-xl shadow-2xl shadow-[var(--primary-accent)]/10 w-[90%] md:w-[85%] max-w-5xl'
              : 'mt-0 px-6 py-3.5 rounded-none md:rounded-b-3xl border-b border-white/10 border-t-0 bg-[var(--card-bg)]/80 backdrop-blur-lg w-full max-w-7xl'
          }`}
        >
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 md:w-10 md:h-10 shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/Logo.png"
                alt="Salus Initiative Logo"
                fill
                sizes="(max-width: 768px) 36px, 40px"
                className="object-contain logo-invert"
                priority
              />
            </div>
            <span className="editorial-title text-base font-bold tracking-tight text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors hidden sm:inline">
              SALUS <span className="font-light opacity-70">INITIATIVE</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--card-inner-bg)] px-3 py-1.5 rounded-full border border-white/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'text-[var(--active-pill-text)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-[var(--primary-accent)] rounded-full shadow-peach-glow -z-10"
                    />
                  )}
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Tools & Member Profile Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/5 transition-colors"
              title="Search stories (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={handleShareStoryClick}
              className="px-4 py-2 rounded-full bg-[var(--primary-accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] text-xs font-semibold transition-all shadow-peach-glow hidden sm:flex items-center gap-1.5"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Share Story</span>
            </button>

            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-full bg-[var(--card-inner-bg)] hover:bg-white/10 text-[var(--text-main)] text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
            >
              <UserIcon className="w-3.5 h-3.5 text-[var(--primary-accent)]" />
              <span className="hidden sm:inline">
                {user ? (user.displayName ? user.displayName.split(' ')[0] : 'Portal') : 'Sign In'}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-40 p-4 rounded-3xl bg-[var(--card-bg)] border border-white/15 shadow-2xl space-y-3 md:hidden select-none"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-3 rounded-2xl flex items-center gap-3 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[var(--primary-accent)] text-[var(--button-text)] shadow-peach-glow'
                      : 'bg-[var(--card-inner-bg)] text-[var(--text-main)] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
