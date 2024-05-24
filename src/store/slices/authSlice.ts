import { StateCreator } from 'zustand';
import { login, signup } from '@/api/api';
import type { VenueUserType } from '@/types/venue';

export type AuthSlice = {
  user: VenueUserType | null;
  userSuccess: boolean;
  userLoading: boolean;
  userError: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (credentials: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  userSuccess: false,
  userLoading: false,
  userError: null,

  login: async (credentials) => {
    set({ userLoading: true, userError: null, userSuccess: false });
    try {
      const data = await login(credentials);
      set({ user: data.data, userLoading: false, userSuccess: true });
    } catch (error) {
      set({
        userError: (error as Error).message,
        userLoading: false,
        userSuccess: false,
      });
    }
  },

  signup: async (credentials) => {
    set({ userLoading: true, userError: null, userSuccess: false });
    try {
      await signup(credentials);
      set({ userLoading: false, userSuccess: true });
    } catch (error) {
      set({
        userError: (error as Error).message,
        userLoading: false,
        userSuccess: false,
      });
    }
  },

  logout: () => {
    set({ user: null });
  },
});
