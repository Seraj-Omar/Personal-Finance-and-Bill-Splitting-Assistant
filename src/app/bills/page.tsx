import BillsClient from "../../components/bills/BillsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bills Management | Trackly",
  description: "Manage your individual and group bills easily with Trackly.",
};

export default function BillsPage() {
  return <BillsClient />;
}
