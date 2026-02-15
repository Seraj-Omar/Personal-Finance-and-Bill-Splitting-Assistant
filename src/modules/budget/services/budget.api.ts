import { apiFetch } from "@/src/lib/api";
import { ApiResponse, BudgetSummary } from "../type/types";

import type { ApiListResponse, Budget, GetBudgetsParams } from "../type/types";

function toQuery(params?: GetBudgetsParams) {
  const q = new URLSearchParams();

  if (!params) return q.toString();

  if (params.page != null) q.set("page", String(params.page));
  if (params.limit != null) q.set("limit", String(params.limit));
  if (params.category) q.set("category", params.category);
  if (params.startDate) q.set("startDate", params.startDate);
  if (params.endDate) q.set("endDate", params.endDate);

  return q.toString();
}

export function getBudgets(params?: GetBudgetsParams) {
  const qs = toQuery(params);
  const path = qs ? `/budgets?${qs}` : `/budgets`; 
  return apiFetch<ApiListResponse<Budget>>(path);
}


export function getBudgetSummary() {
  return apiFetch<ApiResponse<BudgetSummary>>("/budgets/summary");
}
  
export async function fetchBills(params?: {
  page?: number;
  limit?: number;
  type?: "individual" | "group";
}) {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.type) sp.set("type", params.type);

  const qs = sp.toString();
  return apiFetch(`/bills${qs ? `?${qs}` : ""}`, { method: "GET" });
}
