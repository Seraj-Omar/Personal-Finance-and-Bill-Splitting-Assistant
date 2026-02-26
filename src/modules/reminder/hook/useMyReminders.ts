// src/modules/reminders/hooks/useMyReminders.ts
import { useQuery } from "@tanstack/react-query";
import { getMyReminders } from "../service/reminders.service";
import { GetMyRemindersParams } from "../type";
export function useMyReminders(params: { page: number; limit: number }) {
  return useQuery({
    queryKey: ["reminders", "me", params.page, params.limit],
    queryFn: () => getMyReminders(params), 
    keepPreviousData: true,
  });
}