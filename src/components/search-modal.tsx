'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Quote, HelpCircle, ArrowRight } from 'lucide-react';
import { buildSearchIndex, performFuzzySearch, SearchResultItem } from '@/lib/fuse-search';
import { MOCK_STORIES, MOCK_FAQS } from '@/lib/apps-script-client';

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent('open-search-modal'));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim()) {
      const index = buildSearchIndex(MOCK_STORIES, [], MOCK_FAQS, []);
      const searchResults = performFuzzySearch(index, query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 md:pt-24 px-4 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0C0D0E]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl bg-[var(--card-bg)] p-4 rounded-3xl border border-white/15 shadow-2xl z-10 space-y-4 text-[var(--text-main)] transition-colors duration-300"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-4 py-2 bg-[var(--card-inner-bg)] rounded-2xl border border-white/10">
              <Search className="w-4 h-4 text-[var(--primary-accent)] mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, topics, or FAQs (e.g. anxiety, grounding)..."
                className="w-full bg-transparent text-xs text-[var(--text-main)] focus:outline-none placeholder-[var(--text-muted)]"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Output List */}
            <div className="max-h-80 overflow-y-auto space-y-2 px-1">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item.id}
                    href={item.linkUrl}
                    onClick={onClose}
                    className="p-3.5 rounded-2xl bg-[var(--card-inner-bg)] hover:bg-[var(--primary-accent)]/10 border border-white/5 hover:border-[var(--primary-accent)]/30 flex items-center justify-between transition-all group block"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[var(--primary-accent)] uppercase">{item.type}</span>
                        {item.category && <span className="text-[10px] text-[var(--text-muted)]">• {item.category}</span>}
                      </div>
                      <h4 className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">{item.excerpt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--primary-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))
              ) : query ? (
                <div className="py-8 text-center text-xs text-[var(--text-muted)]">
                  No matching reflections or resources found for &quot;{query}&quot;.
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-[var(--text-muted)] font-mono">
                  Type to search Salus stories and FAQs...
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
