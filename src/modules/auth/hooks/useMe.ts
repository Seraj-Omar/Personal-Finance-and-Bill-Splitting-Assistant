"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../services/auth.api";
import type { ApiResponse, MePayload } from "../type";

function hasToken() {
  if (typeof window === "undefined") return false;
  return !!sessionStorage.getItem("token");
}



export function useMe() {
  return useQuery<ApiResponse<MePayload>>({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    enabled: typeof window !== "undefined",
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });
}
