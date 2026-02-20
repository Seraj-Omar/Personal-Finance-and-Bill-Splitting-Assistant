"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../hooks/useSession";
import { Box, Container, Skeleton, Stack } from "@mui/material";

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

  const { isLoading, error } = useSession(ready && !!token);

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

  if (!ready) return null;
  if (!token) return null;

  if (isLoading) {
    return (
      <Container
        maxWidth={false}
        disableGutters
        sx={{ py: 5, px: { xs: "10px", sm: "12px", md: "16px", lg: "100px" } }}
      >
        <Stack spacing={3}>
          {/* Top area (header / title) */}
          <Skeleton variant="text" width={220} height={36} />
          <Skeleton variant="text" width={320} />

          {/* Two columns section */}
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

          {/* Table/List section */}
          <Skeleton variant="text" width={180} height={28} />
          <Skeleton variant="rounded" height={360} />
        </Stack>
      </Container>
    );
  }

  return <>{children}</>;
}
