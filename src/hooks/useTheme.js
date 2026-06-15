import { useContext } from 'react';
import { ThemeContextCore } from '../context/ThemeContextCore';

export function useTheme() {
  const context = useContext(ThemeContextCore);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
