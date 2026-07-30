import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
  role: 'student' | 'volunteer' | 'admin';
  createdAt: string;
}

export interface UserApplicationState {
  id: string;
  track: string;
  status: string;
  submittedAt: string;
}

interface AuthStoreState {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  bookmarkedStoryIds: string[];
  submittedStoryIds: string[];
  userApplication: UserApplicationState | null;
  activityStreakCount: number;
  lastActiveDateStr: string;

  // Actions
  setUser: (user: UserProfile | null) => void;
  setAuthModalOpen: (open: boolean) => void;
  toggleBookmarkStory: (storyId: string) => void;
  addSubmittedStory: (storyId: string) => void;
  setUserApplication: (app: UserApplicationState | null) => void;
  withdrawUserApplication: () => void;
  recordTodayActivity: () => void;
  clearBookmarks: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthModalOpen: false,
      bookmarkedStoryIds: [],
      submittedStoryIds: [],
      userApplication: null,
      activityStreakCount: 1,
      lastActiveDateStr: new Date().toISOString().split('T')[0],

      setUser: (user) => {
        set({ user });
        if (user) {
          get().recordTodayActivity();
        }
      },
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      
      toggleBookmarkStory: (storyId) =>
        set((state) => ({
          bookmarkedStoryIds: state.bookmarkedStoryIds.includes(storyId)
            ? state.bookmarkedStoryIds.filter((id) => id !== storyId)
            : [...state.bookmarkedStoryIds, storyId],
        })),

      clearBookmarks: () => set({ bookmarkedStoryIds: [] }),

      addSubmittedStory: (storyId) =>
        set((state) => ({
          submittedStoryIds: [...state.submittedStoryIds, storyId],
        })),

      setUserApplication: (app) => set({ userApplication: app }),

      withdrawUserApplication: () => set({ userApplication: null }),

      recordTodayActivity: () => {
        const todayStr = new Date().toISOString().split('T')[0];
        const state = get();
        if (state.lastActiveDateStr === todayStr) {
          return; // Already recorded today
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (state.lastActiveDateStr === yesterdayStr) {
          // Consecutive active day
          set({
            activityStreakCount: state.activityStreakCount + 1,
            lastActiveDateStr: todayStr,
          });
        } else {
          // Reset streak to 1
          set({
            activityStreakCount: 1,
            lastActiveDateStr: todayStr,
          });
        }
      },

      logout: () => set({ user: null, userApplication: null, bookmarkedStoryIds: [] }),
    }),
    {
      name: 'salus-auth-store',
    }
  )
);
