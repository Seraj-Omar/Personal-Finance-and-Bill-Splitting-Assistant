import ReportPage from "../../../../../components/reportComponents/reportpage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports & Insights | Trackly",
  description: "Visualize your spending patterns, track trends, and gain smart financial insights with Trackly reports.",
};

export default function Report() {
  return <ReportPage />;
}
