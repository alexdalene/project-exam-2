import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Venue } from '@/types/venue';

interface VenueStore {
  venues: Venue[];
  fetchVenues: () => Promise<void>;
}

const useVenueStore = create(
  persist<VenueStore>(
    (set) => ({
      venues: [],
      fetchVenues: async () => {
        try {
          const response = await fetch(
            (import.meta.env.VITE_API_URL as string) + '/venues',
            {
              headers: {
                'X-Noroff-API-Key': import.meta.env.VITE_API_KEY as string,
              },
            },
          );
          const data = await response.json();
          const venues = data.data;

          set({ venues });
        } catch (error) {
          throw new Error('Failed to fetch venues');
        }
      },
    }),
    {
      name: 'venue-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useVenueStore };
