import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBill } from "../services/budget.api";

export function useDeleteBill() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBill(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
    },
  });
}
