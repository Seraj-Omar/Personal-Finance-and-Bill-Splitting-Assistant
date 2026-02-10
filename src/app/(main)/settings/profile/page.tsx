
import ProfileLayout from "@/src/components/profile/ProfileLayout";
import { Suspense } from "react";
export default function ProfilePage() {
  return (
    
 <Suspense fallback={<div>Loading...</div>}>
      <ProfileLayout />
    </Suspense>
    
  );
}