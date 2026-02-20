"use client";
import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function AppLoading() {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" width={180} height={30} />
      <Skeleton variant="text" width={260} height={24} sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton variant="rounded" width="45%" height={360} />
        <Skeleton variant="rounded" width="55%" height={360} />
      </Box>
      <Skeleton variant="rounded" width="100%" height={260} sx={{ mt: 3 }} />
    </Box>
  );
}
