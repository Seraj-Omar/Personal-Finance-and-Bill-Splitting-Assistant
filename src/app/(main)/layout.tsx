"use client";

import React from "react";
import { usePathname } from "next/navigation";

import PageHeroWrapper from "../../shared/ui/page-hero/PageHeroWrapper";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header";
import AuthGateWrapper from "@/src/modules/auth/components/AuthGateWrapper";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // صفحات بدنا فيها الشريط الأبيض فقط (بدون الهيرو الأزرق)
  const hideHeroOnRoutes = ["/services/incomes", "/services/income"];
  const shouldShowHero = !hideHeroOnRoutes.includes(pathname);

  return (
    <>
      
      <AuthGateWrapper>
        <Header />
        {shouldShowHero && <PageHeroWrapper />}
        {children}
        <Footer />
      </AuthGateWrapper>
      

      {/* <Header />
      {shouldShowHero && <PageHeroWrapper />}
      {children}
      <Footer /> */}
    </>
  );
}