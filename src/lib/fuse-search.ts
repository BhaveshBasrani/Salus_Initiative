import Fuse from 'fuse.js';
import { Story, Resource, FAQItem, EventItem } from './types';

export interface SearchResultItem {
  id: string;
  type: 'Resource' | 'Story' | 'FAQ' | 'Event';
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  linkUrl: string;
}

export function buildSearchIndex(
  stories: Story[],
  resources: Resource[],
  faqs: FAQItem[],
  events: EventItem[]
): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  resources.forEach((r) => {
    items.push({
      id: r.id,
      type: 'Resource',
      title: r.title,
      subtitle: `${r.category} • ${r.readTime}`,
      excerpt: r.description,
      category: r.category,
      linkUrl: `/resources#${r.id}`,
    });
  });

  stories.forEach((s) => {
    if (s.status === 'Approved') {
      items.push({
        id: s.id,
        type: 'Story',
        title: s.title,
        subtitle: `Story by ${s.isAnonymous ? 'Anonymous' : s.authorName} • ${s.readTime}`,
        excerpt: s.excerpt,
        category: s.category,
        linkUrl: `/stories#${s.id}`,
      });
    }
  });

  faqs.forEach((f) => {
    items.push({
      id: f.id,
      type: 'FAQ',
      title: f.question,
      subtitle: `FAQ • ${f.audienceCategory}`,
      excerpt: f.answer,
      category: f.audienceCategory,
      linkUrl: `/about#faq`,
    });
  });

  events.forEach((e) => {
    items.push({
      id: e.id,
      type: 'Event',
      title: e.title,
      subtitle: `${e.eventDate} • ${e.location}`,
      excerpt: e.description,
      category: e.category,
      linkUrl: `/resources#events`,
    });
  });

  return items;
}

export function performFuzzySearch(indexItems: SearchResultItem[], query: string): SearchResultItem[] {
  if (!query.trim()) return [];

  const fuse = new Fuse(indexItems, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'excerpt', weight: 0.3 },
      { name: 'category', weight: 0.2 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
  });

  return fuse.search(query).map((res) => res.item);
}
