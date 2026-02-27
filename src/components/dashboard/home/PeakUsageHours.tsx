"use client";
import React, { useEffect, useRef, useState } from "react";
import { Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import DashboardTitle from "./DashboardTitle";
import { useDashboardPeakHours } from "@/src/modules/dashboard/hooks/useDashboardPeakHours";

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

    let message;
    if (isLoading || error || !data) {
        message = isLoading
            ? "Loading Peak Hours..."
            : error instanceof Error
            ? `Error: ${error.message}`
            : "No stats available";
    }

    const values: number[] = [];
    const hours: string[] = [];
    let mostActiveHours = "";

    if (data?.data) {
        const groupedData: { label: string; count: number; startHour: string; endHour: string }[] = [];
        
        for (let i = 0; i < data.data.length; i += 2) {
            const first = data.data[i];
            const second = data.data[i + 1];
            
            const startHour = first.hour;
            const endHour = second ? second.hour : first.hour;
            const totalCount = first.count + (second ? second.count : 0);
            
            const hourNumber = parseInt(startHour.split(':')[0], 10).toString();
            const label = `${hourNumber}:00`;
            
            groupedData.push({
                label: label,
                count: totalCount,
                startHour: startHour,
                endHour: endHour
            });
        }

        let maxCount = 0;
        let maxStartHour = "";
        let maxEndHour = "";

        groupedData.forEach((item, index) => {
            hours.push(item.label);
            values.push(item.count);
            
            if (item.count > maxCount) {
                maxCount = item.count;
                maxStartHour = item.startHour;
                if (index < groupedData.length - 1) {
                    maxEndHour = groupedData[index + 1].startHour;
                } else {
                    maxEndHour = item.endHour;
                }
            }
        });

        if (maxStartHour && maxEndHour) {
            mostActiveHours = `${maxStartHour} - ${maxEndHour}`;
        }
    }

    return (
        <Box className="flex flex-col h-full bg-[#ffffff] w-full justify-start items-center gap-3 p-6 rounded-2xl">
            <DashboardTitle title="Peak Usage Hours" />
            {message&&(
                <Box className="flex flex-1 w-full items-center justify-center">
                    <Typography className="w-full py-6 text-center text-sm font-medium text-[#707070] animate-pulse">
                        {message}
                    </Typography>
                </Box>
            )}
			<Box
				ref={containerRef}
				className="w-[calc(100%+3rem)] -mx-6 flex items-center justify-center"
			>
                {width > 0 && !message && (
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

            {!message && (
                <Typography
                    align="center"
                    sx={{ width: "100%", color: "text.secondary", fontSize: 14 }}
                >
                    Highest activity between {mostActiveHours}
                </Typography>
            )}
        </Box>
    );
}
