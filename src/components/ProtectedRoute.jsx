import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Protected Route: Redirects unauthenticated users to login
// useContext: Consumes AuthContext via useAuth hook to check authentication state
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
