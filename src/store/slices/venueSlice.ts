import { FilterCriteria } from '@/types/filter';
import { MetaType } from '@/types/response';
import { VenueType } from '@/types/venue';
import { StateCreator } from 'zustand';

export type VenueSlice = {
  venues: VenueType[];
  filteredVenues: VenueType[];
  filterCriteria: FilterCriteria | null;
  meta: MetaType;
  loading: boolean;
  error: string | null;
  filtered: boolean;
  fetchVenues: () => Promise<void>;
  setFilterCriteria: (criteria: FilterCriteria) => void;
  applyFilters: () => void;
  searchVenues: (query: string) => void;
};

export const createVenueSlice: StateCreator<VenueSlice> = (set, get) => ({
  venues: [],
  filteredVenues: [],
  filterCriteria: null,
  meta: {} as MetaType,
  loading: false,
  error: null,
  filtered: false,

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
      set({
        venues: data.data,
        meta: data.meta,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  searchVenues: async (query) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL as string}/venues/search?q=${query}`,
        {
          headers: {
            'X-Noroff-API-Key': import.meta.env.VITE_API_KEY as string,
          },
        },
      );

      const data = await response.json();

      set({
        venues: data.data,
        meta: data.meta,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setFilterCriteria: (criteria) => {
    set({ filterCriteria: criteria });
  },

  applyFilters: () => {
    const { venues, filterCriteria } = get();

    if (!filterCriteria) {
      set({ filtered: false });
      set({ filteredVenues: [] });
      return;
    }

    const filter = venues.filter((venue) => {
      const matchesPrice =
        venue.price >= filterCriteria.price[0] &&
        venue.price <= filterCriteria.price[1];
      const matchesAmenities = filterCriteria.amenities.every(
        (amenity) => venue.meta[amenity],
      );
      const matchesGuests = venue.maxGuests <= filterCriteria.guests;

      console.log(matchesGuests);

      return matchesPrice && matchesAmenities && matchesGuests;
    });

    set({ filteredVenues: filter, filtered: true });
  },
});
