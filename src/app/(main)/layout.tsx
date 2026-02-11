import PageHeroWrapper from "../../shared/ui/page-hero/PageHeroWrapper";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header";
import AuthGateWrapper from "@/src/modules/auth/components/AuthGateWrapper";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGateWrapper>
      <Header />
      <PageHeroWrapper />
      {children}
      <Footer />
    </AuthGateWrapper>
  );
}
