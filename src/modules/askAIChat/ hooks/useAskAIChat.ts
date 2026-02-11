import { useMemo, useRef, useState } from "react";
import { askAi } from "../api/askAi.api";
import { ChatMessage } from "../type/type";

function uid() {
  return Math.random().toString(16).slice(2);
}

export function useAskAIChat(initialMessages: ChatMessage[]) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading]
  );

  const scrollDown = () => {
    requestAnimationFrame(() => {
      scrollerRef.current?.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const send = async (text: string) => {
    const prompt = text.trim();
    if (!prompt || loading) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      type: "text",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    scrollDown();

    try {
      const data = await askAi([...messages, userMsg]);

      const aiMsg: ChatMessage = {
        id: uid(),
        role: "ai",
        type: data.type || "text",
        content: data.content,
        budget: data.budget,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "ai",
          type: "text",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      scrollDown();
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    canSend,
    send,
    scrollerRef,
  };
}
