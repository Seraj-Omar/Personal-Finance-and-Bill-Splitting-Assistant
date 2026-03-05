import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as billsApi from "../services/bills.api";

export function useGetBills(type: "individual" | "group") {
  return useQuery({
    queryKey: ["bills", type],
    queryFn: () => billsApi.fetchBills(type),
  });
}

export function useCreateBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: billsApi.createBill,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });
}

export function useDeleteBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: billsApi.deleteBill,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });
}

export function useUpdateBillStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      billsApi.updateBillStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });
}