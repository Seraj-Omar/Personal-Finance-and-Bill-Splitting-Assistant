export type BudgetSummary = {
  totalAllocated: number | string;
  totalSpent: number | string;
  totalRemaining?: number | string;
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


export type CreateBudgetPayload = {
  category: string;          
  allocatedAmount: string;   
  startDate: string;        
  endDate: string;         
  description?: string;
};

/* ---------- BILLS ---------- */
export type BillType = "individual" | "group";
export type BillPaymentStatus = "paid" | "unpaid";

export type BillParticipant = {
  id: string;
  name: string;
  amount: string | number;
  percentage?: string | number;
};

export type Bill = {
  id: string;
  name: string;
  amount: string | number;
  date: string;
  type: BillType;
  status: BillPaymentStatus;
  currencyId?: string;
  description?: string;
  assetId?: string;
  participants?: BillParticipant[];
  createdAt?: string;
  updatedAt?: string;
};

export type BillsApiResponse = {
  success: boolean;
  data: {
    items: Bill[];
    meta: {
      page: number;
      limit: number;
      total: number;
    };
  };
};

export type CreateBillPayload = {
  name: string;
  amount: number;
  date: string;
  type: BillType;
  status?: BillPaymentStatus;
  currencyId?: string;
  description?: string;
  assetId?: string;
};

export type UpdateBillPayload = {
  name?: string;
  amount?: number;
  date?: string;
  currencyId?: string;
  description?: string;
  assetId?: string;
};