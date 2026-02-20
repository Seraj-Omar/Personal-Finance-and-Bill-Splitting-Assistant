"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { revalidate, fetchMe } from "../services/auth.api";

type Provider = "LOCAL" | "GOOGLE" | null;

function readProvider(): Provider {
  if (typeof window === "undefined") return null;
  const p = sessionStorage.getItem("auth_provider");
  return p === "LOCAL" || p === "GOOGLE" ? p : null;
}

function readToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [ready, setReady] = useState(false);
  const [provider, setProvider] = useState<Provider>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      setProvider(readProvider());
      setToken(readToken());
      setReady(true);
    };

    sync();
    window.addEventListener("auth:changed", sync);
    return () => window.removeEventListener("auth:changed", sync);
  }, []);

  const sessionQ = useQuery({
    queryKey: ["session"],
    queryFn: revalidate,
    enabled: ready && provider === "LOCAL" && !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const meQ = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: ready && provider === "GOOGLE",
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const loading =
    !ready ||
    (provider === "LOCAL" && sessionQ.isLoading) ||
    (provider === "GOOGLE" && meQ.isLoading);

  const authed =
    provider === "LOCAL"
      ? !!(sessionQ.data as any)?.data?.user
      : provider === "GOOGLE"
      ? !!(meQ.data as any)?.data?.user
      : false;

  useEffect(() => {
    if (!ready) return;

    if (!provider) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (provider === "LOCAL" && !token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!loading && !authed) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    const status =
      (sessionQ.error as any)?.status ||
      (sessionQ.error as any)?.response?.status ||
      (meQ.error as any)?.status ||
      (meQ.error as any)?.response?.status;

    if (status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("cached_user");
      sessionStorage.removeItem("auth_provider");
      window.dispatchEvent(new Event("auth:changed"));
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, provider, token, loading, authed, sessionQ.error, meQ.error, router, pathname]);

  if (loading) return null;
  if (!authed) return null;

  return <>{children}</>;
}
