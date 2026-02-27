import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBudget,   } from "../services/budget.api";
import { CreateBudgetPayload } from "../type/types";

export function useCreateBudget() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBudgetPayload) => createBudget(payload),
    onSuccess: async () => {
qc.invalidateQueries({ queryKey: ["budgets"] });
      await qc.invalidateQueries({ queryKey: ["budgetSummary"] });
    },
  });
}