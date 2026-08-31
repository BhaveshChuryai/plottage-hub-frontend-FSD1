import { createContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// useContext: Creates a shared authentication context — single source of truth
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Custom Hook: useLocalStorage persists auth state across browser sessions
  const [user, setUser] = useLocalStorage('plottage-auth-user', null);

  const isLoggedIn = !!user;

  const login = useCallback((userData) => {
    setUser(userData);
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
