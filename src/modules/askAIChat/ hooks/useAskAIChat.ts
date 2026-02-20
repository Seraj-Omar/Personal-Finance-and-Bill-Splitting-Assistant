"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAIChatMutation } from "./useAIChatMutation";
import type { ChatMessage } from "../type/type";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function useAskAIChat(initialMessages: ChatMessage[]) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | undefined>(undefined);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { mutateAsync, isPending } = useAIChatMutation();

  const loading = isPending;

  const canSend = useMemo(() => {
    return !loading && input.trim().length > 0;
  }, [loading, input]);

  function appendMessage(msg: ChatMessage) {
    setMessages((prev) => [...prev, msg]);
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, loading]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    // add user message
    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      type: "text",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await mutateAsync({ message: content, chatId });

      setChatId(res.data.chatId);

      const aiText = res.data.message ?? res.data.response ?? "";

      const aiMsg: ChatMessage = {
        id: uid(),
        role: "ai",
        type: "text",
        content: aiText,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e: any) {
      const errText =
        e?.data?.message || e?.message || "Something went wrong while contacting AI.";

      const aiErr: ChatMessage = {
        id: uid(),
        role: "ai",
        type: "text",
        content: `⚠️ ${errText}`,
      };
      setMessages((prev) => [...prev, aiErr]);
    }
  }

  return {
    messages,
    input,
    setInput,
    loading,
    canSend,
    send,
    scrollerRef,
    chatId,
    appendMessage, 
  };
}
