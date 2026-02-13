"use client";
import {Box} from "@mui/material";
import Header from "./Header";
import Stats from "./Stats";
import Notifications from "./Notifications";
import FinancialSnapshot from "./FinancialSnapshot";
import FeatureUsageSummary from "./FeatureUsageSummary";
import PeakUsageHours from "./PeakUsageHours";
import ExpensesVsRevenues from "./ExpensesVsRevenues";
import MonthlyOverview from "./MonthlyOverview";
import Users from "../../userManagement/users";
export default function Dashboard() {
    return (
        <Box className="flex flex-col h-screen bg-[#f9f9fa] gap-4 pt-4">
            <Box className="w-full">
                <Header />
            </Box>
            <Box className="w-full">
                <Stats />
            </Box>
            <Box className="w-full">
                <Notifications />
            </Box>
            <Box
                className="grid gap-4 w-full"
                sx={{
                    gridTemplateColumns: "1fr",
                    "@media (min-width: 1024px)": {
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    },
                    "@media (min-width: 1450px)": {
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    },
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        gridColumn: "span 1",
                        "@media (min-width: 1024px)": {
                            gridColumn: "1 / -1",
                        },
                        "@media (min-width: 1450px)": {
                            gridColumn: "auto",
                        },
                    }}
                >
                    <FinancialSnapshot />
                </Box>
                <Box sx={{ width: "100%" }}>
                    <FeatureUsageSummary />
                </Box>
                <Box sx={{ width: "100%" }}>
                    <PeakUsageHours />
                </Box>
            </Box>
            <Box className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                <Box className="col-span-1 lg:col-span-2 w-full">
                    <ExpensesVsRevenues />
                </Box>
                <Box className="col-span-1 w-full">
                    <MonthlyOverview />
                </Box>
            </Box>
            <Box className="w-full">
                <Users />
            </Box>
        </Box>
    );
}