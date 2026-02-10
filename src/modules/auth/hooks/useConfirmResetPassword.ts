"use client";
import { useMutation } from "@tanstack/react-query";
import { confirmResetPassword as apiConfirmResetPassword } from "../services/auth.api";

export function useConfirmResetPassword() {
  return useMutation({
    mutationFn: (newPassword: string) => apiConfirmResetPassword(newPassword),
  });
}
