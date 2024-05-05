import { create } from 'zustand';

type Venue = {
  id: string;
  media: { url: string; alt: string }[];
};

type State = {
  venues: Venue[];
  fetchVenues: () => Promise<void>;
};

const useVenueStore = create<State>((set) => ({
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
}));

export { useVenueStore };
