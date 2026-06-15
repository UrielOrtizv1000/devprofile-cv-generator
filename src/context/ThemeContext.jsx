import { useState, useEffect } from 'react';
import { createContext } from 'react';

export const ThemeContextCore = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme-mode');
    if (saved !== null) {
      return saved === 'dark';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Save theme preference to localStorage and update DOM
  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme-mode', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContextCore.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContextCore.Provider>
  );
}
