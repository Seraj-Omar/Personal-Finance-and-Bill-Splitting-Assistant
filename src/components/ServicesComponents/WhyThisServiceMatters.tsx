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
        <Box className="flex flex-col p-[24px] bg-[#FFF] rounded-xl flex-wrap gap-[48px]">
            {/* get back and add the radial gradient */}
            {/* top part */}
            <Box className="flex flex-row gap-[24px] flex-wrap">

                {/*left side*/}
                <Box className="w-[483px] h-[272px] overflow-hidden rounded-xl">
                    <Box component="img" src="/whyThisServiceMatters.jpg" alt="Employee showing financial graph"
                        sx={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 2,
                        }}
                    />
                </Box>

                {/*right side*/}
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


            {/* bottom part */}
            <Box className="flex flex-row justify-between gap-[24px] flex-wrap">
                
                {/*left side*/}
                <Box className="flex flex-col gap-[16px] justify-center items-start">
                    <Typography className="w-fit text-[#1C1A1A] !text-[24px] !font-[500] max-w-[310px] !leading-[25px]">
                        We help you understand where your money goes.
                    </Typography>
                    <Typography className="text-[16px] text-[#1C1A1AC9] max-w-[449px] !leading-[25px]">
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
                                    <Typography className="!text-[16px] text-[#3447AA]">{progress.value}%</Typography>
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
                <Box className="flex w-[59%] flex-row">
                    <Box
                        component="img"
                        src="/CountingMoney.jpg"
                        alt="An employee counting money"
                        className="h-[499px] w-full rounded-s-xl object-cover"
                    />

                    <Box
                        className="relative h-[499px] w-full overflow-hidden rounded-e-xl p-[32px]"
                        sx={{
                        backgroundImage: "url('/footer-bg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        }}
                    >
                        
                    <Box className="absolute inset-0 bg-[#3447AA]/90" />
                        <Box className="relative z-10">
                        <ContactUsForm />
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}