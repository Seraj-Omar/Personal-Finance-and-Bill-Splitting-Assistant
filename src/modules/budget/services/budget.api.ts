import { apiFetch } from "@/src/lib/api";
import type {
  ApiListResponse,
  ApiResponse,
  Budget,
  BudgetSummary,
  CreateBudgetPayload,
  GetBudgetsParams,
} from "../type/types";

/* ---------- helpers ---------- */
function toQuery(params?: GetBudgetsParams) {
  const q = new URLSearchParams();
  if (!params) return "";

  if (params.page != null) q.set("page", String(params.page));
  if (params.limit != null) q.set("limit", String(params.limit));
  if (params.category) q.set("category", params.category);
  if (params.startDate) q.set("startDate", params.startDate);
  if (params.endDate) q.set("endDate", params.endDate);

  return q.toString();
}

/* ---------- EXPENSES ---------- */
export type ExpensesOverview = {
  data: any;
  totalExpenses: string;
  totalRevenues: string;
  balance: string;
};

export function fetchExpensesOverview() {
  return apiFetch<{ data: ExpensesOverview }>("/expenses/overview", { method: "GET" });
}

/* ---------- DEBTS ---------- */
export type DebtSummary = {
  data: any;
  totalDebt: string;
  totalOwedToYou: string;
  totalYouOwe: string;
};

export function fetchDebtSummary() {
  return apiFetch<{ data: DebtSummary }>("/debts", { method: "GET" });
}

/* ---------- BUDGETS ---------- */
export function fetchBudgets(params?: GetBudgetsParams) {
  const qs = toQuery(params);
  const path = qs ? `/budgets?${qs}` : `/budgets`;
  return apiFetch<ApiListResponse<Budget>>(path, { method: "GET" });
}


/* ---------- BUDGET SUMMARY ---------- */
export function getBudgetSummary() {
  return apiFetch<ApiResponse<BudgetSummary>>("/budgets/summary");
}

/* ---------- BILLS ---------- */
export function fetchBills(params?: {
  page?: number;
  limit?: number;
  type?: "individual" | "group";
}) {
  const sp = new URLSearchParams();
  if (params?.page != null) sp.set("page", String(params.page));
  if (params?.limit != null) sp.set("limit", String(params.limit));
  if (params?.type) sp.set("type", params.type);

  const qs = sp.toString();
  return apiFetch(`/bills${qs ? `?${qs}` : ""}`, { method: "GET" });
}
export type DebtDirection = "I_OWE" | "OWED_TO_ME";
export type DebtStatus = "PAID" | "UNPAID";

export type Debt = {
  id: string;
  personalName: string;
  direction: DebtDirection;
  amount: string;
  dueDate: string;
  description?: string;
  status: DebtStatus;
};


export function fetchMyDebts(params?: {
  page?: number;
  limit?: number;
  status?: "PAID" | "UNPAID";
}) {
  const sp = new URLSearchParams();
  if (params?.page != null) sp.set("page", String(params.page));
  if (params?.limit != null) sp.set("limit", String(params.limit));
  if (params?.status) sp.set("status", params.status);

  const qs = sp.toString();
  return apiFetch<ApiListResponse<Debt>>(`/debts${qs ? `?${qs}` : ""}`, {
    method: "GET",
  });
}



//create, update, delete APIs for budgets,

export function createBudget(payload: CreateBudgetPayload) {
  return apiFetch<ApiResponse<Budget>>("/budgets", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}