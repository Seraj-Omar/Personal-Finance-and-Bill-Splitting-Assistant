"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../modules/auth/type";
import { fetchMe } from "../modules/auth/services/auth.api"; 
type AuthContextValue = {
  user: User | null;
  isAuthed: boolean;
  loading: boolean;
  logout: () => void;
  refetchMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    // مهم: لا تعمل fetch على السيرفر لأنه sessionStorage
    enabled: typeof window !== "undefined" && !!sessionStorage.getItem("token"),
  });

  const user = (data as any)?.data?.user ?? null; // عدّلي حسب شكل response عندك

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    queryClient.setQueryData(["me"], null);
    router.push("/login");
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthed: !!user,
      loading: isLoading,
      logout,
      refetchMe: async () => {
        await refetch();
      },
    }),
    [user, isLoading, refetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
