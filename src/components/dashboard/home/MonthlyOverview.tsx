"use client";
import {Box, Typography} from "@mui/material";
import DashboardTitle from "./DashboardTitle";

const monthlyData = [
    { title:"Active Users",value:"4.500"},
    { title:"Avg. Sessions",value:"3.2"},
    { title:"Expense add",value:"43.2"},
    { title:"Group-Bills Created",value:"150"},
    { title:"AI Usage",value:"48%"},
]
export default function MonthlyOverview() {
    return (
        <Box className="flex flex-col h-full bg-[#ffffff] w-full min-h-[360px] justify-start items-center gap-3 p-6 rounded-2xl">
            <DashboardTitle title="Monthly Overview" width={20} />
			<Box className="w-full flex-1 flex flex-col justify-between mt-5">
                {monthlyData.map((item, index) => (
                    <Box key={index} className="flex justify-between w-full border-b border-[#e0e0e0] pb-2">
                        <Typography className="text-[#707070] text-sm font-semibold">{item.title}</Typography>
                        <Typography className="text-[#707070] font-semibold">{item.value}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}