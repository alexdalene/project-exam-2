import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { VenueType } from '@/types/venue';
import { MetaType } from '@/types/response';

/**
 * Represents the venue store.
 */
interface VenueStore {
  meta: MetaType;
  venues: VenueType[];
  error: string | null;
  fetchVenues: (page?: string) => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchPreviousPage: () => Promise<void>;
}

const useVenueStore = create(
  persist<VenueStore>(
    (set, get) => ({
      meta: {} as MetaType,
      venues: [],
      error: null,
      fetchVenues: async (page = '') => {
        try {
          const url = new URL(
            (import.meta.env.VITE_API_URL as string) + '/venues',
          );
          if (page) {
            url.searchParams.append('page', page);
          }

          const response = await fetch(url.toString(), {
            headers: {
              'X-Noroff-API-Key': import.meta.env.VITE_API_KEY as string,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch venues');
          }

          const data = await response.json();
          const venues = data.data;
          const meta = data.meta;

          set({ venues, meta, error: null });
        } catch (error) {
          set({ error: error.message });
        }
      },
      fetchNextPage: async () => {
        const { nextPage } = get().meta;

        if (nextPage) {
          await get().fetchVenues(nextPage.toString());
        }
      },
      fetchPreviousPage: async () => {
        const { previousPage } = get().meta;

        if (previousPage) {
          await get().fetchVenues(previousPage.toString());
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
