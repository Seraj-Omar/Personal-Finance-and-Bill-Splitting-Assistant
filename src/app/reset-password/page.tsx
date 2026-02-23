import ResetPassword from "@/src/modules/auth/pages/ResetPassword";
import React, { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
