"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../services/auth.api";
import type { ApiResponse, MePayload } from "../type";

function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}
export function useMe(enabled = true) {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    enabled,
  });
}

