
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IUser } from '@/lib/models/user.model';
import { authService } from '@/lib/services/auth.service';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken();

      if (token) {
        try {
          const response = await authService.getCurrentUser();
          setUser(response.user);
        } catch (error) {
          console.error('Failed to get current user:', error);
          authService.removeToken();
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token: string, userData: IUser) => {
    authService.setToken(token);
    setUser(userData);
  };

  const logout = () => {
    authService.removeToken();
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
