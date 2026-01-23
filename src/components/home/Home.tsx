import HomeFinancialOverview from "@/src/components/home/homeFinincialOverview";
import OurServices from "@/src/components/ServicesComponents/OurServices";
import { Box } from "@mui/material";
import WhyChooseUs from "./WhyChooseUs";
export default function Home() {
 return (
    <main className="flex flex-col items-center justify-center w-full flex-1">
        <HomeFinancialOverview />
        <OurServices />
        <WhyChooseUs />
    </main>
  );
}
