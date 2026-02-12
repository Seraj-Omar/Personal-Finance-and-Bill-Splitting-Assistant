"use client";

import { Box, Typography } from "@mui/material";
export default function DashboardTitle({ title, width }: { title: string, width?: number }) {
    return (
        <Box className="flex flex-col gap-1 rounded-2xl w-full">
            <Typography component="h2" className="!text-[18px] !font-[500] px-2 pt-2  w-fit">
                {title}
                <Box sx={{ filter: "drop-shadow(0 3px 5px rgba(63,81,181,0.5))" }}>

                    <Box sx={{mt: "5px",ml: "-10px",width: "calc(100% + 20px)",}}>

                        <Box sx={{display: "flex",alignItems: "center",height: 6,}}>

                            <Box sx={{width: width ? `${width}%` : "100%",height: "100%",backgroundColor: "#3f51b5",clipPath: "polygon(5% 100%, 0 0, 100% 0, 100% 100%)",}}/>

                            <Box sx={{flex: 1,height: width ? 2 + (Math.floor(width / 10) % 2?0.5:0) : 2,backgroundColor: "#b2b2b2",position: "relative",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        left: "100%",
                                        top: 0,
                                        width: 10,
                                        height: width ? 2 + (Math.floor(width / 10) % 2?0.5:0) : 2,
                                        backgroundColor: "#b2b2b2",
                                    },  
                            }}>
                                <Box sx={{position: "absolute",right: -43,top: -9,width: 18,height: 2,backgroundColor: "#b2b2b2",transform: "translateY(-50%) rotate(147deg)",transformOrigin: "left center",}}/>
                            </Box>

                        </Box>

                    </Box>

                </Box>

            </Typography>

            <Box
                sx={{flex: 1,height: 2.5,backgroundColor: "#b2b2b2",position: "relative",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        left: "74%",
                        right: 0,
                        top: -18,
                        height: 2.5,
                        backgroundColor: "#b2b2b2",
                    },
                }}/>
        </Box>
    );
}