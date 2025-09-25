// FILE: src/components/ThemeToggleButton.tsx

"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggleButton() {
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // This prevents a hydration mismatch error
  if (!isMounted) {
    // UPDATED: The placeholder now matches the button's size and shape
    return <div className="p-2 rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-gray-200" />
      ) : (
        <Moon className="w-6 h-6 text-gray-800" />
      )}
    </button>
  );
}