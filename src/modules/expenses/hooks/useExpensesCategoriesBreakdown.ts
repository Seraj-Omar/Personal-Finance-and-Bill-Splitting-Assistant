import { useQuery } from "@tanstack/react-query";
import { ApiResponse, CategoryBreakdownItem, fetchExpensesCategoriesBreakdown } from "../service/expense.api";


export function useExpensesCategoriesBreakdown() {
  return useQuery<ApiResponse<CategoryBreakdownItem[]>>({
    queryKey: ["expenses", "categories-breakdown"],
    queryFn: fetchExpensesCategoriesBreakdown,
    staleTime: 60_000,
  });
}