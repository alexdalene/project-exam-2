import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { VenueSlice, createVenueSlice } from './slices/venueSlice';
import { AuthSlice, createAuthSlice } from './slices/authSlice';
import { ProfileSlice, createProfileSlice } from './slices/profileSlice';
import { BookSlice, createBookSlice } from './slices/bookSlice';
import { FormSlice, createFormSlice } from './slices/formSlice';

export type StoreState = VenueSlice &
  AuthSlice &
  ProfileSlice &
  BookSlice &
  FormSlice;

const useStore = create(
  devtools(
    persist<StoreState>(
      (...a) => ({
        ...createVenueSlice(...a),
        ...createAuthSlice(...a),
        ...createProfileSlice(...a),
        ...createBookSlice(...a),
        ...createFormSlice(...a),
      }),
      {
        name: 'venue-store',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useStore;
