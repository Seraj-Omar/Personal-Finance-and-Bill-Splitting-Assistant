"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchSuggestedBudget } from "../services/ai.api";

export function useSuggestedBudget(enabled = true) {
  return useQuery({
    queryKey: ["ai-suggest-budget"],
    queryFn: fetchSuggestedBudget,
    enabled,     
    retry: false,
    select: (res) => res.data.data,
  });
}
