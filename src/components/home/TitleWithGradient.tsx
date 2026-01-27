"use client";
import { Box, Typography } from "@mui/material";

type TitleWithGradientProps = {
    title: string;
    text_size?: string;
    id?: string;
    text_color?: string;
};

function generateRandomId(){
    return Math.random().toString(36);
}
export default function TitleWithGradient({ title, text_size,id, text_color }: TitleWithGradientProps) {
    return (
        <Box>
            <Typography
                id={id||generateRandomId()}
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