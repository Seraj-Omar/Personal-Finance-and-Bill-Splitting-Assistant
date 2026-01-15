"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleDollarSign, TrendingUp, Wallet, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import '../../app/globals.css';

type Service = {
    id: number;
    name: string;
    description: string;
    manage: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    href: string;
};

//service list data
const servicesList: Service[] = [
    {
        id: 1,
        name: "Debts",
        description:
            "Track and manage all your debts in one place, including the money you owe and the amounts owed to you, so you can stay in control.",
        manage: "Debts",
        icon: CircleDollarSign,
        iconBg: "bg-[#E0E7FF]",
        iconColor: "text-[#27369B]",
        href: "/services/debts",
    },
    {
        id: 2,
        name: "Incomes",
        description:
            "Track and manage all your incomes in one place, including your salary, bonuses, and other sources of income.",
        manage: "Revenue",
        icon: TrendingUp,
        iconBg: "bg-[#FEE2F2]",
        iconColor: "text-[#DB2777]",
        href: "/services/incomes",
    },
    {
        id: 3,
        name: "Expenses",
        description:
            "Track and manage all your expenses in one place, including your bills, groceries, and other spending.",
        manage: "Expenses",
        icon: Wallet,
        iconBg: "bg-[#E0F2FE]",
        iconColor: "text-[#0284C7]",
        href: "/services/expenses",
    },
    {
        id: 4,
        name: "Bills",
        description:
            "Track of all your bills, due dates, and payment statuses to ensure you never miss a payment.",
        manage: "Invoices",
        icon: FileText,
        iconBg: "bg-[#FFE4E6]",
        iconColor: "text-[#FB7185]",
        href: "/services/bills",
    },
];

export default function OurServices() {
    const router = useRouter();
    return (
        <Box className="flex w-full justify-start">
            <Box className="flex w-full flex-col items-start justify-between">
                <Typography variant="h4" className="mb-3 !text-[24px] !font-[500] text-gray-900">
                    Our Service
                    <Box className="mt-2 h-[3px] w-full rounded-full bg-[linear-gradient(90deg,#f39bab63_0%,#2c42af6e_100%)]" />
                </Typography>
                <Box className="mt-7 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* service cards */}
                    {servicesList.map((service) => (
                        <Box
                            key={service.id}
                            className="group flex w-[302px] h-[238px] flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:bg-[#3447AA]"
                        >
                            <Typography className="mb-3 text-[18px] font-semibold text-gray-900 group-hover:text-white" variant="h6">
                                {service.name}
                            </Typography>

                            <Box className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${service.iconBg} group-hover:bg-white`}>
                                <service.icon className={`h-6 w-6 ${service.iconColor} group-hover:text-[#3447AA]`}/>
                            </Box>

                            <Typography variant="body2"className="mb-4 flex-1 !text-[14px] leading-relaxed text-gray-600 group-hover:text-white">
                                {service.description}
                            </Typography>

                            <button type="button" onClick={() => router.push(service.href)}className="mt-auto flex items-center text-[13px] font-medium text-[#3447AA] group-hover:text-white hover:underline hover:cursor-pointer bg-transparent border-none outline-none">
                                <span>{`Manage ${service.manage}`}</span>
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}