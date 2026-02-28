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
  logout: () => Promise<void> | void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readProvider(): Provider {
  if (typeof window === "undefined") return null;

  const p = sessionStorage.getItem("auth_provider");
  if (p === "LOCAL" || p === "GOOGLE") return p;

  // fallback: if there's a token but nothing else recorded, assume LOCAL
  return sessionStorage.getItem("token") ? "LOCAL" : null;
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

enabled: provider === "GOOGLE",    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!meQ.isSuccess) return;

    const token = (meQ.data as any)?.data?.token;
    if (!token) return;

    const existing = sessionStorage.getItem("token");
    if (existing === token) return; // avoid infinite loop

    sessionStorage.setItem("token", token);

    sessionStorage.setItem("auth_provider", "LOCAL");

    window.dispatchEvent(new Event("auth:changed"));
  }, [meQ.isSuccess, meQ.data]);

  const user =
    provider === "LOCAL"
      ? (sessionQ.data as any)?.data?.user ?? null
      : provider === "GOOGLE" || hasToken()
      ? (meQ.data as any)?.data?.user ?? null
      : null;

  const loading =
    provider === "LOCAL"
      ? sessionQ.isLoading
      : provider === "GOOGLE" || hasToken()
      ? meQ.isLoading
      : false;
const logout = async () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("cached_user");
  sessionStorage.removeItem("auth_provider");

  setProvider(null);

  queryClient.clear();

  try {
    document.cookie =
      "access_token=; Max-Age=0; path=/; SameSite=Lax";
    document.cookie =
      "refresh_token=; Max-Age=0; path=/; SameSite=Lax";
  } catch {}

  window.dispatchEvent(new Event("auth:changed"));
};

 const value = useMemo<AuthContextValue>(
  () => ({ user, isAuthed: !!user, loading, provider, logout }),
  [user, loading, provider]
);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}