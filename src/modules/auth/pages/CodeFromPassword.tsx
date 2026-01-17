"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Box, Typography, Button } from "@mui/material"

const ForgetPasswordCode = () => {
  const router = useRouter()

  // ✅ OTP logic (Input واحد + مربعات شكلية)
  const length = 4
  const [value, setValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const digits = Array.from({ length }, (_, i) => value[i] || "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/\D/g, "").slice(0, length)
    setValue(onlyNums)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (value.length < length) return

    router.push("/auth/reset-password") 
  }

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: "#fff",
      }}
    >
      {/* ✅ MAIN WRAPPER */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1280,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
          height: { xs: "auto", lg: "75vh" },
          background:
            "linear-gradient(292.39deg, rgba(246, 227, 231, 0.84) 1.98%, rgba(52, 71, 170, 0.87) 98.11%)",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
        }}
      >
        {/* ✅ LEFT */}
        <Box
          sx={{
            p: { xs: 4, lg: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              maxWidth: 430,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: "white", fontWeight: 700 }}
            >
              Forget password
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.7,
              }}
            >
              We will send you a 4-digit verification code. Enter your email
              address so we can send you the verification code.
            </Typography>

            <Box
              onClick={() => inputRef.current?.focus()}
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 5,
                cursor: "text",
                userSelect: "none",
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
                    width: 56,
                    height: 56,
                    borderRadius: "10px",
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.45)",
                  }}
                >
                  {d}
                </Box>
              ))}
            </Box>

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
          </Box>
        </Box>

        {/* ✅ RIGHT IMAGE */}
        <Box
          sx={{
            position: "relative",
            display: { xs: "none", lg: "block" },
          }}
        >
          <Image
            src="/authImage.jpg"
            alt="Auth"
            fill
            style={{ objectFit: "cover" }}
            priority
          />

          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.3)",
            }}
          />

          {/* Text */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              p: 5,
              mt: 8,
              color: "white",
            }}
          >
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Building clarity into your daily work.
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 360 }}
            >
              A simple space to stay organized, focused, and in control.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ForgetPasswordCode
