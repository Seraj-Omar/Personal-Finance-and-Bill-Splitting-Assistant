"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Typography, TextField, Button, InputAdornment } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequestResetCode } from "@/src/modules/auth/hooks/useRequestResetCode";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

const ForgetPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  const { mutateAsync } = useRequestResetCode();

  const onSubmit = async (values: FormValues) => {
    await mutateAsync(values.email); 
    sessionStorage.setItem("reset_email", values.email);
    router.push(`/forgot-password/code?email=${encodeURIComponent(values.email)}`);
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
            <form
              className="flex flex-col gap-6 w-full max-w-md"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Typography
                variant="h4"
                sx={{ color: "white", fontWeight: 700 }}
                component="h1"
              >
                Forgot password?
              </Typography>

              <Typography variant="body2" sx={{ color: "white", opacity: 0.9 }}>
                Enter your email and we’ll send you a 4-digit code to reset your
                password.
              </Typography>

              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message || " "}
                FormHelperTextProps={{
                  sx: { color: "rgba(255,255,255,0.9)" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon sx={{ color: "white" }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: {
                    color: "white",
                    "&.Mui-focused": { color: "white" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.6)" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
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
                {isSubmitting ? "Sending..." : "Send code"}
              </Button>
            </form>
          </div>

          {/* Right */}
          <div className="relative hidden lg:block overflow-hidden rounded-[16px]">
            <Image
              src="/authImage.jpg"
              alt="Auth"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex flex-col justify-start p-6 text-white mt-16">
              <h2 className="text-[32px] font-semibold leading-snug">
                Building clarity into your daily work.
              </h2>
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

export default ForgetPassword;
