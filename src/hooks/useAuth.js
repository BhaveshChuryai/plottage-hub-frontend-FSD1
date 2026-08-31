import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Custom Hook: Clean wrapper around AuthContext for consuming components
// Usage: const { user, isLoggedIn, login, logout } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
