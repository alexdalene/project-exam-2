import { create } from 'zustand';

/**
 * Represents the timeline store.
 */
type TimelineStore = {
  currentAct: number;
  updateAct: (act: number) => void;
};

/**
 * Custom hook for managing timeline state.
 * @returns The timeline store object.
 */
const useTimelineStore = create<TimelineStore>((set) => ({
  currentAct: 1,
  updateAct: (act) => set({ currentAct: act }),
}));

export { useTimelineStore };
