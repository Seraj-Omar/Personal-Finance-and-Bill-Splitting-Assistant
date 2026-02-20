import { apiFetch } from "@/src/lib/api";

export type ExpensesOverviewData = {
  totalBalance: string;
  totalIncome: string;
  totalExpenses: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export function fetchExpensesOverview() {
  return apiFetch<ApiResponse<ExpensesOverviewData>>(
    "/expenses/overview",
    { method: "GET" }
  );
}

// Category Break downItem
export type CategoryBreakdownItem = {
  category: string;
  totalAmount: string;
  percentage: number;
};


export function fetchExpensesCategoriesBreakdown() {
  return apiFetch<ApiResponse<CategoryBreakdownItem[]>>(
    "/expenses/categories/breakdown",
    { method: "GET" }
  );
}


// chart 

export type DonutItem = {
  category: string;
  totalAmount: string;
  percentage: number;
};



export function fetchExpensesDonutChart() {
  return apiFetch<ApiResponse<DonutItem[]>>(
    "/expenses/charts/donut",
    { method: "GET" }
  );
}
