export type ReminderFrequency = "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";

export type Reminder = {
  id: string;
  userId: string;
  dueDate: string; // "2026-03-01"
  description: string;
  isActive: boolean;
  frequency: ReminderFrequency;
  nextRemindAt: string; // ISO
  lastSentAt: string | null;
  completedAt: string | null;
  debtId: any;
  billId: any;
  expenseId: any;
  groupInvoiceId: any;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
};

export type ApiResponse<T> = {
  success: boolean;
  meta: PaginationMeta;
  message: string;
  data: T;
};

export type GetMyRemindersParams = {
  page?: number;
  limit?: number;
};

export type Bill = {
  id: string;
  name: string;
  amount: number;
  date?: string;
  status?: "Paid" | "Unpaid" | "Pending" | "Overdue";
    active?: boolean;
};