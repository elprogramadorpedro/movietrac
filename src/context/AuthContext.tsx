import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../core/services/AuthService';
import { TokenService } from '../core/services/TokenService';
import { User } from '../core/entities';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await TokenService.getToken();
      if (token && TokenService.isTokenValid(token)) {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } else {
        await TokenService.removeToken();
        await AsyncStorage.removeItem('userData');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await AuthService.login(email, password);
      if (result.success && result.user && result.token) {
        await TokenService.saveToken(result.token);
        await AsyncStorage.setItem('userData', JSON.stringify(result.user));
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: result.error || 'Error de autenticación' };
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const result = await AuthService.register(email, password, name);
      if (result.success && result.user && result.token) {
        await TokenService.saveToken(result.token);
        await AsyncStorage.setItem('userData', JSON.stringify(result.user));
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: result.error || 'Error al crear la cuenta' };
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const result = await AuthService.forgotPassword(email);
      return result;
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = async () => {
    try {
      await TokenService.removeToken();
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};