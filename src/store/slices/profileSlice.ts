import { StateCreator } from 'zustand';
import { fetchProfile, updateProfile } from '@/api/api';
import { VenueUserType } from '@/types/venue';

export type ProfileSlice = {
  profile: VenueUserType | null;
  profileLoading: boolean;
  profileError: string | null;
  fetchProfile: (token: string | null, name: string | undefined) => void;
  updateProfile: (
    token: string | null,
    name: string | undefined,
    profile: {
      bio: string | undefined;
      avatar: { url: string; alt: string };
      banner: { url: string; alt: string };
      venueManager: boolean | undefined;
    },
  ) => void;
};

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  profile: null,
  profileLoading: false,
  profileError: null,

  fetchProfile: async (token, name) => {
    set({ profileLoading: true, profileError: null });
    try {
      const data = await fetchProfile(token, name);
      set({ profile: data.data, profileLoading: false });
    } catch (error) {
      set({ profileError: (error as Error).message, profileLoading: false });
    }
  },

  updateProfile: async (token, name, profile) => {
    set({ profileLoading: true, profileError: null });
    try {
      const data = await updateProfile(token, name, profile);
      set({ profile: data.data, profileLoading: false });
    } catch (error) {
      set({ profileError: (error as Error).message, profileLoading: false });
    }
  },
});
