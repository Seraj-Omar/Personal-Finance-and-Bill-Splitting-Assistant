import { apiFetch } from "@/src/lib/api";
import type { LoginPayload, RegisterPayload, MePayload, ApiResponse } from "../type";

export async function loginUser(payload: LoginPayload) {
  return apiFetch<ApiResponse<MePayload>>("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(payload),
    withCredentials: false,
  });
}

export async function revalidate() {
  return apiFetch<ApiResponse<MePayload>>("/auth/revalidate", {
    method: "GET",
    withCredentials: false,
  });
}

export async function fetchMe() {
  return apiFetch<ApiResponse<MePayload>>("/auth/me", {
    method: "GET",
    withCredentials: true,
    skipAuthHeader: true,
  });
}

export function registerUser(payload: RegisterPayload) {
  return apiFetch("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(payload),
    withCredentials: false,
  });
}


export async function logoutUser() {
  return apiFetch("/auth/logout", { method: "POST", withCredentials: true });

}


export async function requestResetCode(email: string) {
  return apiFetch<ApiResponse<MePayload>>("/auth/password-reset/request", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}



export async function confirmResetPassword(newPassword: string, resetToken: string) {
  return apiFetch("/auth/password-reset/confirm", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${resetToken}`,
    },
    body: JSON.stringify({ newPassword }),
  });
}




// export function confirmResetPassword(newPassword: string) {
//   const token =
//     typeof window !== "undefined"
//       ? sessionStorage.getItem("token")
//       : null;

//   return fetch(
//     "https://gsg-project-group-5.vercel.app/api/v1/auth/password-reset/confirm",
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       body: JSON.stringify({ newPassword }),
//     }
//   );
// }
