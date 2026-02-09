import { apiFetch } from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoginPayload } from "../type";
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      return apiFetch<{ data: { token: string; user: any } }>(
        "/auth/sign-in",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
    },

    onSuccess: (res) => {
      const token = res?.data?.token;
      const user = res?.data?.user;

      if (token) sessionStorage.setItem("token", token);
      if (user) sessionStorage.setItem("user", JSON.stringify(user));

      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
