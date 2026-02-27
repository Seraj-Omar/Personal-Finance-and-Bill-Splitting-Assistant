"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logoutUser } from "../services/auth.api";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      // لو user جوجل، هذا يمسح cookie
      try { await logoutUser(); } catch {}
    },
    onSettled: () => {
      sessionStorage.removeItem("cached_user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("auth_provider");
      window.dispatchEvent(new Event("auth:changed"));

      queryClient.clear(); 
      router.push("/login");
    },
  });
}
