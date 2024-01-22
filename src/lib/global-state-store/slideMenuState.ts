import { create } from "zustand";

interface SlideMenuState {
  isOpen: boolean;
  openSlider: () => void;
  closeSlider: () => void;
}

export const useSlideMenuState = create<SlideMenuState>((set, get) => ({
  isOpen: false,
  openSlider: () => {
    set({ isOpen: true });
  },
  closeSlider: () => {
    set({ isOpen: false });
  },
}));
