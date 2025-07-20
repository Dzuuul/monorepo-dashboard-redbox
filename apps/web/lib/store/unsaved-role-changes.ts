import { create } from "zustand";

interface UnsavedRoleChangesState {
  unsaved: boolean;
  setUnsaved: (val: boolean) => void;
  reset: () => void;
}

export const useUnsavedRoleChanges = create<UnsavedRoleChangesState>((set) => ({
  unsaved: false,
  setUnsaved: (val) => set({ unsaved: val }),
  reset: () => set({ unsaved: false }),
}));
