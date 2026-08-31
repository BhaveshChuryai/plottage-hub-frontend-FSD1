import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// useContext: Creates a shared theme context accessible by any component
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Custom Hook: useLocalStorage persists theme preference across sessions
  const [theme, setTheme] = useLocalStorage('plottage-theme', 'dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook: Clean wrapper around ThemeContext
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}

export default ThemeContext;
