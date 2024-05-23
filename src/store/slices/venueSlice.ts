import { FilterCriteria } from '@/types/filter';
import { MetaType } from '@/types/response';
import { VenueType } from '@/types/venue';
import { StateCreator } from 'zustand';

export type VenueSlice = {
  venues: VenueType[];
  venue: VenueType | null;
  filterCriteria: FilterCriteria | null;
  meta: MetaType;
  loading: boolean;
  error: string | null;
  filtered: boolean;
  bookingDateRange: { from: Date | undefined; to: Date | undefined } | null;
  setBookingDateRange: (dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  fetchAllVenues: () => Promise<void>;
  fetchSingleVenue: (id: string | undefined) => Promise<void>;
  setFilterCriteria: (criteria: FilterCriteria) => void;
  resetFilterCriteria: () => void;
  searchVenues: (query: string) => void;
};

export const createVenueSlice: StateCreator<VenueSlice> = (set, get) => ({
  venues: [],
  venue: null,
  filterCriteria: null,
  meta: {} as MetaType,
  loading: false,
  error: null,
  filtered: false,
  bookingDateRange: null,

  resetFilterCriteria: () => {
    set({ filterCriteria: null, filtered: false });
  },

  fetchAllVenues: async () => {
    const { filterCriteria } = get();
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

      if (filterCriteria) {
        const filter = data.data.filter((venue: VenueType) => {
          const matchesPrice = (): boolean => {
            if (
              filterCriteria!.price[0] === 100 &&
              filterCriteria!.price[1] === 5000
            ) {
              return true;
            } else {
              return (
                venue.price >= filterCriteria!.price[0] &&
                venue.price <= filterCriteria!.price[1]
              );
            }
          };

          const matchesAmenities = (): boolean => {
            if (filterCriteria!.amenities.length === 0) {
              return true;
            } else {
              return filterCriteria!.amenities.every(
                (amenity) => venue.meta[amenity],
              );
            }
          };

          const matchesGuests = (): boolean => {
            // @ts-expect-error - We know this is a string
            if (filterCriteria!.guests === '') {
              return true;
            } else {
              return venue.maxGuests <= filterCriteria.guests;
            }
          };

          return matchesPrice() && matchesAmenities() && matchesGuests();
        });

        set({
          venues: filter,
          meta: data.meta,
          loading: false,
          filtered: true,
        });
      } else {
        set({
          venues: data.data,
          meta: data.meta,
          loading: false,
          filtered: false,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchSingleVenue: async (id: string | undefined) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL as string}/venues/${id}?_owner=true&_bookings=true`,
        {
          headers: {
            'X-Noroff-API-Key': import.meta.env.VITE_API_KEY as string,
          },
        },
      );
      const data = await response.json();
      set({
        venue: data.data,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  searchVenues: async (query) => {
    const { filterCriteria } = get();
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

      if (filterCriteria) {
        const filter = data.data.filter((venue: VenueType) => {
          const matchesPrice = (): boolean => {
            if (
              filterCriteria.price[0] === 100 &&
              filterCriteria.price[1] === 5000
            ) {
              return true;
            } else {
              return (
                venue.price >= filterCriteria.price[0] &&
                venue.price <= filterCriteria.price[1]
              );
            }
          };

          const matchesAmenities = (): boolean => {
            if (filterCriteria.amenities.length === 0) {
              return true;
            } else {
              return filterCriteria.amenities.every(
                (amenity) => venue.meta[amenity],
              );
            }
          };

          const matchesGuests = (): boolean => {
            // @ts-expect-error - We know this is a string
            if (filterCriteria.guests === '') {
              return true;
            } else {
              return venue.maxGuests <= filterCriteria.guests;
            }
          };

          return matchesPrice() && matchesAmenities() && matchesGuests();
        });

        set({
          venues: filter,
          meta: data.meta,
          loading: false,
          filtered: true,
        });
      } else {
        set({
          venues: data.data,
          meta: data.meta,
          loading: false,
          filtered: false,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setFilterCriteria: (criteria) => {
    set({ filterCriteria: criteria });
  },

  setBookingDateRange: (dateRange) => {
    set({ bookingDateRange: dateRange });
  },
});
