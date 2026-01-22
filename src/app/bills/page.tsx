import BillsClient from "./BillsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bills Management | My App",
  description: "Manage your individual and group bills easily.",
};

export default function BillsPage() {
  return <BillsClient />;
}
