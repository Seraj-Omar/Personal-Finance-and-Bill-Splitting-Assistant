    "use client";
    import { useEffect, useRef, useState, useMemo } from "react";
    import { Box, Typography } from "@mui/material";
    import { PieChart } from "@mui/x-charts/PieChart";
    import DashboardTitle from "./DashboardTitle";
    import { useFinancialSnapshot } from "@/src/modules/dashboard/hooks/useFinancialSnapshot";

    export default function FinancialSnapshot() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState(260);
    const { data: apiData, isLoading, error } = useFinancialSnapshot();

    useEffect(() => {
        if (!containerRef.current) return;

        const element = containerRef.current;
        const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const width = entry.contentRect.width;
        if (width > 0) setSize(Math.min(width, 260));
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const innerRadius = size * 0.27;
    const outerRadius = size * 0.42;
    const labelRadius = size * 0.55;

    const { data, chartData } = useMemo(() => {
        if (!apiData?.data) {
            return { data: [], chartData: [] };
        }

        const rawData = [
            { id: 0, value: apiData.data.expenses.count, label: "Expenses added", color: "#3447aa" },
            { id: 1, value: apiData.data.revenues.count, label: "Revenues added", color: "#ffbdbc" },
            { id: 2, value: apiData.data.debts.count, label: "Debts created", color: "#686fff" },
        ];

        const sum = rawData.reduce((acc, item) => acc + item.value, 0);
        
        const chartData = sum > 0 ? rawData.map((item) => ({
            ...item,
            value: (item.value / sum) * 100,
        })) : rawData;

        return { data: rawData, chartData };
    }, [apiData]);

    if (isLoading || error || !apiData) {
        const message = isLoading
            ? "Loading financial snapshot..."
            : error instanceof Error
            ? `Error: ${error.message}`
            : "No data available";

        return (
            <Box className="flex flex-col h-full bg-[#ffffff] w-full justify-center items-center gap-3 p-6 rounded-2xl">
                <Typography className="w-full py-6 text-center text-sm font-medium text-[#707070] animate-pulse">
                    {message}
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="flex flex-col h-full bg-[#ffffff] w-full justify-between items-center gap-4 p-6 rounded-2xl">
        <Box className="flex flex-col gap-8 w-full">
            <DashboardTitle title="Financial snapshot" />

            <Box
                ref={containerRef}
                sx={{
                    position: "relative",
                    width: size + 85,
                    height: size + 30,
                    mx: "auto",
                }}
            >
            <Box
                sx={{
                    width: size-15,
                    height: size-15,
                    backgroundColor: "#ffffff",
                    borderRadius: "50%",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 0,
                }}
            />

            <PieChart
                series={[
                {
                    data: chartData,
                    innerRadius,
                    outerRadius,
                    paddingAngle: 5,
                    cornerRadius: 9,
                    startAngle: 0,
                    endAngle: 360,
                    arcLabel: (item) => `${item.value.toFixed(1)}%`,
                    arcLabelRadius: labelRadius + 5,
                    arcLabelMinAngle: 10,
                },
                ]}
                width={size + 85}
                height={size + 30}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                sx={{
                    position: "relative",
                    zIndex: 1,
                }}
                slotProps={{
                    legend: {
                        sx: { display: "none" },
                    },
                    pieArcLabel: {
                        style: {
                            fill: "#AEAEAE",
                            fontSize: 14,
                            fontWeight: 400,
                        },
                    },
                }}
            />
            </Box>
        </Box>

        <Box className="flex flex-col gap-4 w-full mt-2 max-w-[400px]">
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
                    borderRadius: "9999px",
                    backgroundColor: item.color,
                    }}
                />
                <Typography variant="body2">{item.label}</Typography>
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
