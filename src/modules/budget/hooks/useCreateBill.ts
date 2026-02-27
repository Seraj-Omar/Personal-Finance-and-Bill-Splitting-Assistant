import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBill } from "../services/budget.api";
import { CreateBillPayload } from "../type/types";

export function useCreateBill() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBillPayload) => createBill(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
    },
  });
}
