import { MetaType } from '@/types/response';
import { VenueType } from '@/types/venue';
import { StateCreator } from 'zustand';

export type VenueSlice = {
  venues: VenueType[];
  meta: MetaType;
  loading: boolean;
  error: string | null;
  fetchVenues: () => Promise<void>;
};

export const createVenueSlice: StateCreator<VenueSlice> = (set) => ({
  venues: [],
  meta: {} as MetaType,
  loading: false,
  error: null,

  fetchVenues: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL as string}/venues?_bookings=true`,
        {
          headers: {
            'X-Noroff-API-Key': import.meta.env.VITE_API_KEY as string,
          },
        },
      );

      const data = await response.json();
      set({ venues: data.data, meta: data.meta, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
});
