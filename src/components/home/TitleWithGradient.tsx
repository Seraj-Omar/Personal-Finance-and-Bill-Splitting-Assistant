"use client";
import { Box, Typography } from "@mui/material";
import { useId } from "react";

type TitleSize = "sm" | "md" | "lg" | "xl" | "2xl";

type TitleWithGradientProps = {
    title: string;
    /* Named size: "sm" | "md" | "lg" | "xl" | "2xl" (default: "md") */
    text_size?: TitleSize;
    id?: string;
    text_color?: string;
};

const sizeClassMap: Record<TitleSize, string> = {
            sm: "!text-base",
            md: "!text-2xl",
            lg: "!text-3xl",
            xl: "!text-4xl",
            "2xl": "!text-5xl",
        };

export default function TitleWithGradient({ title, text_size = "md", id, text_color }: TitleWithGradientProps) {
    const autoId = useId();
    const sizeClass = sizeClassMap[text_size];

    return (
        <Box>
            <Typography
                id={id || autoId}
                component="h2"
                className={`!font-[500] ${sizeClass} mb-2`}
                style={{ color: text_color || undefined }}
            >
                {title}
            </Typography>
            <Box className="h-[2.5px] bg-[linear-gradient(90deg,#EFA5B6_45%,#3447AA88_65%)] rounded-md" />
        </Box>
    );
}