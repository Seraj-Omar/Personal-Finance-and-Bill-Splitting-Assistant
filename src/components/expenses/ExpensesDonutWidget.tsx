"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Paper, Tabs, Tab, Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PieChart } from "@mui/x-charts/PieChart";
import { useExpensesDonutChart } from "@/src/modules/expenses/hooks/useExpensesDonutChart";

const donutColors = ["#2F46B8", "#5E74E6", "#BFC7EA", "#F4B9C2", "#E9A3AD"];

// ✅ period type (بدون ما نربطها بملف types عندك)
type Period = "day" | "week" | "month" | "year";

type Params = {
  currencyId?: string;
  period?: Period;
  month?: number;
  from?: string;
  to?: string;
};
function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toYMDLocal(d: Date) {
  // YYYY-MM-DD حسب التوقيت المحلي (مش UTC)
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}
function endOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}

function startOfYear(d: Date) {
  return new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0);
}
function endOfYear(d: Date) {
  return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
}

// ✅ أسبوع يبدأ يوم الاثنين (تقدري تغيّريها للأحد لو بدك)
function startOfWeek(d: Date) {
  const day = d.getDay(); // 0=Sun..6=Sat
  const diff = (day + 6) % 7; // Monday=0
  const s = new Date(d);
  s.setDate(d.getDate() - diff);
  return startOfDay(s);
}
function endOfWeek(d: Date) {
  const s = startOfWeek(d);
  const e = new Date(s);
  e.setDate(s.getDate() + 6);
  return endOfDay(e);
}

function addPeriod(d: Date, period: Period, dir: -1 | 1) {
  const x = new Date(d);
  if (period === "day") x.setDate(x.getDate() + dir);
  if (period === "week") x.setDate(x.getDate() + 7 * dir);
  if (period === "month") x.setMonth(x.getMonth() + dir);
  if (period === "year") x.setFullYear(x.getFullYear() + dir);
  return x;
}

function monthLabel(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" }); // July 2026
}
function dayLabel(d: Date) {
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" }); // 05 Mar 2026
}
function yearLabel(d: Date) {
  return String(d.getFullYear());
}
function weekLabel(d: Date) {
  const s = startOfWeek(d);
  const e = endOfWeek(d);
  const sTxt = s.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
  const eTxt = e.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
  return `${sTxt} - ${eTxt}`; // 03 Mar - 09 Mar 2026
}

export default function ExpensesDonutCard() {
  const [tab, setTab] = useState(2); // 0 Day,1 Week,2 Month,3 Year
const period: Period =
  tab === 0 ? "day" : tab === 1 ? "week" : tab === 2 ? "month" : "year";  
  const [cursor, setCursor] = useState<Date>(() => new Date());

  const chartWrapRef = useRef<HTMLDivElement | null>(null);
  const [ringSize, setRingSize] = useState(320);

  useEffect(() => {
    if (!chartWrapRef.current) return;
    const el = chartWrapRef.current;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const next = Math.max(220, Math.min(w, 320));
      setRingSize(next);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

const fetchParams = useMemo(() => {
  if (period === "day") {
    const from = toYMDLocal(startOfDay(cursor));
    const to = toYMDLocal(endOfDay(cursor));
    return { period, from, to };
  }

  if (period === "week") {
    const from = toYMDLocal(startOfWeek(cursor));
    const to = toYMDLocal(endOfWeek(cursor));
    return { period, from, to };
  }

  if (period === "month") {
    return { period, month: cursor.getMonth() + 1 };
  }

  return { period, from: toYMDLocal(startOfYear(cursor)), to: toYMDLocal(endOfYear(cursor)) };
}, [cursor, period]);

 

  const headerLabel = useMemo(() => {
    if (period === "day") return dayLabel(cursor);
    if (period === "week") return weekLabel(cursor);
    if (period === "month") return monthLabel(cursor);
    return yearLabel(cursor);
  }, [cursor, period]);

  const onPrev = () => setCursor((d) => addPeriod(d, period, -1));
  const onNext = () => setCursor((d) => addPeriod(d, period, +1));

  // ✅ أهم سطر: مرري params للهوك
  const { data: donutRes, isLoading, isError } = useExpensesDonutChart(fetchParams);
  const items = donutRes?.data ?? [];

  const chartData = useMemo(() => {
    return items.map((x, idx) => ({
      id: idx,
      value: Number((x as any).percentage) || 0,
      label: (x as any).category,
      color: donutColors[idx % donutColors.length],
    }));
  }, [items]);

  const totalExpenses = useMemo(() => {
    return items.reduce((acc, x: any) => acc + (Number(x.totalAmount) || 0), 0);
  }, [items]);

  const chartSize = Math.round(ringSize - 20);
  const innerRadius = Math.round(ringSize * 0.2875);
  const outerRadius = Math.round(ringSize * 0.43125);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100",
        minHeight: 584,
        p: "32px",
        borderRadius: "16px",
        backgroundColor: "#F9FAFB",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        boxSizing: "border-box",
        mx: "auto",
        my: { xs: 2, sm: 0 },
        px: { xs: 2, sm: "32px" },
        maxWidth: { xs: "100%", sm: 409 },
      }}
    >
      {/* Tabs */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => {
            setTab(v);
            // خيار: لما تغيّري tab خلّي المؤشر يرجع لليوم الحالي
            setCursor(new Date());
          }}
          centered
          sx={{
            minHeight: 0,
            "& .MuiTabs-indicator": { height: 2, borderRadius: 2 },
            "& .MuiTab-root": {
              minHeight: 0,
              textTransform: "none",
              fontWeight: 500,
              fontSize: 12,
              px: 2.5,
              color: "#9CA3AF",
            },
            "& .Mui-selected": { color: "#2F46B8", fontWeight: 600 },
          }}
        >
          <Tab disableRipple label="Day" />
          <Tab disableRipple label="Week" />
          <Tab disableRipple label="Month" />
          <Tab disableRipple label="Year" />
        </Tabs>
      </Box>

      {/* Header (Prev/Label/Next) */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 1.5, mb: 2 }}>
        <IconButton onClick={onPrev} size="small" sx={{ color: "#6B7280", width: 32, height: 32 }}>
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        <Typography sx={{ fontWeight: 600, color: "#6B7280", fontSize: 13 }}>
          {headerLabel}
        </Typography>

        <IconButton onClick={onNext} size="small" sx={{ color: "#6B7280", width: 32, height: 32 }}>
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Donut area */}
      <Box ref={chartWrapRef} sx={{ flex: 1, placeItems: "center", width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            width: ringSize,
            height: ringSize,
            borderRadius: "999px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 12px 28px rgba(17, 24, 39, 0.10)",
            display: "grid",
            placeItems: "center",
          }}
        >
          {isLoading && <Typography sx={{ color: "#6B7280" }}>Loading...</Typography>}
          {isError && <Typography sx={{ color: "#ef4444" }}>Failed to load</Typography>}

          {!isLoading && !isError && (
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius,
                  outerRadius,
        paddingAngle: 3,
cornerRadius: 12,
startAngle: -90,
endAngle: 270,
                },
              ]}
              width={chartSize}
              height={chartSize}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              slotProps={{ legend: { sx: { display: "none" } } }}
            />
          )}

          {/* Center Text */}
          <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
            <Typography sx={{ fontSize: 50, fontWeight: 500, color: "#111827" }}>
              ${totalExpenses.toFixed(0)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}