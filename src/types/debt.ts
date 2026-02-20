export interface Debt {
  id: string;
  userId: string;
  personalName: string;
  direction: string;
  amount: string;
  currencyId: string;
  dueDate: string;
  description: string;
  status: string|null ;
  createdAt: string;
  reminderEnabled: boolean;
  assetId?: string | null;
  remindAt: string | null;
}

export interface DebtResponse {
  success: boolean;
  data: Debt[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}