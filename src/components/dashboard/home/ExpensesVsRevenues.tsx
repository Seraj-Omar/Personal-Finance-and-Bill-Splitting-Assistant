"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import DashboardTitle from "./DashboardTitle";

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

const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const revenuesData = [17000, 4000, 8000, 5000, 10000, 3000, 14000, 4000, 14000, 12000, 23000, 10000];
const expensesData = [10000, 12000, 8500, 20500, 3500, 3500, 13500, 9000, 23500, 23500, 13500, 3500];
const maxDataValue = Math.max(...revenuesData, ...expensesData);
const axisMax = Math.ceil(maxDataValue / 5000) * 5000;

export default function ExpensesVsRevenues() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);

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

    return (
        <Box className="bg-[#FFFFFF] rounded-xl p-6 pb-0 flex flex-col gap-3 w-full">
            <DashboardTitle title="Expenses vs Revenues" width={30} />
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
                        data: categories,
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
                        xAxis={[{ scaleType: "band", data: categories }]}
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