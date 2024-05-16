import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Represents the search store.
 */
type SearchStore = {
  query: string;
  updateQuery: (query: string) => void;
};

/**
 * Custom hook for managing search state.
 * @returns The search store object.
 */
const useSearchStore = create(
  devtools<SearchStore>((set) => ({
    query: '',
    updateQuery: (query) => set({ query }),
  })),
);

export { useSearchStore };
