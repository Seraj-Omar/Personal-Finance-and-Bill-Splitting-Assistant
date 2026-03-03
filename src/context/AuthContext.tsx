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
  return p === "LOCAL" || p === "GOOGLE" ? p : null;
}

function hasToken() {
  if (typeof window === "undefined") return false;
  return !!sessionStorage.getItem("token");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const [provider, setProvider] = useState<Provider>(() => {
    const p = readProvider();
    if (p) return p;
    if (hasToken()) return "LOCAL";
    return null;
  });

  const meQ = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: provider === "GOOGLE" || (provider === null && !hasToken()),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const sessionQ = useQuery({
    queryKey: ["session"],
    queryFn: revalidate,
    enabled: provider === "LOCAL" && hasToken(),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

useEffect(() => {
  const token = (meQ.data as any)?.data?.token;
  const user = (meQ.data as any)?.data?.user;

  if ((provider === "GOOGLE" || provider === null) && user && token) {
    sessionStorage.setItem("token", token);              //
    sessionStorage.setItem("auth_provider", "GOOGLE");   //  
    setProvider("GOOGLE");
    window.dispatchEvent(new Event("auth:changed"));
  }
}, [meQ.data, provider]);

  useEffect(() => {
    if (provider === null && hasToken() && (sessionQ.data as any)?.data?.user) {
      sessionStorage.setItem("auth_provider", "LOCAL");
      setProvider("LOCAL");
      window.dispatchEvent(new Event("auth:changed"));
    }
  }, [provider, sessionQ.data]);

  const user =
    provider === "LOCAL"
      ? ((sessionQ.data as any)?.data?.user ?? null)
      : provider === "GOOGLE"
      ? ((meQ.data as any)?.data?.user ?? null)
      : ((sessionQ.data as any)?.data?.user ?? (meQ.data as any)?.data?.user ?? null);

  const loading =
    provider === "LOCAL"
      ? sessionQ.isLoading
      : provider === "GOOGLE"
      ? meQ.isLoading
      : meQ.isLoading || sessionQ.isLoading;

  const logoutLocal = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cached_user");
    sessionStorage.removeItem("auth_provider");
    queryClient.removeQueries({ queryKey: ["session"] });
    queryClient.removeQueries({ queryKey: ["me"] });
    setProvider(null);
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