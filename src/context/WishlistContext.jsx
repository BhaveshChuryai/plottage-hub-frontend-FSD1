/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// useContext: Creates a shared wishlist context — same state across Home, Explore, PropertyDetails, Dashboard
export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  // Custom Hook: useLocalStorage persists wishlist across browser sessions
  const [wishlist, setWishlist] = useLocalStorage('plottage-wishlist', []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, [setWishlist]);

  const isWishlisted = useCallback(
    (id) => wishlist.includes(id),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContext;
