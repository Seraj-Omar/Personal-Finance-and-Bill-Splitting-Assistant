"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box,Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import DashboardTitle from "./DashboardTitle";
import { useBillsVsExpenses } from "@/src/modules/dashboard/hooks/useBillsVsExpenses";

// Custom bar shape: fully rounded ends
type BottomRoundedBarProps = {
    x: number;
    xOrigin: number;
    y: number;
    yOrigin: number;
    width: number;
    height: number;
    layout: "horizontal" | "vertical";
    color: string;
    hidden?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<SVGPathElement>;
};

const BottomRoundedBar = (props: BottomRoundedBarProps) => {
    const { x, xOrigin, y, yOrigin, width, layout, color, hidden } = props;

    if (hidden) return null;

    if (layout === "vertical") {
        const top = Math.min(y, yOrigin);
        const bottom = Math.max(y, yOrigin);
        const barWidth = Math.min(12, width);
        const left = x + (width - barWidth) / 2;
        const barHeight = bottom - top;
        const radius = Math.min(barWidth / 2, 8);

        return (
            <rect
                x={left}
                y={top}
                width={barWidth}
                height={barHeight}
                rx={radius}
                ry={radius}
                fill={color}
            />
        );
    }

    // Fallback for non-vertical layouts: rounded rect
    const barWidth = Math.min(12, Math.abs(x - xOrigin));
    const left = Math.min(x, xOrigin) + (Math.abs(x - xOrigin) - barWidth) / 2;
    const top = Math.min(y, yOrigin);
    const barHeight = Math.abs(y - yOrigin);
    const radius = Math.min(Math.min(barWidth, barHeight) / 2, 8);

    return (
        <rect
            x={left}
            y={top}
            width={barWidth}
            height={barHeight}
            rx={radius}
            ry={radius}
            fill={color}
        />
    );
};

export default function ExpensesVsRevenues() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);
    const {data,isLoading,error}=useBillsVsExpenses();

    useEffect(() => {
        if (!containerRef.current) return;

        const element = containerRef.current;

        const updateWidth = () => {
            const newWidth = element.getBoundingClientRect().width;
            if (newWidth > 0) {
                setWidth(newWidth);
            }
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(() => {
            updateWidth();
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    if (isLoading || error || !data) {
        const message = isLoading? "Loading Expenses Vs Revenues...": error instanceof Error? `Error: ${error.message}`: "No stats available";

        return (
            <Typography className="w-full py-6 text-center text-sm font-medium text-[#707070] animate-pulse">
                {message}
            </Typography>
        );
    }

    const months:string[]=[];
    const revenuesData:number[]=[];
    const expensesData:number[]=[];

    data.data.forEach((item) => {
        months.push(item.month);
        revenuesData.push(item.bills);
        expensesData.push(item.expenses);
    });

    const maxDataValue:number = Math.max(...revenuesData, ...expensesData);
    const axisMax = Math.ceil(maxDataValue / 5000) * 5000;
    return (
        <Box className="bg-[#FFFFFF] rounded-xl p-6 pb-0 flex flex-col gap-3 w-full">
            <DashboardTitle title="Expenses vs Revenues" width={20} />
            <Box
                ref={containerRef}
                className="relative w-[calc(100%+3rem)] -mx-12"
            >
                {width > 0 && (
                    <>
                    <BarChart
                        width={width}
                        height={360}
                xAxis={[
                    {
                        scaleType: "band",
                        data: months,
                        barGapRatio: 0.8,
                        categoryGapRatio: 0.8,
                        tickLabelStyle: {
                            fontSize: 12,
                            fill: "#666",
                        },
                        disableTicks: true,
                    },
                ]}
                yAxis={[
                    {
                        tickLabelStyle: {
                            fontSize: 12,
                            fill: "#666",
                        },
                        disableTicks: true,
                        disableLine: true,
                        min: 0,
                        max: axisMax,
                        valueFormatter: (value: number) =>
                            `$${value.toLocaleString()}`,
                    },
                ]}
                        series={[
                            {
                                data: revenuesData,
                                label: "Revenues",
                                color: "rgba(52, 71, 170, 0.6)",
                            },
                            {
                                data: expensesData,
                                label: "Expenses",
                                color: "rgba(255, 189, 188, 0.6)",
                            },
                        ]}
                        grid={{ horizontal: true, vertical: true }}
                        sx={{
                            "& .MuiChartsGrid-line": {
                                strokeDasharray: "4 4",
                                stroke: "#E0E0E0",
                            },
                            "& .MuiChartsAxis-tickLabel": {
                                fill: "#666666",
                            },
                            "& .MuiBarElement-root": {
                                strokeWidth: 0,
                            },
                        }}
                        margin={{ top: 24, right: 16, bottom: 36, left: 72 }}
                        slotProps={{
                            legend: {
                                position: {
                                    vertical: "bottom",
                                },
                            },
                        }}
                        slots={{ bar: BottomRoundedBar }}
                    />
                    <LineChart
                        width={width}
                        height={360}
                        xAxis={[{ scaleType: "band", data: months }]}
                        yAxis={[{ min: 0, max: axisMax }]}
                        series={[{ data: revenuesData, color: "#5792ffc8", curve: "linear" }]} 
                        margin={{ top: 24, right: 16, bottom: 36, left: 72 }}
                        sx={{
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                            "& .MuiChartsAxis-root": { display: "none" },
                            "& .MuiChartsGrid-root": { display: "none" },
                            "& .MuiLineElement-root": { strokeWidth: 2 },
                            "& .MuiMarkElement-root": {
                                strokeWidth: 2,
								stroke: "#ff9ba2b2",
                                fill: "#FFFFFF",
                            },
                        }}
                    />
                    </>
                )}
            </Box>
        </Box>
    );
}