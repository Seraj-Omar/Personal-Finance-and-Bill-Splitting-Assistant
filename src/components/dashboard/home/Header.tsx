"use client";
import{Box, Typography} from "@mui/material";
import TimelineFilter from "./TimelineFilter";

export default function Header() {
    return (
        <Box component="header" className="flex items-center justify-between ">
            <Box className="flex flex-col">
                <Typography component="h2" className="!text-[#1C1A1A] !text-[24px] !font-[700]">Dashboard</Typography>
                <Typography className="!text-[16px] !text-[#AEAEAE]">
                    Aggregated user behavior & engagement overview
                </Typography>
            </Box>
            <TimelineFilter/>
            
        </Box>
    );
}