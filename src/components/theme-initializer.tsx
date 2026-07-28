'use client';

import { useEffect } from 'react';
import { useAppStore, applyThemeToDocument } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';

export function ThemeInitializer() {
  const { userTheme, defaultTheme } = useAppStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Theme only applies custom user choice when logged in.
      // Otherwise, defaults to system default set in Admin Panel.
      const activeThemeToApply = user ? userTheme : defaultTheme;
      applyThemeToDocument(activeThemeToApply);
    }
  }, [user, userTheme, defaultTheme]);

  return null;
}
