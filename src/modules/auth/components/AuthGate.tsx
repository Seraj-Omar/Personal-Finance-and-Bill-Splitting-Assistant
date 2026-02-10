"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "../hooks/useMe";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  const { data, isLoading, error } = useMe();

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  useEffect(() => {
    const anyErr: any = error;
    if (anyErr?.status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      router.replace("/login");
    }
  }, [error, router]);

  if (!token) return null;
  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
