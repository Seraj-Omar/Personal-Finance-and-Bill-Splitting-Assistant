"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { TextField, InputAdornment, Typography, Button } from "@mui/material";
import { useConfirmResetPassword } from "../hooks/useConfirmResetPassword";

const ResetPassword = () => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useConfirmResetPassword();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLocalError(null);

    if (!newPassword || !confirmPassword) {
      setLocalError("Please fill both fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    try {
      await mutateAsync(newPassword);
      router.push("/login");
    } catch (e: any) {
      setLocalError(e?.message || "Failed to reset password.");
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#f5f5f7] flex items-center justify-center p-6">
      <div
        className="w-full max-w-[1280px] rounded-[16px] overflow-hidden shadow-lg"
        style={{
          height: "min(921px, calc(100vh - 48px))",
          background:
            "linear-gradient(292.39deg, rgba(246, 227, 231, 0.84) 1.98%, rgba(52, 71, 170, 0.87) 98.11%)",
        }}
      >
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-[89px] p-6">
          {/* Left */}
          <div className="flex items-center justify-start text-white px-6 lg:px-10">
            <form className="flex flex-col gap-6 w-full max-w-md" onSubmit={handleSubmit}>
              <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                Reset password
              </Typography>

              <Typography sx={{ color: "white", opacity: 0.9 }}>
                Enter the new password. Try to make it simple so that you can easily remember it later.
              </Typography>

              <TextField
                placeholder="New password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon sx={{ color: "white" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 56,
                    borderRadius: "12px",
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.35)" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />

              <TextField
                placeholder="Confirm password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "white" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 56,
                    borderRadius: "12px",
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.35)" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />

              {localError && (
                <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: 13 }}>
                  {localError}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={isPending}
                sx={{
                  height: 50,
                  borderRadius: "12px",
                  backgroundColor: "#3447AADE",
                  textTransform: "none",
                  fontWeight: 600,
                  color: "white",
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#3447AA" },
                  "&:disabled": { opacity: 0.7 },
                }}
              >
                {isPending ? "Confirming..." : "Confirm"}
              </Button>
            </form>
          </div>

          {/* Right */}
          <div className="relative hidden lg:block overflow-hidden rounded-[16px]">
            <Image src="/authImage.jpg" alt="Auth" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col justify-start p-6 text-white mt-16">
              <h2 className="text-[32px] font-semibold leading-snug">Building clarity into your daily work.</h2>
              <p className="mt-2 text-[16px] text-white/80 max-w-[260px]">
                A simple space to stay organized, focused, and in control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
