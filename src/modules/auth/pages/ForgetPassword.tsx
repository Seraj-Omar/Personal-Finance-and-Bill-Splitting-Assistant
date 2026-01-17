"use client"

import React from "react"
import Image from "next/image"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid,
} from "@mui/material"
import MailOutlineIcon from "@mui/icons-material/MailOutline"

const ForgetPassword = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-3 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full  main-gradient rounded-xl overflow-hidden shadow-lg h-[60vh]" style={{ height: "60vh" }}>

        {/* Left: Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center items-center texr-white">
          <form className="flex flex-col gap-6">
            <Typography variant="h4"  sx={{ color: "white" }} component="h1"  gutterBottom>
         Check your email
            </Typography>
            <Typography variant="body1"  sx={{ color: "white" }} >
A four-digit code has been sent to your email: example@gmail.com
                   <br/>
 email: example@gmail.com
            </Typography>
          <TextField
  label="Email Address"
  variant="outlined"
  fullWidth
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
      "&.MuiInputLabel-shrink": { color: "white" }, 
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      color: "white",
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
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
              Send 
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

export default ForgetPassword
