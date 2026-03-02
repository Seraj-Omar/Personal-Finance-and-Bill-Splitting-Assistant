import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/src/lib/api";

type monthData={
    month:string,
    bills:number,
    expenses:number,
};
export type BillsVsExpensesResponse={
    success:boolean,
    message:string,
    data:monthData[]
};

async function fetchBillsVsExpenses():Promise<BillsVsExpensesResponse>{
    return apiFetch<BillsVsExpensesResponse>("/admin/dashboard/bills-vs-expenses",{
        method:"GET"
    })
}

export function useBillsVsExpenses(){
    return useQuery({
        queryKey:["admin-dashboard-bills-vs-expenses"],
        queryFn:fetchBillsVsExpenses,
    });
}