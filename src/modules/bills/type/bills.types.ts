export type BillStatus = "Paid" | "Unpaid" | "Pending" | "Overdue";
export type BillType = "individual" | "group";

export interface Bill {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: BillType;
  status: BillStatus;
  description?: string;
  currencyId?: string;
  assetId?: string;
  total?: string;
  share?: string;
  percentage?: string;
  members?: string[];
  num?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CreateBillPayload {
  name: string;
  amount: number;
  date: string;
  type: BillType;
  currencyId: string;
  description?: string;
  assetId?: string;
}