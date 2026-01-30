"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPayload, User } from "../modules/auth/type";
import { loginUser } from "../modules/auth/services/auth.api";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthed: boolean;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  refreshFromStorage: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getStoredAuth() {
  if (typeof window === "undefined") return { token: null as string | null, user: null as User | null };

  const token = sessionStorage.getItem("token") || null;
  const userRaw = sessionStorage.getItem("user");
  const user = userRaw ? (JSON.parse(userRaw) as User) : null;

  return { token, user };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(() => getStoredAuth().token);
  const [user, setUser] = useState<User | null>(() => getStoredAuth().user);
  const [loading, setLoading] = useState(false);

  const refreshFromStorage = () => {
    const stored = getStoredAuth();
    setToken(stored.token);
    setUser(stored.user);
  };

  const login = async (payload: LoginPayload) => {
    await loginUser(payload);

    refreshFromStorage();
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/login"); 
  };

  const value: AuthContextValue = {
    user,
    token,
    isAuthed: !!token,
    loading,
    login,
    logout,
    refreshFromStorage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
