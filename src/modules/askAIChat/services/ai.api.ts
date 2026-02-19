import { apiFetch } from "@/src/lib/api";
import { AIChatRequest, AIChatResponse, SuggestBudgetResponse } from "../type/type";

export function postAIChat(body: AIChatRequest) {
  return apiFetch<AIChatResponse>(`/ai/chat`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function fetchSuggestedBudget() {
  return apiFetch<SuggestBudgetResponse>(`/ai/suggest-budget`, {
    method: "GET",
  });
}
