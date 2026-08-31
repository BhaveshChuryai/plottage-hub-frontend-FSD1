import { createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// useContext: Creates a shared theme context accessible by any component
export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Custom Hook: useLocalStorage persists theme preference across sessions
  const [theme, setTheme] = useLocalStorage('plottage-theme', 'dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // useEffect: Applies data-theme attribute to <html> so CSS variables respond
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
