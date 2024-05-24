import { StateCreator } from 'zustand';
import { login, signup } from '@/api/api';
import type { VenueUserType } from '@/types/venue';

export type AuthSlice = {
  user: VenueUserType | null;
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
  userLoading: false,
  userError: null,

  login: async (credentials) => {
    set({ userLoading: true, userError: null });
    try {
      const data = await login(credentials);
      console.log(data);
      set({ user: data.data, userLoading: false });
    } catch (error) {
      set({ userError: (error as Error).message, userLoading: false });
    }
  },

  signup: async (credentials) => {
    set({ userLoading: true, userError: null });
    try {
      const data = await signup(credentials);
      set({ user: data.data, userLoading: false });
    } catch (error) {
      set({ userError: (error as Error).message, userLoading: false });
    }
  },

  logout: () => {
    set({ user: null });
  },
});
