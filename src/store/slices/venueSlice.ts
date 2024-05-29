import type { MetaType } from '@/types/response';
import type { VenueType } from '@/types/venue';
import type { FilterCriteria } from '@/types/filter';
import type { FormVenue } from '@/types/form';
import { StateCreator } from 'zustand';
import { filterVenues } from '@/utils/filterVenues';
import {
  fetchAllVenues,
  fetchSingleVenue,
  searchVenues,
  createVenue,
  updateVenue,
  deleteVenue,
} from '@/api/api';

export type VenueSlice = {
  venues: VenueType[];
  venue: VenueType | null;
  resetVenue: () => void;
  venueId: string | null;
  resetVenueId: () => void;
  meta: MetaType;
  loading: boolean;
  error: string | null;
  fetchAllVenues: (
    page: number,
    filterCriteria: FilterCriteria,
  ) => Promise<void>;
  fetchSingleVenue: (id: string | undefined) => Promise<void>;
  searchVenues: (query: string, filterCriteria: FilterCriteria) => void;
  createVenue: (token: string | null, venue: FormVenue) => void;
  updateVenue: (token: string | null, id: string, venue: FormVenue) => void;
  deleteVenue: (token: string | null, id: string) => void;
};

export const createVenueSlice: StateCreator<VenueSlice> = (set) => ({
  venues: [],
  venue: null,
  meta: {} as MetaType,
  loading: false,
  error: null,
  venueId: null,

  resetVenue: () => set({ venue: null }),

  resetVenueId: () => set({ venueId: null }),

  fetchAllVenues: async (page, filterCriteria) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAllVenues(page);
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

  createVenue: async (token, venue) => {
    set({ loading: true, error: null, venueId: null });
    try {
      const data = await createVenue(token, venue);
      set({ loading: false, venueId: data.data.id });
    } catch (error) {
      set({ error: (error as Error).message, loading: false, venueId: null });
    }
  },

  updateVenue: async (token, id, venue) => {
    set({ loading: true, error: null });
    try {
      await updateVenue(token, id, venue);
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteVenue: async (token, id) => {
    set({ loading: true, error: null });
    try {
      await deleteVenue(token, id);
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
});
