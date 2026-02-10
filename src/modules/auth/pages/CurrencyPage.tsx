"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useCurrencies } from "../hooks/useCurrencies";

function currencyCodeToFlag(code: string) {
  const map: Record<string, string> = {
    USD: "US",
    GBP: "GB",
    EUR: "EU",
    SAR: "SA",
    AED: "AE",
    JOD: "JO",
    JPY: "JP",
  };

  const country = map[code?.toUpperCase()] || "";
  if (!country) return "🏳️";

  const A = 0x1f1e6;
  const base = "A".charCodeAt(0);

  return country
    .toUpperCase()
    .split("")
    .map((ch) => String.fromCodePoint(A + ch.charCodeAt(0) - base))
    .join("");
}

export default function CurrencyPage() {
  const router = useRouter();

  const { data, isLoading, error } = useCurrencies();
  const currenciesFromApi = data?.data ?? [];

  const [selectedCurrency, setSelectedCurrency] = useState("AED");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const pendingEmail = sessionStorage.getItem("pendingEmail");
    const token = sessionStorage.getItem("token");

    if (!pendingEmail && !token) {
      router.replace("/register");
    }
  }, [router]);

  useEffect(() => {
    if (!currenciesFromApi.length) return;

    const exists = currenciesFromApi.some((c: any) => c.code === selectedCurrency);
    if (!exists) setSelectedCurrency(currenciesFromApi[0].code);
  }, [currenciesFromApi, selectedCurrency]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return currenciesFromApi;

    return currenciesFromApi.filter(
      (c: any) =>
        String(c.code).toLowerCase().includes(q) ||
        String(c.name).toLowerCase().includes(q)
    );
  }, [query, currenciesFromApi]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("pendingCurrency", selectedCurrency);
    router.push("/");
  };

  return (
    <section className="min-h-screen w-full bg-[#f5f5f7] flex items-center justify-center p-6">
      {/* Frame 1280x921 */}
      <div
        className="w-full max-w-[1280px] h-[921px] rounded-[16px] overflow-hidden shadow-lg"
        style={{
          background:
            "linear-gradient(292.39deg, rgba(246, 227, 231, 0.84) 1.98%, rgba(52, 71, 170, 0.87) 98.11%)",
        }}
      >
        {/* padding 24 */}
        <div className="h-full w-full p-6">
          <div className="grid h-full grid-cols-1 lg:grid-cols-2 rounded-[16px] overflow-hidden">
            {/* LEFT */}
            <div className="h-full w-full flex items-start">
              {/* نفس الستايل: مش بالنص 100% — شوي لليسار */}
              <div className="w-full pl-10 pr-6 pt-28">
                <Box
                  component="form"
                  onSubmit={handleContinue}
                  sx={{ width: "100%", maxWidth: 460 }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ color: "white", fontWeight: 700, mb: 1 }}
                  >
                    Select currency
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "white", opacity: 0.9, mb: 2.5 }}
                  >
                    This currency will be used across the platform
                  </Typography>

                  {/* (اختياري) Loading / Error بدون ستايل جديد قوي */}
                  {isLoading && (
                    <Typography
                      variant="body2"
                      sx={{ color: "white", opacity: 0.9, mb: 1.5 }}
                    >
                      Loading currencies...
                    </Typography>
                  )}

                  {error && (
                    <Typography
                      variant="body2"
                      sx={{ color: "white", opacity: 0.9, mb: 1.5 }}
                    >
                      Failed to load currencies
                    </Typography>
                  )}

                  {/* Search */}
                  <TextField
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for Currency"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#64748b" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "rgba(255,255,255,0.95)",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.6)" },
                      },
                      "& input": { fontSize: 14 },
                    }}
                  />

                  {/* List Box */}
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(255,255,255,0.6)",
                      mb: 2.5,
                    }}
                  >
                    <List dense disablePadding>
                      {filtered.map((cur: any) => {
                        const active = cur.code === selectedCurrency;
                        return (
                          <ListItemButton
                            key={cur.id || cur.code}
                            onClick={() => setSelectedCurrency(cur.code)}
                            sx={{
                              px: 2,
                              py: 1.2,
                              gap: 1.5,
                              backgroundColor: active
                                ? "rgba(52, 71, 170, 0.87)"
                                : "transparent",
                              "&:hover": {
                                backgroundColor: active
                                  ? "rgba(52, 71, 170, 0.87)"
                                  : "rgba(0,0,0,0.04)",
                              },
                            }}
                          >
                            {/* ✅ العلم */}
                            <span style={{ fontSize: 16 }}>
                              {currencyCodeToFlag(cur.code)}
                            </span>

                            <ListItemText
                              primary={` ${cur.name}`}
                              sx={{
                                "& .MuiListItemText-primary": {
                                  fontSize: 13,
                                  color: active ? "white" : "#1f2937",
                                },
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Paper>

                  {/* Continue */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      height: 48,
                      borderRadius: "12px",
                      boxShadow: "none",
                      textTransform: "none",
                      fontWeight: 600,
                      backgroundColor: "rgba(52, 71, 170, 0.87)",
                      "&:hover": {
                        backgroundColor: "rgba(52, 71, 170, 1)",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative hidden lg:block rounded-[16px] overflow-hidden">
              <Image
                src="/authImage.jpg"
                alt="Auth"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute inset-0 p-6 pt-16 text-white">
                <h2 className="text-[24px] font-semibold leading-snug">
                  Building clarity into your daily work.
                </h2>
                <p className="mt-2 text-[12px] text-white/80 max-w-[260px]">
                  A simple space to stay organized, focused, and in control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
