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

export type BudgetCategory =
  | "FOOD"
  | "TRANSPORT"
  | "ENTERTAINMENT"
  | "HEALTH"
  | "SHOPPING"
  | "OTHERS";

export type Budget = {
  id: string;
  userId: string;
  category: BudgetCategory;
  allocatedAmount: string; // API بيرجعها string
  spentAmount: string;
  startDate: string;
  endDate: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
};

export type ApiListResponse<T> = {
  success: boolean;
  message?: string;
  meta: PaginationMeta;
  data: T[];
};

export type GetBudgetsParams = {
  page?: number;
  limit?: number;
  category?: BudgetCategory;
  startDate?: string; // ISO date-time
  endDate?: string;   // ISO date-time
};
