import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { VenueSlice, createVenueSlice } from './slices/venueSlice';

export type StoreState = VenueSlice; // Extend this with more slices if needed

const useStore = create(
  devtools(
    persist<StoreState>(
      (...a) => ({
        ...createVenueSlice(...a),
      }),
      {
        name: 'venue-store',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useStore;
