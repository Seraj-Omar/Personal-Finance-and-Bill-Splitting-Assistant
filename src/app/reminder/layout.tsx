import Footer from "@/src/components/footer/Footer"
import PageHero from "@/src/shared/ui/page-hero/PageHero"
import Providers from "../providers"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    {/* <Header /> */}
    <PageHero title="Reminder" breadcrumb={["Home", "Reminder"]} />
    <Providers>
      {children}
    </Providers>
    
    </>



  )
}
