import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';

// Custom Hook: Clean wrapper around WishlistContext for consuming components
// Usage: const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

export default useWishlist;
