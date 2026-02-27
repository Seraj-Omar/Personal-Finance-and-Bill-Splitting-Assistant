"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { apiFetch } from "@/src/lib/api";
import type { ApiResponse, PasswordResetVerifyRes } from "@/src/modules/auth/type";

type VerifyPayload = { email: string; code: string };

async function verifyResetCode(payload: VerifyPayload) {
  return apiFetch<ApiResponse<PasswordResetVerifyRes>>("/auth/password-reset/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

const ForgetPasswordCode = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const length = 4;
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const email =
    (typeof window !== "undefined" && sessionStorage.getItem("reset_email")) ||
    searchParams.get("email") ||
    "";

  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verifyResetCode,
 onSuccess: (res) => {
  const r: any = res;

  const resetToken =
    r?.data?.resetToken ||
    r?.data?.data?.resetToken ||
    r?.resetToken ||
    r?.data?.token ||
    r?.data?.data?.token;

  console.log("RESET TOKEN:", resetToken);

  if (!resetToken) {
    setErrorMsg("Reset token not returned from server. Please try again.");
    return;
  }

  sessionStorage.setItem("reset_token", resetToken);
  router.push(`/reset-password?token=${encodeURIComponent(resetToken)}`);
},

    onError: (err: any) => {
      setErrorMsg(err?.message || "Invalid code. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const onlyNums = e.target.value.replace(/\D/g, "").slice(0, length);
    setValue(onlyNums);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      setErrorMsg("Missing email. Please go back and enter your email again.");
      return;
    }

    if (value.length < length) {
      setErrorMsg("Please enter the 4-digit code.");
      return;
    }

    await mutateAsync({ email, code: value });
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f5f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1280,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
          background:
            "linear-gradient(292.39deg, rgba(246, 227, 231, 0.84) 1.98%, rgba(52, 71, 170, 0.87) 98.11%)",
          height: "min(921px, calc(100vh - 48px))",
          p: { xs: 2, sm: 3 },
          display: "grid",
          gap: { xs: 4, sm: 6, lg: "89px" },
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // ✅ توسيط كامل على الموبايل
            color: "white",
            px: { xs: 0, sm: 2, lg: 4 },
            py: { xs: 2, lg: 0 },
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              // ✅ نفس روح maxWidth بتاعة forgot
              maxWidth: { xs: 480, sm: 430 },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: "white" }}>
              Check your email
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}
            >
              Enter the 4-digit verification code we sent to your email.
            </Typography>

            {email ? (
              <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
                Sent to: <strong>{email}</strong>
              </Typography>
            ) : null}

            {/* OTP */}
            <Box
              onClick={() => inputRef.current?.focus()}
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 1.5, sm: 2.5 },
                cursor: "text",
                userSelect: "none",
                // ✅ يمنع اللف الغريب على شاشات ضيقة جدًا
                flexWrap: "nowrap",
              }}
            >
              <input
                ref={inputRef}
                value={value}
                onChange={handleChange}
                inputMode="numeric"
                autoFocus
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 1,
                  height: 1,
                  pointerEvents: "none",
                }}
              />

              {digits.map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    width: { xs: "clamp(48px, 14vw, 56px)", sm: 56 },
                    height: { xs: "clamp(48px, 14vw, 56px)", sm: 56 },
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: errorMsg
                      ? "1px solid rgba(255,120,120,0.9)"
                      : "1px solid rgba(255,255,255,0.45)",
                  }}
                >
                  {d}
                </Box>
              ))}
            </Box>

            {errorMsg ? (
              <Typography
                sx={{
                  color: "rgba(255,220,220,0.95)",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {errorMsg}
              </Typography>
            ) : null}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isPending}
              sx={{
                backgroundColor: "#3447AADE",
                height: "50px",
                borderRadius: "12px",
                boxShadow: "none",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#3447AA", boxShadow: "none" },
                "&:disabled": { opacity: 0.7 },
              }}
            >
              {isPending ? "Verifying..." : "Confirm"}
            </Button>

            <Button
              type="button"
              variant="text"
              onClick={() => router.push("/auth/forgot-password")}
              sx={{
                color: "rgba(255,255,255,0.9)",
                textTransform: "none",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              Back
            </Button>
          </Box>
        </Box>

        {/* RIGHT IMAGE */}
        <Box
          sx={{
            position: "relative",
            display: { xs: "none", lg: "block" },
            borderRadius: "16px",
            overflow: "hidden",
            height: "100%",
            minHeight: 420,
          }}
        >
          <Image src="/authImage.jpg" alt="Auth" fill style={{ objectFit: "cover" }} priority />
          <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.3)" }} />

          <Box sx={{ position: "absolute", inset: 0, p: "24px", mt: "64px", color: "white" }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Building clarity into your daily work.
            </Typography>

            <Typography sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 260 }}>
              A simple space to stay organized, focused, and in control.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPasswordCode;


