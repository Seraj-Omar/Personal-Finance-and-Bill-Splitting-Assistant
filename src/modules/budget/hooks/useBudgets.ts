"use client";

import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "../services/budget.api";
import type { GetBudgetsParams } from "../type/types";

export function useBudgets(params?: GetBudgetsParams, enabled = true) {
  return useQuery({
    queryKey: ["budgets", params],
    queryFn: () => getBudgets(params),
    enabled,
    retry: false,
    staleTime: 60_000,
  });
}
