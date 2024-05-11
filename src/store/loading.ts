import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Represents the loading store.
 */
type LoadingStore = {
  isLoading: boolean;
  toggleLoading: () => void;
};

/**
 * Custom hook for managing loading state.
 * @returns The loading store object.
 */
const useLoadingStore = create(
  devtools<LoadingStore>((set) => ({
    isLoading: true,
    toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  })),
);

export { useLoadingStore };
