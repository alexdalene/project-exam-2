import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Represents the search store.
 */
interface SearchStore {
  search: string;
  view: string;
  setSearch: (search: string) => void;
  setView: (view: string) => void;
}

/**
 * Custom hook for managing search state.
 * @returns The search store object.
 */
const useSearchStore = create(
  persist<SearchStore>(
    (set) => ({
      search: '',
      view: 'grid',
      setSearch: (search) => set({ search }),
      setView: (view) => set({ view }),
    }),
    {
      name: 'search-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useSearchStore };
