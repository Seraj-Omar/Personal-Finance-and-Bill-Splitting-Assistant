import {Box, Typography} from "@mui/material";
import { useRouter } from "next/navigation";

const AiFeatures=[
    "AI powered budget recommendations",
    "Smart expense analysis",
    "Personalized saving tips",
    "Simple and easy to understand insights"
];

const checkIcon=<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="17" height="17" rx="8.5" fill="#3447AA"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.1949 5.20519C13.3261 5.33646 13.3998 5.51448 13.3998 5.70009C13.3998 5.88571 13.3261 6.06372 13.1949 6.19499L7.59488 11.795C7.46361 11.9262 7.28559 11.9999 7.09998 11.9999C6.91436 11.9999 6.73635 11.9262 6.60508 11.795L3.80508 8.99499C3.67757 8.86297 3.60701 8.68615 3.60861 8.50261C3.6102 8.31908 3.68382 8.14351 3.81361 8.01372C3.94339 7.88394 4.11896 7.81032 4.3025 7.80872C4.48604 7.80713 4.66286 7.87768 4.79488 8.00519L7.09998 10.3103L12.2051 5.20519C12.3363 5.07397 12.5144 5.00024 12.7 5.00024C12.8856 5.00024 13.0636 5.07397 13.1949 5.20519Z" fill="white"/>
                </svg>

export default function AskAi() {
    const router = useRouter();
    return (
            <Box
                    component="section"
                    aria-labelledby="ask-ai-heading"
                    className="flex w-full justify-start px-4 py-8 sm:px-6 md:px-10 lg:px-24 lg:py-12 "
            >
                <Box
                        className="flex justify-end w-full rounded-xl px-9 py-11"
                        sx={{
                            backgroundImage: {
                                xs: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("./AskAiBackground.png")',
                                md: 'linear-gradient(rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.20)), url("./AskAiBackground.png")'
                            },
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backdropFilter: {
                                xs: 'blur(16px)',
                                md: 'blur(10px)'
                            },
                            WebkitBackdropFilter: {
                                xs: 'blur(16px)',
                                md: 'blur(10px)'
                            }
                        }}
                >
                    <Box className="flex flex-col gap-3">
                        <Typography
                                id="ask-ai-heading"
                                component="h2"
                                fontWeight="500"
                                fontSize="24px"
                                color="#FFFFFF"
                                className="max-w-sm"
                        >
                            We help you build a smarter budget with AI.
                        </Typography>
                        <Typography component="p" fontWeight="400" fontSize="16px" color="#F9F9FA" className="max-w-md"> 
                            We help you create personalized budget suggestions using AI by analyzing your income, expenses, and spending habits  all in one clear and intelligent view.
                        </Typography>
                        <Box component="ul" className="flex flex-col gap-4 mt-4">
                            {AiFeatures.map((feature, index)=>(
                                <Box component="li" key={index} className="flex items-center gap-2">
                                    {checkIcon}
                                    <Typography component="p" fontWeight="400" fontSize="16px" color="#FFFFFF"> 
                                        {feature}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <button 
                        onClick={() => {router.push("/chat")}}
                        type="button" className="mt-6 px-6 py-3 rounded-xl w-full text-white text-sm bg-[#3447AA] hover:bg-[#2a3a8c] hover:cursor-pointer transition-colors duration-300 ease-in-out">
                            Ask AI
                        </button>
                    </Box>
                </Box>
            </Box>
    );
}
