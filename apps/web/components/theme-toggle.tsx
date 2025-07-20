"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { useThemeStore } from "../lib/theme-store";

export function ThemeToggle() {
  const { toggleTheme } = useThemeStore();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-8 w-8 p-0"
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="h-4 w-4 hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
