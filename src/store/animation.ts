import { create } from 'zustand';

/**
 * Animation store
 */
type AnimationStore = {
  isAnimating: boolean;
  isFinished: boolean;
  toggleAnimation: () => void;
  toggleFinished: () => void;
};

const useAnimationStore = create<AnimationStore>((set) => ({
  isAnimating: false,
  isFinished: false,
  toggleAnimation: () =>
    set((state) => ({ isAnimating: !state.isAnimating })),
  toggleFinished: () =>
    set((state) => ({ isFinished: !state.isFinished })),
}));

export { useAnimationStore };
