import ReportPage from "../../../../../components/reportComponents/reportpage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Management | Trackly",
  description: "Manage your individual and group bills easily with Trackly.",
};

export default function Report() {
  return <ReportPage />;
}
