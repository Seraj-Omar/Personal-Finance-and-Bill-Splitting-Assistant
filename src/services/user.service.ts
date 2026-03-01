import { User } from "../types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = () => sessionStorage.getItem("token");

const getAuthHeaders = () => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_BASE_URL}/users`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data.data ?? [];
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message ?? "Delete failed");
  }
};