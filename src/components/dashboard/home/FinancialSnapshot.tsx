"use client";
import { Box, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import DashboardTitle from "./DashboardTitle";
const data = [
    { id: 0, value: 12847, label: "Expenses added", color: "#3447aa" },
    { id: 1, value: 8432, label: "Revenues added", color: "#ffbdbc" },
    { id: 2, value: 3219, label: "Debts created", color: "#686fff" },
];

let sum: number = 0;
data.forEach((item) => {
    sum += item.value;
});

const chartData = data.map((item) => ({
    ...item,
    value: (item.value / sum) * 100,
}));
export default function FinancialSnapshot() {
        return (
        <Box className="flex flex-col h-full bg-[#ffffff] w-full justify-between items-start gap-4 p-6 rounded-2xl">
            <Box className="flex flex-col gap-8 w-full">
                <DashboardTitle title="Financial snapshot" width={100} />
                <Box 
                    sx={{
                        width: 260,
                        height: 260,
                        borderRadius: "50%",
                        backgroundColor: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.12)",
                        mx: "auto",
                    }}
                >
                    <PieChart
                        series={[
                            {
                                data: chartData,
                                innerRadius: 70,
                                outerRadius: 110,
                                paddingAngle: 5,
                                cornerRadius: 9,
                                startAngle: 0,
                                endAngle: 360,
                                cx: 130,
                                cy: 130,
                            }
                        ]}
                        width={260}
                        height={260}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        slotProps={{
                            legend: { hidden: true },
                        }}
                    />
                </Box>
            </Box>

            <Box className="flex  flex-col gap-4 w-full mt-2">
                    {data.map((item) => (
                    <Box
                        key={item.id}
                        className="flex items-center gap-2 w-full justify-between"
                    >
                        <Box className="flex items-center gap-2">
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '9999px',
                                    backgroundColor: item.color,
                                }}
                            />
                            <Typography variant="body2">
                                {item.label}
                            </Typography>
                        </Box>

                        <Typography variant="body2">
                            {item.value.toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}