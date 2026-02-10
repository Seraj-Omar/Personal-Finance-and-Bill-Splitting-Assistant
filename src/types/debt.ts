export interface Debt {
  id: string;
  userId: string;
  personalName: string;
  direction: "I_OWE";
  amount: string;
  currencyId: string;
  dueDate: string;
  description: string;
  status: "Unpaid" | "Paid" | "Overdue" | "" ;
  createdAt: string;
  reminderEnabled: boolean;
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