"use client";
import {Rating,Box,Typography} from "@mui/material";
import TitleWithGradient from "./TitleWithGradient";
import { useRouter } from "next/navigation";
const notifaction={
    icon:<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="white"/>
            <rect x="1.5" y="1.5" width="37" height="37" rx="18.5" stroke="#5792FF" strokeOpacity="0.1" strokeWidth="3"/>
            <path d="M17.0932 14.8672H22.9066L24.7477 11.4681C24.807 11.3588 24.8299 11.2334 24.8131 11.1102C24.7964 10.9869 24.7409 10.8722 24.6546 10.7827C24.5683 10.6931 24.4558 10.6333 24.3333 10.6119C24.2108 10.5905 24.0846 10.6086 23.9731 10.6637C22.6555 11.3142 21.5034 11.0366 20.1693 10.7153C18.85 10.3975 17.3548 10.0374 15.5798 10.6336C15.4988 10.6608 15.4247 10.7054 15.3628 10.7643C15.3008 10.8232 15.2525 10.8949 15.2212 10.9744C15.1899 11.0539 15.1764 11.1393 15.1815 11.2246C15.1867 11.3099 15.2105 11.3931 15.2512 11.4682L17.0932 14.8672ZM23.5195 16.277C23.4433 16.1982 23.3666 16.1187 23.2895 16.0388H16.7103C16.6333 16.1186 16.5566 16.1981 16.4803 16.277C15.2924 17.5061 14.1703 18.6671 13.335 19.9666C12.3746 21.4609 11.9273 22.9258 11.9273 24.5768C11.9273 26.4924 12.9601 27.9549 14.9141 28.8062C16.5853 29.5342 18.6019 29.687 19.9994 29.687C21.4071 29.687 23.435 29.5341 25.1014 28.8059C27.0452 27.9563 28.0727 26.4939 28.0727 24.5768C28.0727 22.9258 27.6254 21.4609 26.665 19.9666C25.8297 18.6671 24.7076 17.5061 23.5195 16.277ZM20.1199 21.7042C20.5396 21.7925 20.9735 21.8839 21.3457 22.1291C21.8293 22.4479 22.0745 22.9406 22.0745 23.5936C22.0745 24.4555 21.445 25.1849 20.5852 25.4172V25.7195C20.5852 25.8749 20.5235 26.0239 20.4136 26.1338C20.3037 26.2437 20.1547 26.3054 19.9993 26.3054C19.8439 26.3054 19.6949 26.2437 19.585 26.1338C19.4751 26.0239 19.4134 25.8749 19.4134 25.7195V25.4172C18.5536 25.1849 17.9241 24.4555 17.9241 23.5936C17.9241 23.4382 17.9858 23.2891 18.0957 23.1792C18.2056 23.0694 18.3546 23.0076 18.51 23.0076C18.6654 23.0076 18.8145 23.0694 18.9244 23.1792C19.0342 23.2891 19.096 23.4382 19.096 23.5936C19.096 23.9959 19.5012 24.3231 19.9993 24.3231C20.4974 24.3231 20.9026 23.9958 20.9026 23.5936C20.9026 23.1404 20.7591 23.0362 19.8786 22.8509C19.459 22.7627 19.0251 22.6713 18.6529 22.426C18.1693 22.1072 17.9241 21.6145 17.9241 20.9616C17.9241 20.0991 18.5536 19.3693 19.4134 19.1368V18.8356C19.4134 18.6802 19.4751 18.5312 19.585 18.4213C19.6949 18.3114 19.8439 18.2497 19.9993 18.2497C20.1547 18.2497 20.3037 18.3114 20.4136 18.4213C20.5235 18.5312 20.5852 18.6802 20.5852 18.8356V19.1367C21.445 19.3691 22.0745 20.099 22.0745 20.9615C22.0745 21.1169 22.0128 21.2659 21.9029 21.3758C21.793 21.4857 21.644 21.5474 21.4886 21.5474C21.3331 21.5474 21.1841 21.4857 21.0742 21.3758C20.9643 21.2659 20.9026 21.1169 20.9026 20.9615C20.9026 20.5586 20.4974 20.231 19.9993 20.231C19.5012 20.231 19.096 20.5587 19.096 20.9615C19.0961 21.4148 19.2397 21.5189 20.1201 21.7042H20.1199Z" fill="#3447AA"/>
        </svg>,
    title:"Upcoming Bill",
    due:"Due in 2 days"
}

