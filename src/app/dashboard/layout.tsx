import DashboardsHeader from "../../shared/ui/dashboard/DashboardsHeader";
import DashboardsSidebar from "../../shared/ui/dashboard/DashboardsSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F9F9FA] overflow-x-hidden">
      <DashboardsSidebar />

      {/* main لازم ياخد padding-left قد عرض السايدبار على الديسكتوب */}
      <main className="min-w-0 overflow-x-hidden md:pl-[236px]">
        <DashboardsHeader />
        <div className="min-w-0 px-4 pb-6 lg:px-6">{children}</div>
      </main>
    </div>
  );
}