"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSuggestedBudget } from "../services/ai.api";

export function useSuggestedBudget() {
  return useQuery({
    queryKey: ["ai-suggest-budget"],
    queryFn: fetchSuggestedBudget,
    retry: false,
    select: (res) => res.data.data, // array of items
  });
}
