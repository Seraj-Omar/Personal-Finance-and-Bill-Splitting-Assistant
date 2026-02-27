import DashboardsHeader from "../../shared/ui/dashboard/DashboardsHeader";
import DashboardsSidebar from "../../shared/ui/dashboard/DashboardsSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F9F9FA] overflow-x-hidden">
      <div className="flex w-full min-w-0">
        <DashboardsSidebar />
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <DashboardsHeader />
          <div className="min-w-0 px-4 pb-6 lg:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
