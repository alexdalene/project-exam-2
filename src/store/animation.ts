import { create } from 'zustand';

/**
 * Represents the animation store.
 */
type AnimationStore = {
  isAnimating: boolean;
  isFinished: boolean;
  toggleAnimation: () => void;
  toggleFinished: () => void;
};

/**
 * Custom hook for managing animation state.
 * @returns The animation store object.
 */
const useAnimationStore = create<AnimationStore>((set) => ({
  isAnimating: false,
  isFinished: false,
  toggleAnimation: () => set((state) => ({ isAnimating: !state.isAnimating })),
  toggleFinished: () => {
    set((state) => ({ isFinished: !state.isFinished }));
  },
}));

export { useAnimationStore };
