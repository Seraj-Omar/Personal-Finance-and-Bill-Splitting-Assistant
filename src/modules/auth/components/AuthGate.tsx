"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { revalidate, fetchMe } from "../services/auth.api";

type Provider = "LOCAL" | "GOOGLE" | null;

function readProvider(): Provider {
  if (typeof window === "undefined") return null;

  const p = sessionStorage.getItem("auth_provider");
  if (p === "LOCAL" || p === "GOOGLE") return p;

  // fallback: token means we were previously authenticated locally
  return sessionStorage.getItem("token") ? "LOCAL" : null;
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
    const p = readProvider();
    const t = readToken();
    console.log("[AuthGate] provider:", p, "token?", !!t);

    setProvider(p);
    setToken(t);
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
  // run when we know we should use the cookie (explicit GOOGLE) or when
  // nothing is known yet and no token exists. avoids calling on every render
  enabled: ready && (provider === "GOOGLE" || (provider === null && !token)),
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
