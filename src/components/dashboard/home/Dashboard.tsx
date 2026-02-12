"use client";
import {Box} from "@mui/material";
import Header from "./Header";
import Stats from "./Stats";
import Notifications from "./Notifications";
import FinancialSnapshot from "./FinancialSnapshot";
import FeatureUsageSummary from "./FeatureUsageSummary";
import PeakUsageHours from "./PeakUsageHours";
export default function Dashboard() {
    return (
        <Box className="flex flex-col h-screen bg-[#f9f9fa] gap-4 pt-4">
            <Header />
            <Stats />
            <Notifications />
            <Box className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <FinancialSnapshot />
                <FeatureUsageSummary />
                <PeakUsageHours />
            </Box>
        </Box>
    );
}