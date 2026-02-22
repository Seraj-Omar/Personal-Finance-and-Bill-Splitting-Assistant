import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget } from "../services/budget.api";

export function useDeleteBudget() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBudget(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["budgets"] });
      await qc.invalidateQueries({ queryKey: ["budgetSummary"] });
    },
  });
}