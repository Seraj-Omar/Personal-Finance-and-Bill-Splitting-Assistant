"use client";

import { useMutation } from "@tanstack/react-query";
import { postAIChat } from "../services/ai.api";
import { AIChatRequest } from "../type/type";

export function useAIChatMutation() {
  return useMutation({
    mutationFn: (payload: AIChatRequest) => postAIChat(payload),
  });
}
