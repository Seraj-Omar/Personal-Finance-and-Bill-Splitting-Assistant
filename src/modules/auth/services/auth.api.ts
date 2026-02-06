const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import { LoginPayload, RegisterPayload } from "../type";

export async function loginUser(payload: LoginPayload) {
  if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL");

  const url = `${BASE_URL}/auth/sign-in`;

  const res = await fetch(url, {
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
  if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL");

  const url = `${BASE_URL}/auth/sign-up`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.message || `Register failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}
export async function logoutUser() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
    window.dispatchEvent(new Event("auth:changed")); 
}




export async function fetchMe() {
  const token = sessionStorage.getItem("token");
  const res = await fetch( `${BASE_URL}/auth/me`, { 
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Unauthenticated");
  return res.json();
}