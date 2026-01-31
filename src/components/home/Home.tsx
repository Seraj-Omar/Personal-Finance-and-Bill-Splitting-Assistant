"use client";
import HomeFinancialOverview from "./homeFinincialOverview";
import OurServices from "./OurServices";
import WhyChooseUs from "./WhyChooseUs";
import AttentionNeeded from "./AttentionNeeded";
import AskAi from "./AskAi";
import Rewards from "./Rewards";
import { Box } from "@mui/material";
export default function Home() {
 return (
    <Box component="main" className="flex flex-col items-center justify-center w-full flex-1">
        <HomeFinancialOverview />
        <OurServices />
        <WhyChooseUs />
        <AttentionNeeded />
        <AskAi />
        <Rewards />
    </Box>
  );
}
