import { Box, Typography } from "@mui/material";
import { User, Phone, CalendarDays } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
    name: string;
    phone: string;
    preferredTime: string;
}

export default function ContactUsForm() {
    const [formData, setFormData] = useState<FormData>({ name: "", phone: "", preferredTime: "" });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        //API Call
        setFormData({ name: "", phone: "", preferredTime: "" });
    };
    return (
        <Box className="flex flex-col gap-[16px]">
            <Typography className="w-fit text-[#FFFFFF] !text-[18px] !font-[500]">
                We’re Here to Help
            </Typography>
            <Typography className="text-[14px] text-[#FFFFFFCC] max-w-[330px] !leading-[20px]">
                Get in touch with us for support, questions, or feedback about managing your finances.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full">

                <Box className="flex flex-col gap-[6px]">
                    <Typography className="text-[13px] text-[#FFFFFF]">
                        Your Name
                    </Typography>
                    <Box className="relative">
                        <User
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="w-full rounded-xl border border-gray-300 bg-white py-[12px] pl-10 pr-3 text-[14px] text-gray-900 placeholder:text-gray-400 transition-all duration-200 ease-out focus:placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] focus:shadow-md"
                        />
                    </Box>
                </Box>

                <Box className="flex flex-col gap-[6px]">
                    <Typography className="text-[13px] text-[#FFFFFF]">
                        Mobile Phone
                    </Typography>
                    <Box className="relative">
                        <Phone
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Mobile phone"
                            required
                            className="w-full rounded-xl border border-gray-300 bg-white py-[12px] pl-10 pr-3 text-[14px] text-gray-900 placeholder:text-gray-400 transition-all duration-200 ease-out focus:placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] focus:shadow-md"
                        />
                    </Box>
                </Box>

                <Box className="flex flex-col gap-[6px]">
                    <Typography className="text-[13px] text-[#FFFFFF]">
                        Preffered contact time
                    </Typography>
                    <Box className="relative">
                        <CalendarDays
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            placeholder="Select time"
                            className="w-full rounded-xl border border-gray-300 bg-white py-[12px] pl-10 pr-3 text-[14px] text-gray-900 placeholder:text-gray-400 transition-all duration-200 ease-out focus:placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] focus:shadow-md"
                        />
                    </Box>
                </Box>

                <button
                    className="bg-[#FFFFFF] py-[14px] px-[28px] rounded-xl font-medium transition-all duration-200 ease-out hover:bg-[#E0E0E0] hover:shadow-md hover:-translate-y-[1px] main-text-color"
                    type="submit"
                >
                    Contact Us
                </button>
            </Box>
        </Box>
    );
}