import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;                     // ✅ ADDED
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Load initial auth state BEFORE React renders
const getInitialAuthState = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  if (token && username && email) {
    return {
      user: { username, email },
      token,
      isAuthenticated: true,
    };
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = getInitialAuthState();

  const [user, setUser] = useState<User | null>(initial.user);
  const [token, setToken] = useState<string | null>(initial.token);   // ✅ ADDED
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initial.isAuthenticated);

  // Optional: sync state on mount (useful if you add server validation later)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (token && username && email) {
      setUser({ username, email });
      setToken(token);                                                // ✅ ADDED
      setIsAuthenticated(true);
    }
  }, []);

  // LOGIN
  const login = (user: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);

    setUser(user);
    setToken(token);                                                  // ✅ ADDED
    setIsAuthenticated(true);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    setUser(null);
    setToken(null);                                                   // ✅ ADDED
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};