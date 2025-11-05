import { create } from "zustand";

export const useSidepanelStore = create((set) => ({
  visible: false,
  open: () => set({ visible: true }),
  close: () => set({ visible: false }),
  toggle: () => set((state) => ({ visible: !state.visible })),
}));
