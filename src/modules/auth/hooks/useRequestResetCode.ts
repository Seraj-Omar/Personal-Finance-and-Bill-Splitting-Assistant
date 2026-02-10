"use client";
import { useMutation } from "@tanstack/react-query";
import { requestResetCode } from "../services/auth.api";

export function useRequestResetCode() {
  return useMutation({
    mutationFn: (email: string) => requestResetCode(email),
  });
}