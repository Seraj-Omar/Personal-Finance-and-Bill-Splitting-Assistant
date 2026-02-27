import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ExpensesOverviewData, fetchExpensesOverview } from "../service/expense.api";

export function useExpensesOverview() {
  return useQuery<ApiResponse<ExpensesOverviewData>>({
    queryKey: ["expenses", "overview"],
    queryFn: fetchExpensesOverview,
    staleTime: 60_000,
  });
}