import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/auth/me"),
    enabled: typeof window !== "undefined" && !!sessionStorage.getItem("token"),
  });
}
