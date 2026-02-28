"use client";

import { useQuery } from "@tanstack/react-query";
import type { GetBudgetsParams } from "../type/types";
import { fetchBudgets } from "../services/budget.api";

export function useBudgets(params?: GetBudgetsParams, enabled = true) {
  
  return useQuery({
    queryKey: ["budgets", params],
    queryFn: () => fetchBudgets(params),
    enabled,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 60_000,
  });
}