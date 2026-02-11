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
      {children}
      <Footer />
    </>
  )
}