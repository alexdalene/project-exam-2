import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Represents the timeline store.
 */
type TimelineStore = {
  currentAct: number;
  updateAct: (act: number) => void;
  isActFinished: boolean;
  toggleActFinished: () => void;
};

/**
 * Custom hook for managing timeline state.
 * @returns The timeline store object.
 */
const useTimelineStore = create(
  devtools<TimelineStore>((set) => ({
    currentAct: 1,
    updateAct: (act) => set({ currentAct: act }),
    isActFinished: false,
    toggleActFinished: () =>
      set((state) => ({ isActFinished: !state.isActFinished })),
  })),
);

export { useTimelineStore };
