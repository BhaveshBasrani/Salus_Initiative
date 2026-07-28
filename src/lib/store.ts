import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WhisperQuote, AdminRole } from './types';

export type DynamicIslandState = 'compact' | 'expanded-nav' | 'whisper' | 'search' | 'story-quick';
export type UserThemePreference = 'Black & Beige' | 'Warm Peach' | 'Dark Obsidian' | 'RenderVoid Crimson' | 'Midnight Slate';

export interface DynamicFellowshipRole {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

interface AppState {
  // Theme State
  theme: 'light' | 'dark';
  userTheme: UserThemePreference;
  defaultTheme: UserThemePreference; // System Default set in Admin Panel for logged-out visitors
  setUserTheme: (userTheme: UserThemePreference) => void;
  setDefaultTheme: (defaultTheme: UserThemePreference) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Dynamic Island Control
  islandState: DynamicIslandState;
  setIslandState: (state: DynamicIslandState) => void;

  // Modals & Wizards
  isStoryModalOpen: boolean;
  setStoryModalOpen: (open: boolean) => void;
  isVolunteerWizardOpen: boolean;
  setVolunteerWizardOpen: (open: boolean) => void;
  isAdminAuthOpen: boolean;
  setAdminAuthOpen: (open: boolean) => void;

  // Dynamic Fellowship Roles (Admin Managed)
  dynamicRoles: DynamicFellowshipRole[];
  addDynamicRole: (role: DynamicFellowshipRole) => void;
  updateDynamicRole: (roleId: string, updatedRole: Partial<DynamicFellowshipRole>) => void;
  removeDynamicRole: (roleId: string) => void;

  // Search & Filter State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Today's Whisper Active Quote State
  activeWhisper: WhisperQuote | null;
  setActiveWhisper: (whisper: WhisperQuote) => void;

  // Admin Auth State
  isAdminAuthenticated: boolean;
  adminRole: AdminRole | null;
  adminToken: string | null;
  setAdminSession: (authenticated: boolean, role?: AdminRole | null, token?: string | null) => void;
  logoutAdmin: () => void;
}

export const applyThemeToDocument = (themeName: UserThemePreference) => {
  if (typeof document === 'undefined') return;
  const formattedTheme = themeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  document.documentElement.setAttribute('data-user-theme', formattedTheme);
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      userTheme: 'Black & Beige',
      defaultTheme: 'Black & Beige',
      
      setUserTheme: (userTheme) => set({ userTheme }),
      setDefaultTheme: (defaultTheme) => set({ defaultTheme }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      islandState: 'compact',
      setIslandState: (islandState) => set({ islandState }),

      isStoryModalOpen: false,
      setStoryModalOpen: (isStoryModalOpen) => set({ isStoryModalOpen }),
      isVolunteerWizardOpen: false,
      setVolunteerWizardOpen: (isVolunteerWizardOpen) => set({ isVolunteerWizardOpen }),
      isAdminAuthOpen: false,
      setAdminAuthOpen: (isAdminAuthOpen) => set({ isAdminAuthOpen }),

      dynamicRoles: [
        {
          id: 'design',
          name: 'Design',
          description: 'Creating editorial zines, Instagram post layouts, and digital branding assets.',
        },
        {
          id: 'marketing',
          name: 'Marketing',
          description: 'Spreading youth mental health awareness across school campuses and student chapters.',
        },
        {
          id: 'editorial',
          name: 'Editorial',
          description: 'Editing peer narrative submissions and writing reflective journal stories.',
        },
      ],

      addDynamicRole: (role) =>
        set((state) => ({ dynamicRoles: [...state.dynamicRoles, role] })),

      updateDynamicRole: (roleId, updatedRole) =>
        set((state) => ({
          dynamicRoles: state.dynamicRoles.map((r) =>
            r.id === roleId ? { ...r, ...updatedRole } : r
          ),
        })),

      removeDynamicRole: (roleId) =>
        set((state) => ({
          dynamicRoles: state.dynamicRoles.filter((r) => r.id !== roleId),
        })),

      searchQuery: '',
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      selectedCategory: 'All',
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

      activeWhisper: null,
      setActiveWhisper: (activeWhisper) => set({ activeWhisper }),

      isAdminAuthenticated: false,
      adminRole: null,
      adminToken: null,

      setAdminSession: (authenticated, role = 'Super Admin', token = null) =>
        set({
          isAdminAuthenticated: authenticated,
          adminRole: authenticated ? role : null,
          adminToken: authenticated ? token : null,
        }),

      logoutAdmin: () =>
        set({
          isAdminAuthenticated: false,
          adminRole: null,
          adminToken: null,
        }),
    }),
    {
      name: 'salus-app-store',
    }
  )
);
