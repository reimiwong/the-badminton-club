import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ✅ Compute synchronously BEFORE React renders
const getInitialAuthState = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  if (token && username && email) {
    return {
      user: { username, email },
      isAuthenticated: true,
    };
  }

  return {
    user: null,
    isAuthenticated: false,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initial = getInitialAuthState();

  // ✅ FIX: initialise BOTH from storage
  const [user, setUser] = useState<User | null>(initial.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initial.isAuthenticated
  );

  // ✅ Optional: keep this if you plan server validation later
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (token && username && email) {
      setUser({ username, email });
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);

    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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