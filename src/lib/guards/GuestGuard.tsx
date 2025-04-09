
import { useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/context/AuthContext';

interface GuestGuardProps {
  children: ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Redirect to dashboard or the return url
      const returnUrl = state?.from || '/dashboard';
      navigate(returnUrl);
    }
  }, [isAuthenticated, isLoading, navigate, state]);

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, render children
  return !isAuthenticated ? <>{children}</> : null;
};
