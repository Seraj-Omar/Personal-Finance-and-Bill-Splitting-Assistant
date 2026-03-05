import AdminProfileLayout from "@/src/components/admin-profile/AdminProfileLayout";
import { Suspense } from "react";
export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminProfileLayout />
    </Suspense>
  );
}
