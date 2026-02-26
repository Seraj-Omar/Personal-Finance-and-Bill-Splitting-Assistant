import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";

type SnapshotMetric = {
    count: number;
    percentage: number;
};

export type FinancialSnapshotResponse = {
    success: boolean;
    message: string;
    data: {
        expenses: SnapshotMetric;
        revenues: SnapshotMetric;
        debts: SnapshotMetric;
    };
};

async function fetchFinancialSnapshot(): Promise<FinancialSnapshotResponse> {
    return apiFetch<FinancialSnapshotResponse>("/admin/dashboard/financial-snapshot", {
        method: "GET",
    });
}

export function useFinancialSnapshot() {
    return useQuery({
        queryKey: ["admin-dashboard-financial-snapshot"],
        queryFn: fetchFinancialSnapshot,
    });
}