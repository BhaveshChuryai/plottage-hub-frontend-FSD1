import { useState, useEffect } from 'react';

// Custom Hook: Reusable localStorage persistence logic
// useEffect: Syncs state changes to localStorage as a side effect
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // useEffect: Persists state to localStorage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
