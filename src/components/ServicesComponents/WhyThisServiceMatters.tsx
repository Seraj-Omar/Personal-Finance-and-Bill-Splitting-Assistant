"use client";
import { Box, Typography } from "@mui/material";
import { Check } from "lucide-react";

const featuresList = [
    "Secure wallet storage",
    "Real-time portfolio tracking",
    "Basic transaction history",
    "Email support",
];

const progressList = [
    { label: "Financial Planning", value: 60 },
    { label: "Budget Investment", value: 70 },
];

export default function WhyChooseUs() {
    return (
        <Box className="flex flex-col p-[24px] bg-[#FFF] rounded-xl ">
            <Box className="flex flex-row gap-[24px]">
                <Box className="w-[483px] h-[272px] overflow-hidden rounded-xl">
                    <Box component="img" src="/whyThisServiceMatters.jpg" alt="Employee showing financial graph"
                        sx={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 2,
                        }}
                    />
                </Box>
                <Box className="flex flex-col gap-[16px] justify-center items-start">
                    <Typography className="w-fit text-[#1C1A1A]">
                        Why This Service Matters
                        <Box className="mt-2 h-[3px] rounded-full bg-[linear-gradient(90deg,#EFA5B6_0%,#3447AAA6_100%)]" />
                    </Typography>
                    <Typography className="w-[568px] !text-[#1C1A1A] !font-[500] !text-[24px]">
                        Smart Financial Tracking Creates a Strong Foundation for Better Control, Clear Insights, and Long-Term Financial Stability
                    </Typography>
                    <Typography className="text-[#1C1A1AC9]  !text-[16px] max-w-[608px]">
                        Clear financial tracking helps you understand your money better and take control with confidence.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}