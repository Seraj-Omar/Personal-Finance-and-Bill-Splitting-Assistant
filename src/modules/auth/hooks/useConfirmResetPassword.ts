"use client";
import { useMutation } from "@tanstack/react-query";
import { confirmResetPassword as apiConfirmResetPassword } from "../services/auth.api";

type Payload = { newPassword: string; resetToken: string };

export function useConfirmResetPassword() {
  return useMutation({
    mutationFn: ({ newPassword, resetToken }: Payload) =>
      apiConfirmResetPassword(newPassword, resetToken),
  });
}