"use client";
import { useMutation } from "@tanstack/react-query";
import type { PasswordResetRequestPayload } from "../type";
import { requestPasswordReset } from "../services/passwordReset.api";

export function usePasswordResetRequest() {
  return useMutation({
    mutationFn: (payload: PasswordResetRequestPayload) => requestPasswordReset(payload),
  });
}
