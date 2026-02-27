"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import AppLoading from "../components/AppLoading"; 

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthed, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthed) {
      router.replace("/login");
    }
  }, [loading, isAuthed, router]);

  if (loading) return <AppLoading />; // 

  return isAuthed ? <>{children}</> : <AppLoading />
}
