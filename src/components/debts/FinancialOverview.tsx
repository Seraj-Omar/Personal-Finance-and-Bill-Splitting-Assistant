import { DollarSign, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import Card from "./Card";
import { IconClockFilled, IconCircleCheckFilled, IconAlertTriangleFilled } from "@tabler/icons-react";


export default function FinancialOverview() {
  return (
    <div className=" bg-[#F6F6F7B2] p-8 ">
      <h2 className="relative text-lg font-semibold mb-4 w-fit bg-[#F6F6F7B2]">
  Financial Overview
  <span className="mt-4 absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#EFA5B6] to-[#3447AA]"></span>
</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6  bg-[#F6F6F7B2]">
        <Card
          title="Total debt"
          amount="$12,450"
          icon={<DollarSign size={20}  className="text-[#686FFF]" />}
          iconBg="bg-[#686FFF1A]"
        />
        <Card
          title="Unpaid debts"
          amount="$12,45"
          icon={<IconClockFilled size={20} fill="#3447AA"   className="text-blue-600" />}
          iconBg="bg-blue-100"
        />
        <Card
          title="Paid debts"
          amount="$12,45"
          icon={<IconCircleCheckFilled size={20} fill="#16C087" className="text-green-600" />}
          iconBg="bg-[#DCFCE7]"
        />
        <Card
          title="Overdue debts"
          amount="$12,45"
          icon={<IconAlertTriangleFilled size={20} fill="#FF5050" className="text-red-500" />}
          iconBg="bg-red-100"
          amountColor="text-[#FF5050]"
          
          
        />
      </div>
    </div>
  );
}
