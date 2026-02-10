
import { DebtResponse } from "@/src/types/debt";
import { Debt } from "@/src/types/debt";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const debtService = {
  getDebts: async (page: number = 1, limit: number = 10): Promise<DebtResponse> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/debts?page=${page}&limit=${limit}`, {
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
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/debts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(debtData),
    });
    return response.json();
  }
};