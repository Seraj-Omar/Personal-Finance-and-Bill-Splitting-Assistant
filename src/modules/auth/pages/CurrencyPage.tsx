"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  MenuItem,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search"; 

const currencies = [
  { code: "USD", name: "United States (US Dollar)", flag: "🇺🇸" },
  { code: "GBP", name: "United Kingdom (British Pound Sterling)", flag: "🇬🇧" },
  { code: "EUR", name: "European Union (Euro)", flag: "🇪🇺" },
  { code: "SAR", name: "Saudi Arabia (Saudi Riyal)", flag: "🇸🇦" },
  { code: "AED", name: "United Arab Emirates (UAE Dirham)", flag: "🇦🇪" },
  { code: "JOD", name: "Jordan (Jordanian Dinar)", flag: "🇯🇴" },
  { code: "JPY", name: "Japan (Japanese Yen)", flag: "🇯🇵" },
];

export default function CurrencyPage() {
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState("AED");

  useEffect(() => {
    const pendingEmail = sessionStorage.getItem("pendingEmail");
    const token = sessionStorage.getItem("token"); 

    if (!pendingEmail && !token) {
      router.replace("/register");
    }
  }, [router]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    sessionStorage.setItem("pendingCurrency", selectedCurrency);

    router.push("/login");
  };

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
        {/* Left */}
        <div className="p-8 lg:p-12 flex flex-col justify-center items-center text-white">
          <form
            onSubmit={handleContinue}
            className="flex flex-col gap-6 w-full max-w-[520px]"
          >
            <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }} component="h1">
              Select currency
            </Typography>

            <Typography variant="body1" sx={{ color: "white", opacity: 0.9 }}>
              This currency will be used across the platform
            </Typography>

            <TextField
              select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              fullWidth
              SelectProps={{ displayEmpty: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              {currencies.map((cur) => (
                <MenuItem
                  key={cur.code}
                  value={cur.code}
                  sx={{ display: "flex", alignItems: "center", gap: 5, borderRadius: "10px" }}
                >
                  <span style={{ fontSize: "18px" }}>{cur.flag}</span>
                  <span style={{ fontSize: "14px" }}>{cur.name}</span>
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#3447AADE",
                height: "50px",
                borderRadius: "12px",
                boxShadow: "none",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#3447AA", boxShadow: "none" },
              }}
            >
              Continue
            </Button>
          </form>
        </div>

        {/* Right */}
        <div className="relative hidden lg:block">
          <Image src="/authImage.jpg" alt="Auth" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/30" />
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
  );
}
