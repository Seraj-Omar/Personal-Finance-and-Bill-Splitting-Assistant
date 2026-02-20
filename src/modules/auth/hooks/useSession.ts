import { useQuery } from "@tanstack/react-query";
import { revalidate } from "../services/auth.api";

export function useSession(p0: boolean) {
  return useQuery({
    queryKey: ["session"],
    queryFn: revalidate,          // GET /auth/revalidate
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
