import type { StateCreator } from 'zustand';
import { bookVenue, updateBooking, deleteBooking } from '@/api/api';

export type BookSlice = {
  bookSuccess: boolean;
  loading: boolean;
  error: string | null;
  bookingDateRange: { from: Date | undefined; to: Date | undefined } | null;
  setBookingDateRange: (dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  bookVenue: (
    token: string,
    booking: {
      dateFrom: Date | undefined;
      dateTo: Date | undefined;
      guests: number;
      venueId: string;
    },
  ) => void;
  updateBooking: (
    token: string,
    bookingId: string,
    booking: {
      dateFrom: Date | undefined;
      dateTo: Date | undefined;
      guests: number;
    },
  ) => void;
  deleteBooking: (token: string, bookingId: string) => void;
};

export const createBookSlice: StateCreator<BookSlice> = (set) => ({
  bookSuccess: false,
  loading: false,
  error: null,
  bookingDateRange: null,

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

  updateBooking: async (token, id, booking) => {
    set({ loading: true, error: null, bookSuccess: false });
    try {
      await updateBooking(token, id, booking);
      set({ loading: false, bookSuccess: true });
    } catch (error) {
      set({
        error: (error as Error).message,
        loading: false,
        bookSuccess: false,
      });
    }
  },

  deleteBooking: async (token, id) => {
    set({ loading: true, error: null, bookSuccess: false });
    try {
      await deleteBooking(token, id);
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
