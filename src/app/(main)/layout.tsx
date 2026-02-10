import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";
import PageHeroWrapper from "../../shared/ui/page-hero/PageHeroWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <PageHeroWrapper />
      {children}
      <Footer />
    </>
  );
}