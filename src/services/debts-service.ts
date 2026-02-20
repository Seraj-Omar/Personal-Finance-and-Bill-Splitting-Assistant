
import { DebtResponse } from "@/src/types/debt";
import { Debt } from "@/src/types/debt";
import UpdateDebtForm from "../components/debts/UpdateDebtForm";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const debtService = {
  getDebts: async (
    page: number = 1, 
    limit: number = 10, 
    status?: string 
  ): Promise<DebtResponse> => {
    const token = sessionStorage.getItem('token');
    
   
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status && status !== "All") {
      params.append("status", status.toUpperCase());
    }

    const response = await fetch(`${API_BASE_URL}/debts?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch debts');
    }

    return response.json();
  },

  createDebt: async ( debtData: Partial<Debt>) => {
  const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/debts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(debtData),
    });
    console.log("CREATE DEBT RESPONSE:", response.status);
    console.log("CREATE DEBT RESPONSE TEXT:", debtData);
    return response.json();
  },
  
  deleteDebt: async (debtId: string) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/debts/${debtId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
  UpdateDebt: async (debtId: string, updateData: Partial<Debt>) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/debts/${debtId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });
    console.log("UPDATE DEBT RESPONSE:", updateData);
    return response.json();
  },
};