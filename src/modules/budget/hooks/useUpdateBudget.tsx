import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBudget } from "../services/budget.api";

type UpdateBudgetPayload = {
  id: string;
  category: string;
  allocatedAmount: string;
  startDate: string;
  endDate: string;
  description?: string;
};

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }: UpdateBudgetPayload) =>
      editBudget(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}