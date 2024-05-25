import type { MetaType } from '@/types/response';
import type { VenueType } from '@/types/venue';
import type { FilterCriteria } from '@/types/filter';
import { StateCreator } from 'zustand';
import { filterVenues } from '@/utils/filterVenues';
import {
  fetchAllVenues,
  fetchSingleVenue,
  searchVenues,
  bookVenue,
} from '@/api/api';

export type VenueSlice = {
  venues: VenueType[];
  venue: VenueType | null;
  meta: MetaType;
  loading: boolean;
  error: string | null;
  bookSuccess: boolean;
  bookingDateRange: { from: Date | undefined; to: Date | undefined } | null;
  setBookingDateRange: (dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  fetchAllVenues: (filterCriteria: FilterCriteria) => Promise<void>;
  fetchSingleVenue: (id: string | undefined) => Promise<void>;
  searchVenues: (query: string, filterCriteria: FilterCriteria) => void;
  bookVenue: (
    token: string,
    booking: {
      dateFrom: Date | undefined;
      dateTo: Date | undefined;
      guests: number;
      venueId: string;
    },
  ) => void;
};

export const createVenueSlice: StateCreator<VenueSlice> = (set) => ({
  venues: [],
  venue: null,
  meta: {} as MetaType,
  loading: false,
  error: null,
  bookSuccess: false,
  bookingDateRange: null,

  fetchAllVenues: async (filterCriteria) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAllVenues();
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

  fetchSingleVenue: async (id) => {
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

  searchVenues: async (query, filterCriteria) => {
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

  bookVenue: async (token, booking) => {
    set({ loading: true, error: null, bookSuccess: false });
    try {
      await bookVenue(token, booking);
      set({ loading: false, bookSuccess: true });
    } catch (error) {
      set({
        error: (error as Error).message,
        loading: false,
        bookSuccess: false,
      });
    }
  },
});
