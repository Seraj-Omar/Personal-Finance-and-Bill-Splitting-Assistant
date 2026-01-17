"use client"


import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined"
import { TextField, InputAdornment } from "@mui/material"
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
} from "@mui/material"
import MailOutlineIcon from "@mui/icons-material/MailOutline"

const ResetPassword = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
        router.push("/auth/login") 
  };
  const router = useRouter();
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-3 bg-white">
<div
  className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full rounded-xl overflow-hidden shadow-lg"
  style={{
    height: "75vh",
    borderRadius: "16px",
    background:
      "linear-gradient(292.39deg, rgba(246, 227, 231, 0.84) 1.98%, rgba(52, 71, 170, 0.87) 98.11%)",
  }}
>

        {/* Left: Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center items-center texr-white">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Typography variant="h4" sx={{ color: "white" }} component="h1" gutterBottom>
Reset password
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }} >
Enter the new password. Try to make it simple so that you can easily register later.
            </Typography>
     <TextField
  placeholder="New password"
  type="password"
  variant="outlined"
  fullWidth
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <KeyOutlinedIcon sx={{ color: "white" }} />
      </InputAdornment>
    ),
  }}
  InputLabelProps={{
    sx: {
      color: "rgba(255,255,255,0.9)",
      "&.Mui-focused": { color: "white" },
      "&.MuiInputLabel-shrink": { color: "white" },
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      height: 60, 
      borderRadius: "16px", 
      color: "white",
      backgroundColor: "rgba(255,255,255,0.08)", 
      "& fieldset": { borderColor: "rgba(255,255,255,0.35)" },
      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.6)" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
  }}
/>

<TextField
  placeholder="Confirm password"
  type="password"
  variant="outlined"
  fullWidth
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <LockOutlinedIcon sx={{ color: "rgba(255,255,255,0.85)" }} />
      </InputAdornment>
    ),
  }}
  InputLabelProps={{
    sx: {
      color: "rgba(255,255,255,0.9)",
      "&.Mui-focused": { color: "white" },
      "&.MuiInputLabel-shrink": { color: "white" },
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      height: 60,
      borderRadius: "16px",
      color: "white",
      backgroundColor: "rgba(255,255,255,0.08)",
      "& fieldset": { borderColor: "rgba(255,255,255,0.35)" },
      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.6)" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
  }}
/>
            <Button
        
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#3447AADE",
                border: "none",
                height: "50px",
                borderRadius: "12px",
                boxShadow: "none",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#3447AA",
                  boxShadow: "none",
                },
              }}
            >
              Confirm
            </Button>


          </form>
        </div>

        {/* Right: Image */}
        <div className="relative hidden lg:block">
          <Image
            src="/authImage.jpg"
            alt="Auth"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Text on image */}
          <div className="absolute inset-0 flex flex-col justify-start p-8 text-white mt-16">
            <h2 className="text-2xl font-semibold leading-snug text-3xl">
              Building clarity into your daily work.
            </h2>
            <p className="mt-2 text-sm text-white/80 max-w-xs text-2xl">
              A simple space to stay organized, focused, and in control.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ResetPassword
