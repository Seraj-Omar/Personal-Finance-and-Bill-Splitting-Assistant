"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { revalidate, fetchMe } from "../services/auth.api";
import { Container, Skeleton, Stack, Box } from "@mui/material";

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

  // GOOGLE: me (Cookie)
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

    const status =
      (sessionQ.error as any)?.status || (meQ.error as any)?.status;

    if (status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("cached_user");
      sessionStorage.removeItem("auth_provider");
      window.dispatchEvent(new Event("auth:changed"));
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, provider, token, sessionQ.error, meQ.error, router, pathname]);

  if (loading) {
    return (
      <Container
        maxWidth={false}
        disableGutters
        sx={{ py: 5, px: { xs: "10px", sm: "12px", md: "16px", lg: "100px" } }}
      >
        <Stack spacing={3}>
          <Skeleton variant="text" width={220} height={36} />
          <Skeleton variant="text" width={320} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 5,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              p: 4,
              borderRadius: 4,
            }}
          >
            <Stack spacing={2} sx={{ flex: 5 }}>
              <Skeleton variant="text" width={160} height={28} />
              <Skeleton variant="rounded" height={280} />
              <Skeleton variant="rounded" height={120} />
            </Stack>

            <Stack spacing={2} sx={{ flex: 7 }}>
              <Skeleton variant="text" width={200} height={28} />
              <Skeleton variant="rounded" height={320} />
            </Stack>
          </Box>

          <Skeleton variant="text" width={180} height={28} />
          <Skeleton variant="rounded" height={360} />
        </Stack>
      </Container>
    );
  }

  if (!authed) return null;

  return <>{children}</>;
}
