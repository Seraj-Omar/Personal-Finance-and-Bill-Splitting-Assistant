"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { MoveRight, CircleDollarSign, TrendingUp, Wallet, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import TitleWithGradient from "../home/TitleWithGradient";

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
        <Box className="flex w-full justify-center px-4 py-8 s  m:px-6 md:px-10 lg:px-24 lg:py-12">
            <Box className="flex w-full flex-col items-start justify-between">
                <Box className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <TitleWithGradient
                        title="Our Service"
                    />
                </Box>
                <Box className="mt-7 grid w-full gap-5 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* service cards */}
                    {servicesList.map((service) => (
                        <Box
                            key={service.id}
                            className="group flex h-full min-h-[220px] w-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:bg-[#3447AA]"
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

                            <button type="button" onClick={() => router.push(service.href)} className="mt-auto flex items-center text-[13px] font-medium group-hover:text-white hover:text-white hover:underline hover:cursor-pointer bg-transparent border-none outline-none main-text-color">
                                <span>{`Manage ${service.manage}`}</span>
                                <MoveRight className="ml-1 h-4 w-4" />
                            </button>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}