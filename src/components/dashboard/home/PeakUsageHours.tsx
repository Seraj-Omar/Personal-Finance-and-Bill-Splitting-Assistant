"use client";
import React, { useEffect, useRef, useState } from "react";
import { Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import DashboardTitle from "./DashboardTitle";
import { useDashboardPeakHours } from "@/src/modules/dashboard/hooks/useDashboardPeakHours";

const mostActiveHours = "9 AM - 5 PM";

// Custom bar shape: rounded both ends
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
        const left = x;
        const barHeight = bottom - top;
        const radius = Math.min(width / 2, 8);

        return (
            <rect
                x={left}
                y={top}
                width={width}
                height={barHeight}
                rx={radius}
                ry={radius}
                fill={color}
            />
        );
    }

    // Fallback for non-vertical layouts: rounded rect
    const left = Math.min(x, xOrigin);
    const top = Math.min(y, yOrigin);
    const barWidth = Math.abs(x - xOrigin);
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

export default function PeakUsageHours() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);
    const {data,isLoading,error}=useDashboardPeakHours();

    
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
        const message = isLoading? "Loading Peak Hours...": error instanceof Error? `Error: ${error.message}`: "No stats available";

        return (
            <Typography className="w-full py-6 text-center text-sm font-medium text-[#707070] animate-pulse">
                {message}
            </Typography>
        );
    }
    const values: number[] = [];
    const hours: string[] = [];

    data.data.forEach((item: { hour: string; count: number }) => {
        hours.push(item.hour);
        values.push(item.count);
    });
    return (
        <Box className="flex flex-col h-full bg-[#ffffff] w-full justify-start items-center gap-3 p-6 rounded-2xl">
            <DashboardTitle title="Peak Usage Hours" />

			<Box
				ref={containerRef}
				className="w-[calc(100%+3rem)] -mx-6 flex items-center justify-center"
			>
                {width > 0 && (
                    <BarChart
                        width={width}
                        height={400}
                    xAxis={[
                        {
                            scaleType: "band",
                            data: hours,
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
                            valueFormatter: (value: number) =>
                                value >= 1000 ? `${value / 1000}k` : `${value}`,
                        },
                    ]}
                        series={[
                            {
                                data: values,
                                color: "#3448aacf",
                            },
                        ]}
                        grid={{ horizontal: true, vertical: true }}
                        sx={{
                            "& .MuiChartsGrid-line": {
                                strokeDasharray: "4 4",
                            },
                        }}
                        slots={{ bar: BottomRoundedBar }}
                    />
                )}
            </Box>

            <Typography
                align="center"
                sx={{ width: "100%", color: "text.secondary", fontSize: 14 }}
            >
                Highest activity between {mostActiveHours}
            </Typography>
        </Box>
    );
}
