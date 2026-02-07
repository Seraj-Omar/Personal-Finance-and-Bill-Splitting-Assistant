"use client";
import {Box} from "@mui/material";
import Header from "./Header";
import Stats from "./Stats";
export default function Dashboard() {
    return (
        <Box className="flex flex-col h-screen bg-[#f9f9fa] gap-4">
            <Header />
            <Stats />
        </Box>
    );
}