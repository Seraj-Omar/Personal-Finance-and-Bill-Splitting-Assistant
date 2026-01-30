import HomeHero from "@/src/components/home/HomeHero"
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <HomeHero />
      {children}
      <Footer />
    </>
  )
}