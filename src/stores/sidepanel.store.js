import { create } from "zustand";

export const useSidepanelStore = create((set) => ({
  visible: false,
  setVisible: () =>
    set((state) => ({
      ...state,
      visible: !state.visible,
    })),
}));


