import AdminHeader from "../../shared/ui/admin/AdminHeader";
import AdminSidebar from "../../shared/ui/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9F9FA] overflow-x-hidden">
      <div className="flex w-full min-w-0">
        <AdminSidebar />
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <AdminHeader />
          <div className="min-w-0 px-4 pb-6 lg:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}