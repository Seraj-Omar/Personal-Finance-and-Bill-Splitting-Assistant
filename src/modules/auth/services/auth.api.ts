import { apiFetch } from "@/src/lib/api";
import { LoginPayload, RegisterPayload ,MePayload, ApiResponse } from "../type";


export async function loginUser(payload: LoginPayload) {
  const res = await apiFetch<ApiResponse<MePayload>>("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const token = res.data.token;
  const user = res.data.user;

if (typeof window !== "undefined") {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("auth:changed"));
}
  return res;
}


export async function registerUser(payload: RegisterPayload) {
  return apiFetch("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logoutUser() {
if (typeof window !== "undefined") {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  window.dispatchEvent(new Event("auth:changed"));
}
}



export async function fetchMe() {
  return apiFetch<ApiResponse<MePayload>>("/auth/me", {  });
}

export async function revalidate() {
  return apiFetch<ApiResponse<MePayload>>("/auth/revalidate", { });
}


export async function requestResetCode(email: string) {
  return apiFetch<ApiResponse<MePayload>>("/auth/password-reset/request", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}



// export function confirmResetPassword(newPassword: string) {
//   return apiFetch<ApiResponse<{ success: true }>>("/auth/password-reset/confirm", {
//     method: "PATCH",
//     credentials: "include",
//     body: JSON.stringify({ newPassword }),
//   });
// }

export function confirmResetPassword(newPassword: string) {
  return  fetch(
    "https://gsg-project-group-5.vercel.app/api/v1/auth/password-reset/confirm",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ newPassword }),
    }
  );
}
