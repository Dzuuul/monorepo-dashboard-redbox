"use client";

import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "../lib/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, color, font, tempColor, tempFont } = useThemeStore();
  const prevThemeRef = useRef<string | null>(null);
  const prevColorRef = useRef<string | null>(null);
  const prevFontRef = useRef<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    const body = window.document.body;

    const updateTheme = () => {
      const currentTheme =
        theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : theme;

      // Hanya update jika theme benar-benar berubah
      if (prevThemeRef.current !== currentTheme) {
        // Hapus class lama dan tambahkan yang baru tanpa transisi
        root.classList.remove("light", "dark");
        root.classList.add(currentTheme);

        prevThemeRef.current = currentTheme;
      }
    };

    const updateColor = () => {
      // Gunakan tempColor jika ada, jika tidak gunakan color
      const currentColor = tempColor || color;

      // Hapus class warna lama
      root.classList.remove(
        "red",
        "rose",
        "orange",
        "green",
        "blue",
        "yellow",
        "violet"
      );

      // Tambahkan class warna baru
      root.classList.add(currentColor);

      prevColorRef.current = currentColor;
    };

    const updateFont = () => {
      // Gunakan tempFont jika ada, jika tidak gunakan font
      const currentFont = tempFont || font;

      // Hapus class font lama dari body
      body.classList.remove(
        "font-inter",
        "font-roboto",
        "font-open-sans",
        "font-poppins",
        "font-nunito",
        "font-montserrat",
        "font-plus-jakarta-sans"
      );

      // Tambahkan class font baru ke body
      body.classList.add(`font-${currentFont}`);

      // Terapkan font style langsung ke body untuk memastikan perubahan
      const fontFamily = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--font-${currentFont}`);
      if (fontFamily) {
        body.style.fontFamily = `${fontFamily}, sans-serif`;
      }

      prevFontRef.current = currentFont;
    };

    updateTheme();
    updateColor();
    updateFont();

    // Listener untuk perubahan preferensi sistem (hanya jika tema adalah "system")
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => updateTheme();

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, color, font, tempColor, tempFont, mounted]);

  return <>{children}</>;
}
