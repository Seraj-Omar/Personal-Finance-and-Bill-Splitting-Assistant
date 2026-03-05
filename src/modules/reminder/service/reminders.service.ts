import { apiFetch } from "@/src/lib/api";
import { ApiResponse, GetMyRemindersParams, Reminder } from "../type";

export async function getMyReminders(params: GetMyRemindersParams = {}) {
  const { page = 1, limit = 10 } = params;

  const queryString = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  }).toString();

  const res = await apiFetch<ApiResponse<Reminder[]>>(
    `/reminders/me?${queryString}`,
     {
      method: "GET",
 
     }
  );

  return res;
}