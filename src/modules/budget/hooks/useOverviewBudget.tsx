import { useQuery } from "@tanstack/react-query";
import { fetchBudgets, fetchDebtSummary, fetchExpensesOverview } from "../services/budget.api";


export function useOverviewBudget() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const [expenses, debts, budgets] = await Promise.all([
        fetchExpensesOverview(),
        fetchDebtSummary(),
        fetchBudgets(),
      ]);

      return {
        expenses: expenses.data,
        debts: debts.data,
        budgets: budgets.data,
      };
    },
    staleTime: 60 * 1000,
    retry: false,
  });
}
