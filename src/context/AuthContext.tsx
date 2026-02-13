"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../modules/auth/type";
import { fetchMe, revalidate } from "../modules/auth/services/auth.api";

type Provider = "LOCAL" | "GOOGLE" | null;

type AuthContextValue = {
  user: User | null;
  isAuthed: boolean;
  loading: boolean;
  provider: Provider;
  logoutLocal: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readProvider(): Provider {
  if (typeof window === "undefined") return null;
  const p = sessionStorage.getItem("auth_provider");
  return p === "LOCAL" || p === "GOOGLE" ? p : null; // ❌ بدون fallback
}

function hasToken() {
  if (typeof window === "undefined") return false;
  return !!sessionStorage.getItem("token");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [provider, setProvider] = useState<Provider>(() => readProvider());

  useEffect(() => {
    const sync = () => setProvider(readProvider());
    window.addEventListener("auth:changed", sync);
    return () => window.removeEventListener("auth:changed", sync);
  }, []);

  const sessionQ = useQuery({
    queryKey: ["session"],
    queryFn: revalidate,
    enabled: provider === "LOCAL" && hasToken(),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const meQ = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: provider === "GOOGLE",
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const user =
    provider === "LOCAL"
      ? (sessionQ.data as any)?.data?.user ?? null
      : provider === "GOOGLE"
      ? (meQ.data as any)?.data?.user ?? null
      : null;

  const loading =
    provider === "LOCAL" ? sessionQ.isLoading : provider === "GOOGLE" ? meQ.isLoading : false;

  // logout بسيط (بدون باك حالياً)
  const logoutLocal = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cached_user");
    sessionStorage.removeItem("auth_provider");
    queryClient.removeQueries({ queryKey: ["session"] });
    queryClient.removeQueries({ queryKey: ["me"] });
    window.dispatchEvent(new Event("auth:changed"));
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthed: !!user, loading, provider, logoutLocal }),
    [user, loading, provider]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
