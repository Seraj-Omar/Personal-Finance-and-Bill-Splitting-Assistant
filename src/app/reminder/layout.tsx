import Footer from "@/src/components/footer/Footer"
import PageHero from "@/src/shared/ui/page-hero/PageHero"
import Providers from "../providers"
import Header from "@/src/components/Header"
import AuthGateWrapper from "@/src/modules/auth/components/AuthGateWrapper"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
         <AuthGateWrapper>

    <Header />
    <PageHero title="Reminder" breadcrumb={["Home", "Reminder"]} />
    <Providers>
      {children}
    </Providers>
    <Footer />
         </AuthGateWrapper>
    </>



  )
}
