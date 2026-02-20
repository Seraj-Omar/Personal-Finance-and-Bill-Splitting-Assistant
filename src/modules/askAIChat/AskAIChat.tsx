"use client";

import React from "react";
import { Box, Paper, Typography, Divider, Container, Stack, Button } from "@mui/material";

import { suggestedQuestions } from "./constants";
import type { ChatMessage } from "./type/type";
import ChatInput from "./ChatInput";
import ChatBubble from "./ChatBubble";
import { useSuggestedBudget } from "./ hooks/useSuggestedBudget";
import { useAskAIChat } from "./ hooks/useAskAIChat";


const initialMessages: ChatMessage[] = [
  {
    id: "seed1",
    role: "ai",
    type: "text",
    content: "Your spending looks generally healthy...",
  },
];

export default function AskAIChat() {
  const { refetch, isFetching } = useSuggestedBudget(false);

  const {
    messages,
    input,
    setInput,
    loading,
    canSend,
    send,
    scrollerRef,
    appendMessage,
  } = useAskAIChat(initialMessages);

  async function handleShowChart() {
    send("Make me AI budget suggestion");

    const res = await refetch();
    const items = res.data; // <-- array من select

    if (!items) return;

    appendMessage({
      id: `budget-${Date.now()}`,
      role: "ai",
      type: "budgetCard",
      budget: {
        title: "Suggested Budget 🤖",
        segments: items.map((x) => ({ label: x.category, value: x.percentage })),
        items: items.map((x) => ({ label: x.category, amount: x.amount.toString() })),
      },
    });
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ py: 6, px: { xs: "10px", sm: "12px", md: "16px" } }}
    >
      <Box sx={{ width: "100%", maxWidth: 1280, mx: "auto" }}>
        <Typography fontWeight={700} sx={{ mb: 8, mt: 6, fontSize: { xs: 24, sm: 30 } }}>
          Ask AI
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: 1280,
            mx: "auto",
            p: { xs: 2, sm: 4 },
            backgroundColor: "#F9F9F9",
            borderRadius: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            <Box
              ref={scrollerRef}
              sx={{
                height: 520,
                p: 2,
                overflowY: "auto",
                backgroundColor: "#FBFBFE",
              }}
            >
              <Stack spacing={2}>
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} msg={msg} />
                ))}

                {loading && (
                  <Typography variant="caption" color="text.secondary">
                    AI is thinking...
                  </Typography>
                )}
              </Stack>
            </Box>

            <Divider />

            <ChatInput input={input} setInput={setInput} canSend={canSend} onSend={send} />
          </Paper>

          {/* Suggested Questions */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
              Suggested questions
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {suggestedQuestions.map((q) => (
                <Button
                  key={q}
                  size="small"
                  variant="outlined"
                  disabled={loading}
                  onClick={() => send(q)}
                  sx={{ borderRadius: 999, textTransform: "none" }}
                >
                  {q}
                </Button>
              ))}

              <Button
                size="small"
                variant="contained"
                disabled={isFetching}
                onClick={handleShowChart}
                sx={{ borderRadius: 999, textTransform: "none" }}
              >
                {isFetching ? "Loading..." : "Make me AI budget suggestion"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
