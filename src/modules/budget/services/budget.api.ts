import { apiFetch } from "@/src/lib/api";
import { ApiResponse, BudgetSummary } from "../type/types";



export function getBudgetSummary() {
  return apiFetch<ApiResponse<BudgetSummary>>("/budgets/summary");
}
