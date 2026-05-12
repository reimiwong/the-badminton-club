import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* =========================
   INITIAL STATE
========================= */

const getInitialAuthState = () => {
  const accessToken = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  if (accessToken && username && email) {
    return {
      user: { username, email },
      accessToken,
      isAuthenticated: true,
    };
  }

  return {
    user: null,
    accessToken: null,
    isAuthenticated: false,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initial = getInitialAuthState();

  const [user, setUser] = useState<User | null>(initial.user);
  const [accessToken, setAccessToken] = useState<string | null>(
    initial.accessToken
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initial.isAuthenticated
  );

  /* =========================
     LOGIN
  ========================= */

  const login = (user: User, token: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);

    setUser(user);
    setAccessToken(token);
    setIsAuthenticated(true);
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    setUser(null);
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        accessToken,
        login,
        logout,
        setAccessToken,
      }}
    >
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