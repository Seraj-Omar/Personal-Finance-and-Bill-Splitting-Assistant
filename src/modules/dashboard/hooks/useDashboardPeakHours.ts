import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";

type hourStat={
    hour:string,
    count:number
};
export type PeakHoursResponse={
    success:boolean,
    message:string,
    data:hourStat[]
};

async function fetchDashboardPeakHours():Promise<PeakHoursResponse>{
    return apiFetch<PeakHoursResponse>("/admin/dashboard/peak-hours",{
        method:"GET"
    })
}

export function useDashboardPeakHours(){
    return useQuery({
        queryKey:["admin-dashboard-peak-hours"],
        queryFn:fetchDashboardPeakHours,
    });
}