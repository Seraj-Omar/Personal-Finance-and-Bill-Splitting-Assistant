"use client";
import React, { useEffect, useRef, useState } from "react";
import { Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import DashboardTitle from "./DashboardTitle";

const hours = [
"00:00","02:00","04:00","06:00","08:00",
"10:00","12:00","14:00","16:00","18:00","24:00",
];

const data = [9000, 8800, 2500, 14000, 2300, 7300, 22500, 3500, 23000, 11000, 19500];

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
                                data,
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
