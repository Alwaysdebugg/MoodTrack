import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User, AuthContextType } from '../types';
import { authAPI, AUTH_ERROR_EVENT } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Handle token from OAuth callback
  const handleCallbackToken = async (token: string) => {
    try {
      setIsLoading(true);

      // Send token to backend for verification
      const { user, accessToken } = await authAPI.verifyCallbackToken(token);

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      setIsLoading(false);

      return { success: true, user };
    } catch (error) {
      console.error('Authentication failed:', error);
      setIsLoading(false);
      return { success: false, error };
    }
  };

  const login = (token: string) => {
    // Parse token to get user info
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.error('Parsed payload:', payload);
      const user: User = {
        id: payload.sub || payload.id,
        email: payload.email,
        name: payload.name || payload.username,
        picture: payload.picture,
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Failed to parse token:', error);
    }
  };

  const logout = async () => {
    try {
      // Notify backend logout
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      // Clear local state
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/home'); // Redirect to home page
    }
  };

  const refreshUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        return parsedUser;
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    return null;
  };

  useEffect(() => {
    refreshUserFromStorage();
    setIsLoading(false);
  }, []);

  // Listen for 401 errors
  useEffect(() => {
    const handleAuthError = () => {
      // Clear local state
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('google_token');
      localStorage.removeItem('google_user_info');
      localStorage.removeItem('user_info');

      // Redirect to home page
      navigate('/home', { replace: true });
    };

    window.addEventListener(AUTH_ERROR_EVENT, handleAuthError);

    return () => {
      window.removeEventListener(AUTH_ERROR_EVENT, handleAuthError);
    };
  }, [navigate]);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    handleCallbackToken,
    refreshUserFromStorage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
