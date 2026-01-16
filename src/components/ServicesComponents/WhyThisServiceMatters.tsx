"use client";
import { Box, Typography } from "@mui/material";
import { Check } from "lucide-react";
import ContactUsForm from "./ContactUsForm";
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
        <Box className="flex flex-col gap-[32px] rounded-xl bg-[#FFF] p-4 sm:p-6 md:p-[24px]">
            {/* get back and add the radial gradient */}
            {/* top part */}
            <Box className="flex flex-col gap-[24px] md:flex-row md:flex-wrap md:items-center">

                {/*left side*/}
                <Box className="w-full overflow-hidden rounded-xl md:w-[483px]">
                    <Box
                        component="img"
                        src="/whyThisServiceMatters.jpg"
                        alt="Employee showing financial graph"
                        className="h-auto w-full object-cover"
                        sx={{
                            borderRadius: 8,
                        }}
                    />
                </Box>

                {/*right side*/}
                <Box className="flex flex-1 flex-col items-start justify-center gap-[16px]">
                    <Box className="w-fit">
                        <Typography className="w-fit text-[#1C1A1A]">
                            Why This Service Matters
                        </Typography>
                        <Box className="mt-2 h-[3px] rounded-full hero-gradient" />
                    </Box>
                    <Typography className="w-full max-w-[568px] !text-[20px] !font-[500] !text-[#1C1A1A] sm:!text-[24px]">
                        Smart Financial Tracking Creates a Strong Foundation for Better Control, Clear Insights, and Long-Term Financial Stability
                    </Typography>
                    <Typography className="max-w-[608px] !text-[14px] text-[#1C1A1AC9] sm:!text-[16px]">
                        Clear financial tracking helps you understand your money better and take control with confidence.
                    </Typography>
                </Box>
            </Box>


            {/* bottom part */}
            <Box className="flex flex-col gap-[32px] lg:flex-row lg:flex-wrap lg:justify-between">
                
                {/*left side*/}
                <Box className="flex flex-1 flex-col items-start justify-center gap-[16px]">
                    <Typography className="w-full max-w-[310px] !text-[20px] !font-[500] !leading-[25px] text-[#1C1A1A] sm:!text-[24px]">
                        We help you understand where your money goes.
                    </Typography>
                    <Typography className="max-w-[449px] text-[14px] text-[#1C1A1AC9] !leading-[25px] sm:text-[16px]">
                        We help you understand exactly where your money goes by tracking every expense, income, bill, and debt in one clear and organized view.
                    </Typography>
                    <Box className="flex flex-col gap-[24px] justify-center items-start">
                        {featuresList.map((feature, index) => (
                            <Box key={index} className="flex flex-row gap-[12px] items-center ">
                                <Box className="w-4 h-4 bg-[#3447AA] rounded-full flex items-center justify-center">
                                    <Check className="h-3 w-3 text-[#FFFFFF]" />
                                </Box>
                                <Typography className="!text-[16px] text-[#1C1A1A] !leading-[25px]">{feature}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box className="w-full">
                        {progressList.map((progress, index) => (
                            <Box key={index} className="mb-4">
                                <Box className="flex flex-row justify-between mb-1">
                                    <Typography className="!text-[16px] text-[#1C1A1A] mb-1">{progress.label}</Typography>
                                    <Typography className="!text-[16px] main-text-color">{progress.value}%</Typography>
                                </Box>
                                <Box className="w-full h-[7px] bg-[#E5E7EB] rounded-full">
                                    <Box
                                        className="h-[7px] bg-[#FCA3D8] rounded-full"
                                        sx={{ width: `${progress.value}%` }}
                                    />
                                </Box>
                            </Box>
                        ))} 
                    </Box>
                </Box>


                {/*right side*/}
                <Box className="flex w-full flex-col md:flex-row md:flex-wrap lg:w-[59%]">
                    <Box
                        component="img"
                        src="/CountingMoney.jpg"
                        alt="An employee counting money"
                        className="h-64 w-full rounded-t-xl object-cover sm:h-80 md:h-[499px] md:rounded-s-xl md:rounded-e-none"
                    />

                    <Box
                        className="relative w-full overflow-hidden rounded-b-xl p-4 sm:p-6 md:h-[499px] md:rounded-e-xl md:rounded-s-none md:p-[32px]"
                        sx={{
                        backgroundImage: "url('/footer-bg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        }}
                    >
                        
                    <Box className="absolute inset-0 bg-[#3447AA]/90" />
                        <Box className="relative z-10 flex h-full items-center">
                            <ContactUsForm />
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}