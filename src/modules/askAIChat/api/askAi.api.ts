import { ChatMessage } from "../type/type";

export async function askAi(messages: ChatMessage[]) {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map((m) => ({
        role: m.role,
        type: m.type,
        content: m.content,
        budget: m.budget,
      })),
    }),
  });

  if (!res.ok) throw new Error("AI request failed");
  return res.json(); 
}
