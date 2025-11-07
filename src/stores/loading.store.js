import { create } from "zustand";

export const useLoadingStore = create((set) => ({
  isReady: false,
  setIsReady: (value) => set({ isReady: value }),
}));
