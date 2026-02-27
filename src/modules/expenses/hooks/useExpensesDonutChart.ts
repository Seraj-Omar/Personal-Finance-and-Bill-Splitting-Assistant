import { useQuery } from "@tanstack/react-query";
import { ApiResponse, DonutItem, fetchExpensesDonutChart } from "../service/expense.api";

export function useExpensesDonutChart() {
  return useQuery<ApiResponse<DonutItem[]>>({
    queryKey: ["expenses", "donut-chart"],
    queryFn: fetchExpensesDonutChart,
    staleTime: 60_000,
  });
}