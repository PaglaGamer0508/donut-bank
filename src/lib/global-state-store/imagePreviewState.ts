import { create } from "zustand";

interface PreviewImageState {
  imageUrl: string | null;
  setImagePreview: (imageUrl: string) => void;
  removePreviewImage: () => void;
}

export const useImagePreviewState = create<PreviewImageState>((set, get) => ({
  imageUrl: null,
  setImagePreview: (imageUrl: string) => set({ imageUrl }),
  removePreviewImage: () => set({ imageUrl: null }),
}));
