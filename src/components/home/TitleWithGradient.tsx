"use client";
import { Box, Typography } from "@mui/material";
import { useId } from "react";

type TitleWithGradientProps = {
    title: string;
    text_size?: string;
    id?: string;
    text_color?: string;
};

export default function TitleWithGradient({ title, text_size,id, text_color }: TitleWithGradientProps) {
    const autoId = useId();
    return (
        <Box>
            <Typography
                id={id || autoId}
                component="h2"
                className={`!font-[500] !text-[${text_size || 24}px] mb-2`}
                style={{ color: text_color || undefined }}
            >
                {title}
            </Typography>
            <Box className={`h-[2.5px] bg-[linear-gradient(90deg,#EFA5B6_45%,#3447AA88_65%)] rounded-md`} />
        </Box>
    );
}