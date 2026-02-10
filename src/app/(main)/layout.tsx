import PageHero from "../../shared/ui/page-hero/PageHero";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header";
import AuthGateWrapper from "@/src/modules/auth/components/AuthGateWrapper";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGateWrapper>
      <Header />
      <PageHero title="Services" breadcrumb={["Home", "Service"]} />
      {children}
      <Footer />
    </AuthGateWrapper>
  );
}
