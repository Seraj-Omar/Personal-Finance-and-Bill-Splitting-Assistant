import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";

type StatItem = {
	count: number;
	changePercent: number;
};

export type DashboardStatsResponse = {
	success: boolean;
	message: string;
	data: {
		totalUsers: StatItem;
		activeUsers: StatItem;
		debts: StatItem;
		incomes: StatItem;
	};
};

async function fetchDashboardStats(): Promise<DashboardStatsResponse> {
	return apiFetch<DashboardStatsResponse>("/admin/dashboard/stats", {
		method: "GET",
	});
}

export function useDashboardStats() {
	return useQuery({
		queryKey: ["admin-dashboard-stats"],
		queryFn: fetchDashboardStats,
	});
}