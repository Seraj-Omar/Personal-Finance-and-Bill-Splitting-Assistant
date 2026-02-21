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

//Add exprenses

export type CreateExpensePayload = {
  name: string;
  amount: number;
  currencyId: string;
  category: string;   // "FOOD" | "TRANSPORT" ...
  dueDate: string;    // "YYYY-MM-DD"
  description?: string;
  assetId?: string;  
};




export function createExpense(payload: CreateExpensePayload) {
  return apiFetch<ApiResponse<any>>("/expenses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
