import React, { useContext, createContext, useState } from 'react';

export interface AuthInterface {
  token: string;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthInterface | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
    sessionStorage.setItem('token', token);
  };

  const logout = () => {
    setToken('');
    setIsAuthenticated(false);
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
