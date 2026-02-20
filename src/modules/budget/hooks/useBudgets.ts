"use client";

import { useQuery } from "@tanstack/react-query";
import type { GetBudgetsParams } from "../type/types";
import { fetchBudgets } from "../services/budget.api";

export function useBudgets(params?: GetBudgetsParams, enabled = true) {
  return useQuery({
    queryKey: ["budgets", params],
    queryFn: () => fetchBudgets(params),
    enabled,
    retry: false,
    staleTime: 60_000,
  });
}
