"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../services/auth.api";
import type { LoginPayload } from "../type"; // لو عندك النوع جاهز

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser, // ✅ تستخدم نفس دالة السيرفس اللي بتخزن token/user
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] }); // ✅ يحدث Navbar فوراً
    },
  });
}
