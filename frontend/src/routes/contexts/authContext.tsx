import { createContext, useContext, useState } from "react";

interface AuthInterface {
  token: string;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") ?? "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = async (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
    sessionStorage.setItem("token", token);
  };

  const logout = () => {
    setToken("");
    setIsAuthenticated(false);
    sessionStorage.removeItem("token");
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
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
