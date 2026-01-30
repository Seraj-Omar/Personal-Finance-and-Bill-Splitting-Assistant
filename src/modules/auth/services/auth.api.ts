import { LoginPayload, RegisterPayload } from "../type";

export async function loginUser(payload: LoginPayload) {
  const res = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data?.message || "Login failed");

  const token = data?.data?.token;
  const user = data?.data?.user;


if (token) sessionStorage.setItem("token", token);
if (user) sessionStorage.setItem("user", JSON.stringify(user));

  return data;
}

export async function registerUser(payload: RegisterPayload) {
  const res = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data?.message || "Register failed");

  return data;
}
export async function logoutUser() {
  // إذا ما عندك endpoint logout بالباك:
  // logout بالفرونت = امسحي التخزين
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
