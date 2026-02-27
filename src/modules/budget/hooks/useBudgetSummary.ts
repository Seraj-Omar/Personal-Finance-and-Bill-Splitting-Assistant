"use client";

import { useQuery } from "@tanstack/react-query";
import { getBudgetSummary } from "../services/budget.api";

export function useBudgetSummary(enabled = true) {
  return useQuery({
    queryKey: ["budget-summary"],
    queryFn: getBudgetSummary,
    retry: false,
    enabled,
  });
}
