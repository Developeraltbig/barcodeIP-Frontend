import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthGuard({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/pages/auth/login" replace />;
  }

  return children;
}
