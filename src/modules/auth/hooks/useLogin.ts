"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/auth.api";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (res) => {
      const token = res.data.token;
      const user = res.data.user;

      sessionStorage.setItem("auth_provider", "LOCAL");
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("cached_user", JSON.stringify(user));
      window.dispatchEvent(new Event("auth:changed"));

      queryClient.setQueryData(["session"], res);
      queryClient.removeQueries({ queryKey: ["me"] });

      const hasCurrency = Boolean(user?.defaultCurrencyId);

      if (hasCurrency) {
        router.replace("/"); 
      } else {
        router.replace("/currency");
      }
    },
  });
}
