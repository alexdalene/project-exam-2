import { create } from 'zustand';

type LoadingStore = {
  isLoading: boolean;
  toggleLoading: () => void;
};

const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: true,
  toggleLoading: () =>
    set((state) => ({ isLoading: !state.isLoading })),
}));

export { useLoadingStore };
