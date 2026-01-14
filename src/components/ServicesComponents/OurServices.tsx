"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
//change icnons here use luicide react,font awesome,heroicons
import { FaArrowRightLong, FaMoneyBillTrendUp, FaWallet, FaFileInvoiceDollar } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import type { IconType } from "react-icons";
import '../../app/globals.css';
type Service = {
    id: number;
    name: string;
    description: string;
    manage: string;
    icon: IconType;
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
        icon: MdOutlineAttachMoney,
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
        icon: FaMoneyBillTrendUp,
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
        icon: FaWallet,
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
        icon: FaFileInvoiceDollar,
        iconBg: "bg-[#FFE4E6]",
        iconColor: "text-[#FB7185]",
        href: "/services/bills",
    },
];

export default function OurServices() {
    const router = useRouter();
    return (
        <Box className="flex justify-center items-center">
            <Box className="flex flex-col items-start justify-between w-full">
                <Typography variant="h4" className="mb-2 font-bold text-gray-800">
                    Our Services
                    <Box className="h-[3px] rounded-full bg-[linear-gradient(90deg,#f39bab63_0%,#2c42af6e_100%)]" />
                </Typography>
                <Box className="mt-6 flex w-full flex-row flex-wrap justify-between gap-6">

                    {/* service cards */}
                    {servicesList.map((service) => (
                        <Box key={service.id} className="group flex w-80 flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-400 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#3447aaee] hover:text-white hover:shadow-lg">
                            <Typography className="!text-[18px] !mb-2 !font-semibold" variant="h6" >
                                {service.name}
                            </Typography>
                            <Box className={`mb-4 flex h-15 w-15 p-3 items-center justify-center rounded-full ${service.iconBg} group-hover:bg-white`}>
                                <service.icon className={`h-6 w-6 ${service.iconColor} group-hover:text-[#3447AA]`} />
                            </Box>
                            <Typography variant="body2" className="mb-4 text-sm leading-relaxed text-gray-600 group-hover:text-white">
                                {service.description}
                            </Typography>
                            <button
                                type="button"
                                onClick={() => router.push(service.href)}
                                className="flex pt-3 items-center text-sm font-medium text-[#3447AA] group-hover:text-white hover:cursor-pointer bg-transparent border-none outline-none"
                            >
                                <span>{`Manage ${service.manage}`}</span>
                                <FaArrowRightLong className="ml-1 h-4 w-4" />
                            </button>
                        </Box>
                    ))}

                </Box>
            </Box>
        </Box>
    );
}