import PageHero from "../../shared/ui/page-hero/PageHero"
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    
      <Header />
      <PageHero title="Services" breadcrumb={["Home", "Service"]} />
      {children}
      <Footer />
    </>
  )
}