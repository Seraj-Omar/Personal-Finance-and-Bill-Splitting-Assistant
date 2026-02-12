"use client";
import { Box,Typography } from "@mui/material";
import DashboardTitle from "./DashboardTitle";

export default function PeakUsageHours() {
    return(
        <Box className="bg-[#FFFFFF] rounded-xl p-6  flex flex-col gap-6 w-full">
            <DashboardTitle title="Peak Usage Hours" />
        </Box>
    );
}