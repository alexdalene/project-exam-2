import { StateCreator } from 'zustand';
import { fetchProfile } from '@/api/api';
import { VenueUserType } from '@/types/venue';

export type ProfileSlice = {
  profile: VenueUserType | null;
  fetchProfile: (token: string | null, name: string | undefined) => void;
};

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  profile: null,

  fetchProfile: async (token, name) => {
    try {
      const data = await fetchProfile(token, name);
      console.log(data);
      set({ profile: data.data });
    } catch (error) {
      console.error(error);
    }
  },
});
