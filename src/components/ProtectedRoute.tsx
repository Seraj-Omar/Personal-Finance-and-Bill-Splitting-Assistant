"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthed, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthed) {
      router.replace("/login");
    }
  }, [loading, isAuthed, router]);

  if (loading) return null;

  return isAuthed ? <>{children}</> : null;
}
