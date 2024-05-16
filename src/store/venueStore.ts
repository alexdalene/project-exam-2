import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { VenueSlice, createVenueSlice } from './slices/venueSlice';

export type StoreState = VenueSlice; // Extend this with more slices if needed

const useStore = create(
  devtools<StoreState>((...a) => ({
    ...createVenueSlice(...a),
  })),
);

export default useStore;
