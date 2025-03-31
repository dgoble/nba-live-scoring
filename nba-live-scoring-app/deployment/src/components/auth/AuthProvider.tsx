'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  name: string | null;
  subscription: {
    active: boolean;
    plan: string | null;
    expiresAt: string | null;
  };
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real implementation, this would check Firebase Auth session
        // For now, we'll simulate checking local storage
        const storedUser = localStorage.getItem('nba_live_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setError('Failed to authenticate. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call Firebase Auth
      // For now, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user
      const mockUser: User = {
        id: 'user123',
        email,
        name: 'Demo User',
        subscription: {
          active: false,
          plan: null,
          expiresAt: null,
        },
      };
      
      // Store in local storage for persistence
      localStorage.setItem('nba_live_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your credentials and try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call Firebase Auth
      // For now, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user
      const mockUser: User = {
        id: 'user123',
        email,
        name,
        subscription: {
          active: false,
          plan: null,
          expiresAt: null,
        },
      };
      
      // Store in local storage for persistence
      localStorage.setItem('nba_live_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, this would call Firebase Auth
      // For now, we'll just clear local storage
      localStorage.removeItem('nba_live_user');
      
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call Firebase Auth
      // For now, we'll simulate a successful password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Failed to send password reset email. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create the context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
