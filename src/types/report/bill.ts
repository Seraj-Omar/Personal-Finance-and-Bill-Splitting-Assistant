export type BillStatus = "paid" | "unpaid" | "overdue";

export type Bill = {
  id: number;
  title: string;
  amount: string;
  status: BillStatus;
};