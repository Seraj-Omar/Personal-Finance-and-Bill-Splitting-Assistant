export type BudgetSummary = {

  totalBudget?: number;
  totalExpenses?: number;
  remaining?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};