const reviewAndRating={
    Rate:"4.9",
    totalReviews:"3.996"
}
export default function HomeHero() {
    const router = useRouter();
    return (
        <Box
            component="section"
            aria-labelledby="home-hero-heading"
            className="flex flex-col gap-1 relative overflow-hidden rounded-b-2xl py-40 w-full pl-4 sm:pl-6 md:pl-10 lg:pl-24"
            sx={{backgroundColor:'#F6F6F7B2', backgroundImage: 'radial-gradient(50% 74.69% at 50% 50%, rgba(91, 152, 255, 0.02) 0%, rgba(87, 146, 255, 0.04) 100%), linear-gradient(106.93deg, rgba(52, 71, 170, 0.91) 3.13%, rgba(239, 165, 182, 0.69) 96.31%), url(/GlassPattern.jpg)'}}
        >
            <Box component="aside" aria-label="Upcoming bill" className="flex justify-end mr-1 mb-2">
                <Box className="flex bg-[#3447AA] px-4 py-3 rounded-xl gap-2">
                    {notifaction.icon}
                    <Box className="flex flex-col justify-center">
                        <Typography component="h2" fontWeight="500" fontSize="16px" color="#FFFFFF">
                            {notifaction.title}
                        </Typography>
                        <Typography component="p" fontWeight="400" fontSize="14px" color="#FFFFFF">
                            {notifaction.due}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box className="w-full flex flex-col-reverse lg:flex-row justify-between items-center gap-8 lg:gap-0">


                <Box component="header" className="flex flex-col gap-5 my-4 w-full lg:w-auto">
                    <Box className="w-fit">
	                        <TitleWithGradient title="Financial Service" text_size="sm" text_color="#FFFFFF"/>
	                    </Box>
                    <Typography id="home-hero-heading" component="h1" fontWeight="700" fontSize="48px" color="#FFFFFF" className="max-w-lg">
                        How to Manage Your Finances
                    </Typography>
                    <Typography component="p" fontWeight="400" fontSize="16px" color="#FFFFFF" className="max-w-2xl">
                        Track your expenses, manage budgets, and stay in control of your money with a simple and smart financial platform.
                    </Typography>

                    <Box className="flex gap-2 items-center my-6" aria-label="Customer rating" role="group">
                        <Box className="bg-[#FDF6E7] w-fit px-2 py-1 flex items-center rounded-full  gap-2">
                            <Rating
                                value={parseFloat(reviewAndRating.Rate)}
                                precision={0.5}
                                max={5}
                                readOnly
                                sx={{
                                "& .MuiRating-iconFilled": {
                                    color: "#F3B137",
                                },
                                "& .MuiRating-iconEmpty": {
                                    color: "#E5E7EB", 
                                },
                                }}
                            />
                            <Typography component="p" fontWeight="400" fontSize="14px" color="#ffffff" className="bg-[#3447AA] rounded-full px-2">
                                {reviewAndRating.Rate}
                            </Typography>
                        </Box>
                        <Typography component="p" fontWeight="400" fontSize="14px" color="#F4E1E1F7" className="flex items-center w-fit">
                            From {reviewAndRating.totalReviews}+ Reviews
                        </Typography>
                    </Box>
                    <button
                    onClick={() => {router.push("/expenses")}}
                    type="button"
                    className="text-[#3447AA] bg-[#FFFFFF] w-fit px-3 py-4 rounded-2xl text-[18px] font-[500] hover:bg-[#f0f0f0] hover:cursor-pointer transition-colors duration-300 ease-in-out"
                    >
                        Track Expenses Now
                    </button>
                </Box>


                <Box className="bg-[#FFFFFF] rounded-l-xl relative w-full lg:w-auto mt-4 lg:mt-0 flex justify-center">
                    <Box
                        component="img"
                        src="/HandHoldingPhone.png"
                        alt="Home Hero Image"
                        className="w-full max-w-[650px]"
                    />
                    <Box
                        component="img"
                        src="/Dots.png"
                        alt="Decorative Dots"
                        className="absolute bottom-0 left-0 rounded-xl"
                    />
                </Box>
            </Box>

        </Box>
    );
}