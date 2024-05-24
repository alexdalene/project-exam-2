import type { MetaType } from '@/types/response';
import type { VenueType } from '@/types/venue';
import type { FilterCriteria } from '@/types/filter';
import { StateCreator } from 'zustand';
import { filterVenues } from '@/utils/filterVenues';
import { fetchAllVenues, fetchSingleVenue, searchVenues } from '@/api/api';

export type VenueSlice = {
  venues: VenueType[];
  venue: VenueType | null;
  meta: MetaType;
  loading: boolean;
  error: string | null;
  bookingDateRange: { from: Date | undefined; to: Date | undefined } | null;
  setBookingDateRange: (dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  fetchAllVenues: (filterCriteria: FilterCriteria) => Promise<void>;
  fetchSingleVenue: (id: string | undefined) => Promise<void>;
  searchVenues: (query: string, filterCriteria: FilterCriteria) => void;
};

export const createVenueSlice: StateCreator<VenueSlice> = (set) => ({
  venues: [],
  venue: null,
  meta: {} as MetaType,
  loading: false,
  error: null,
  bookingDateRange: null,

  fetchAllVenues: async (filterCriteria: FilterCriteria) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAllVenues();
      console.log(filterCriteria);
      const venues = filterCriteria
        ? filterVenues(data.data, filterCriteria)
        : data.data;
      set({
        venues,
        meta: data.meta,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchSingleVenue: async (id: string | undefined) => {
    if (!id) {
      throw new Error('ID is required to fetch a single venue');
    }
    set({ loading: true, error: null });
    try {
      const data = await fetchSingleVenue(id);
      set({ venue: data.data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  searchVenues: async (query: string, filterCriteria: FilterCriteria) => {
    set({ loading: true, error: null });
    try {
      const data = await searchVenues(query);
      const venues = filterCriteria
        ? filterVenues(data.data, filterCriteria)
        : data.data;
      set({
        venues,
        meta: data.meta,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setBookingDateRange: (dateRange) => {
    set({ bookingDateRange: dateRange });
  },
});
