import { useState, useEffect } from 'react';

// Custom Hook: Debounces a rapidly changing value
// useEffect: Sets up a timer that delays updating the debounced value
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // useEffect cleanup: Clears the previous timer on every value change
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
