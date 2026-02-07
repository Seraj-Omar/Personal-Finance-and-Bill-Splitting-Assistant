"use client";
import {Box, Typography} from "@mui/material";
import Header from "./Header";
export default function Dashboard() {
    return (
        <Box className="flex flex-col h-screen bg-[#f9f9fa]">
            <Header />
        </Box>
    );
}