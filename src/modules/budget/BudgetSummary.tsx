"use client";

import React from "react";
import { Stack, Typography, Box, Button } from "@mui/material";

type Props = {
  totalBudget: number;
  totalExpenses: number;
  currency?: string;
};

const formatMoney = (amount: number, currency = "$") =>
  `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function BudgetSummary({
  totalBudget,
  totalExpenses,
  currency = "$",
}: Props) {
  const remainingBalance = totalBudget - totalExpenses;

  return (
    <Stack spacing={1.2} sx={{ mt: 2 }}>
      <Row label="Total Budget:" value={formatMoney(totalBudget, currency)} />
      <Row label="Total Expenses:" value={formatMoney(totalExpenses, currency)} />
      <Row label="Remaining Balance:" value={formatMoney(remainingBalance, currency)} />


    </Stack>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={700}>{value}</Typography>


    </Box>

  );
}
