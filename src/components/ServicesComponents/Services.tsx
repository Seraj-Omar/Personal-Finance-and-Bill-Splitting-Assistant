"use client";
import OurServices from "./OurServices";
import WhyChooseUs from "./WhyChooseUs";
import { Box } from "@mui/material";
export default function Services() {
    return (
        <Box className="flex w-full justify-center px-[80px]">
            <Box className="flex w-full flex-col gap-16 px-4 py-16">
                <OurServices />
            </Box>
        </Box>
    );
}