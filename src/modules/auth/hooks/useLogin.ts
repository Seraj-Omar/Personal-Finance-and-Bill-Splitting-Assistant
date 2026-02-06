import { apiFetch } from "@/src/lib/api";
import { useMutation } from "@tanstack/react-query";

type LoginPayload = { email: string; password: string };

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      return apiFetch<{ data: { token: string; user: any } }>("/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (res) => {
      const token = res?.data?.token;
      const user = res?.data?.user;

      if (token) sessionStorage.setItem("token", token);
      if (user) sessionStorage.setItem("user", JSON.stringify(user));
    },
  });
}
