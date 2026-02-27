import { Bill } from "../../types/report/bill";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchBills = async (): Promise<Bill[]> => {
  const token = sessionStorage.getItem("token");
  if (!token) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/bills`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Unauthorized");

    const result = await res.json();
    return result.data.items ?? [];
  } catch (err) {
    console.error(err);
    return [];
  }
};