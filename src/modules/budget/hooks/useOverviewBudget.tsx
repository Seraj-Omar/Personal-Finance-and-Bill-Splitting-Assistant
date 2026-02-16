import { useQuery } from "@tanstack/react-query";
import {
  fetchBudgets,
  fetchDebtSummary,
  fetchExpensesOverview,
  type ExpensesOverview,
  type DebtSummary,
} from "../services/budget.api";
import type { Budget, ApiListResponse } from "../type/types";

export function useOverviewBudget() {
  return useQuery<{
    expenses: ExpensesOverview;
    debts: DebtSummary;
    budgets: Budget[];
  }>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const [expensesRes, debtsRes, budgetsRes] = await Promise.all([
        fetchExpensesOverview(),
        fetchDebtSummary(),
        fetchBudgets(),
      ]);

      const budgetsList = budgetsRes as ApiListResponse<Budget>;
      const budgets = (budgetsList as any).items ?? (budgetsList as any).data ?? [];

      return {
        expenses: expensesRes.data,
        debts: debtsRes.data,
        budgets,
      };
    },
    staleTime: 60 * 1000,
    retry: false,
  });
}
