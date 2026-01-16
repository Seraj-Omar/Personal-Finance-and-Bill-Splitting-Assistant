"use client";
import OurServices from "./OurServices";
import WhyChooseUs from "./WhyThisServiceMatters";
import { Box } from "@mui/material";
export default function Services() {
    return (
        <Box className="flex w-full justify-center px-8 sm:px-12 md:px-16 lg:px-20">
            <Box className="flex w-full flex-col gap-16 py-12 sm:py-16">
                <OurServices />
                <WhyChooseUs />
            </Box>
        </Box>
    );
}