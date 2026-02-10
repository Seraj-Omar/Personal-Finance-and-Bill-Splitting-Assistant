"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../hooks/useSession";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    setReady(true);
  }, []);

  const { isLoading, error, data } = useSession(ready && !!token);

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
  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
