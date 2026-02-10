import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { revalidate } from "../services/auth.api";

export function useSession(p0: boolean) {
  const q = useQuery({
    queryKey: ["session"],
    queryFn: revalidate,
 staleTime: 5 * 60 * 1000,
refetchOnMount: false,
refetchOnWindowFocus: false,
refetchOnReconnect: false,
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
