import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense, CreateExpensePayload } from "../service/expense.api";

export function useCreateExpense() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateExpensePayload) => createExpense(payload),

    onSuccess: (res) => {
      console.log("✅ createExpense success:", res);
      qc.invalidateQueries({ queryKey: ["expenses"] });
      qc.invalidateQueries({ queryKey: ["expenses", "overview"] });
      qc.invalidateQueries({ queryKey: ["expenses", "categories-breakdown"] });
      qc.invalidateQueries({ queryKey: ["expenses", "donut-chart"] });
    },

    onError: (err) => {
      console.log("❌ createExpense error:", err);
      alert("Create expense failed — check console");
    },

    onSettled: () => {
      console.log("ℹ️ createExpense settled");
    },
  });
}