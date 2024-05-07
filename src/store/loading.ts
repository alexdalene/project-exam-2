import { create } from 'zustand';

/**
 * Represents the loading store.
 */
type LoadingStore = {
  isLoading: boolean;
  toggleLoading: () => void;
};

/**
 * Creates and initializes the loading store.
 * @returns The loading store object.
 */
const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: true,
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
}));

export { useLoadingStore };
