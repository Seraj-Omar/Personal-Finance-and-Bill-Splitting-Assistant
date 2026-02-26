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
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJlN2VlOS1kNzVkLTQ4ZjItYWNkYS1kMGI0NjJiYjc0MzUiLCJyb2xlIjoiVVNFUiIsImVtYWlsIjoibW9hbWVuQGV4YW1wbGUuY29tIiwiZnVsbE5hbWUiOiJNb2FtZW4gQWwtWWF6b3VyaSIsInByb3ZpZGVyIjoiTE9DQUwiLCJzdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE3NzIxMzU5NjJ9.WC_tGO7aIRCozHkWNYzcMKjidzsUb4vDHAOVk0tgIDc`,
    //   },
     }
  );

  return res;
}