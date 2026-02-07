import { apiFetch } from "@/src/lib/api";
import { LoginPayload, RegisterPayload ,MePayload, ApiResponse } from "../type";

export async function loginUser(payload: LoginPayload) {
  const data = await apiFetch<{ data: { token: string; user: any } }>(
    "/auth/sign-in",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  const token = data?.data?.token;
  const user = data?.data?.user;

  if (token) sessionStorage.setItem("token", token);
  if (user) sessionStorage.setItem("user", JSON.stringify(user));

  window.dispatchEvent(new Event("auth:changed"));

  return data;
}

export async function registerUser(payload: RegisterPayload) {
  return apiFetch("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logoutUser() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  window.dispatchEvent(new Event("auth:changed"));
}



export async function fetchMe() {
  return apiFetch<ApiResponse<MePayload>>("/auth/revalidate", { withCredentials: true });
}