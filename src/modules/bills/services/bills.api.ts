import { apiFetch } from "@/src/lib/api";
import { ApiResponse, Bill, CreateBillPayload } from "../type/bills.types";

export function fetchBills(type: string, page = 1, limit = 10) {
  return apiFetch<ApiResponse<Bill[]>>(`/bills?type=${type}&page=${page}&limit=${limit}`, {
    method: "GET",
  });
}

export function createBill(payload: CreateBillPayload) {
  return apiFetch<ApiResponse<Bill>>("/bills", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteBill(id: string) {
  return apiFetch<ApiResponse<any>>(`/bills/${id}`, {
    method: "DELETE",
  });
}

export function updateBillStatus(id: string, status: string) {
  return apiFetch<ApiResponse<Bill>>(`/bills/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function smartParseBill() {
  return apiFetch<ApiResponse<Partial<Bill>>>("/bills/smart-parse", {
    method: "POST",
  });
}