"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logoutUser } from "../services/auth.api";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      sessionStorage.removeItem("cached_user");
      sessionStorage.removeItem("token"); // اختياري إذا بتخزني token

      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["session"] });

      router.push("/login");
    },
    onError: () => {
      sessionStorage.removeItem("cached_user");
      sessionStorage.removeItem("token");
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["session"] });
      router.push("/login");
    },
  });
}
