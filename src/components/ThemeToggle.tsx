'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border-color animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2.5 rounded-xl bg-bg-tertiary border border-border-color text-text-secondary hover:text-accent-teal hover:border-accent-teal transition-all duration-300 shadow-sm overflow-hidden group cursor-pointer"
      aria-label="Toggle Theme"
      id="theme-toggle-btn"
    >
      <div className="relative z-10 w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-500 rotate-90 scale-100 text-slate-700" />
        )}
      </div>
      <span className="absolute inset-0 bg-gradient-to-r from-accent-teal/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
