import { create } from "zustand";

export type AnnouncementType = "info" | "warning";

interface AnnouncementState {
  show: boolean;
  type: AnnouncementType;
  message: string;
  showActions?: boolean;
  onApply?: () => void;
  onRevert?: () => void;
  setAnnouncement: (payload: Partial<AnnouncementState>) => void;
  reset: () => void;
}

export const useAnnouncement = create<AnnouncementState>((set) => ({
  show: false,
  type: "info",
  message: "",
  showActions: false,
  onApply: undefined,
  onRevert: undefined,
  setAnnouncement: (payload) => set((state) => ({ ...state, ...payload })),
  reset: () =>
    set({
      show: false,
      type: "info",
      message: "",
      showActions: false,
      onApply: undefined,
      onRevert: undefined,
    }),
}));
