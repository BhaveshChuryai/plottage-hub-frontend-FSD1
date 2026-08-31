import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// Custom Hook: Clean wrapper around ThemeContext
// Usage: const { theme, toggleTheme } = useTheme();
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default useTheme;
