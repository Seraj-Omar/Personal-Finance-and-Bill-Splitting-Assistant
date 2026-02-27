import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../services/auth.api";

export function useMe(enabled = true) {
  const q = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    enabled,
  });

  useEffect(() => {
    const user = q.data?.data?.user;

    if (user) {
      sessionStorage.setItem("cached_user", JSON.stringify(user));
    } else if (q.isFetched && !q.isLoading) {
      sessionStorage.removeItem("cached_user");
    }
  }, [q.data, q.isFetched, q.isLoading]);

  return q;
}
