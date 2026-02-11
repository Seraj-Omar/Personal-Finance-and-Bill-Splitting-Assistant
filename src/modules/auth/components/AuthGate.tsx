"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../hooks/useSession";
import { Box, Container, Skeleton, Stack } from "@mui/material";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    setReady(true);
  }, []);

  const { isLoading, error } = useSession(ready && !!token);

  useEffect(() => {
    if (ready && !token) router.replace("/login");
  }, [ready, token, router]);

  useEffect(() => {
    const anyErr: any = error;
    if (anyErr?.status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("cached_user");
      router.replace("/login");
    }
  }, [error, router]);

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
