import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";
type Color = "red" | "rose" | "orange" | "green" | "blue" | "yellow" | "violet";
type Font =
  | "inter"
  | "roboto"
  | "open-sans"
  | "poppins"
  | "nunito"
  | "montserrat"
  | "plus-jakarta-sans";

interface ThemeStore {
  theme: Theme;
  color: Color;
  font: Font;
  // Temporary settings for preview
  tempColor: Color | null;
  tempFont: Font | null;
  setTheme: (theme: Theme) => void;
  setColor: (color: Color) => void;
  setFont: (font: Font) => void;
  setTempColor: (color: Color) => void;
  setTempFont: (font: Font) => void;
  applySettings: () => void;
  revertSettings: () => void;
  toggleTheme: () => void;
}

// Clear old theme storage to prevent hydration issues
if (typeof window !== "undefined") {
  const oldStorage = localStorage.getItem("theme-storage");
  if (oldStorage) {
    try {
      const parsed = JSON.parse(oldStorage);
      // If old storage has 'system' theme, clear it to use new default
      if (parsed.state?.theme === "system") {
        localStorage.removeItem("theme-storage");
      }
    } catch (e) {
      // If parsing fails, clear the storage
      localStorage.removeItem("theme-storage");
    }
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      color: "violet",
      font: "plus-jakarta-sans",
      tempColor: null,
      tempFont: null,
      setTheme: (theme: Theme) => set({ theme }),
      setColor: (color: Color) => set({ color }),
      setFont: (font: Font) => set({ font }),
      setTempColor: (color: Color) => set({ tempColor: color }),
      setTempFont: (font: Font) => set({ tempFont: font }),
      applySettings: () => {
        const { tempColor, tempFont } = get();
        const updates: Partial<ThemeStore> = {};

        if (tempColor !== null) {
          updates.color = tempColor;
          updates.tempColor = null;
        }

        if (tempFont !== null) {
          updates.font = tempFont;
          updates.tempFont = null;
        }

        set(updates);

        // Simulate saving to database
        console.log("Settings applied and saved to database:", {
          color: tempColor || get().color,
          font: tempFont || get().font,
        });
      },
      revertSettings: () => {
        set({ tempColor: null, tempFont: null });
      },
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        set({ theme: newTheme });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
