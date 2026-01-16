import Providers from "../../providers"
import Footer from "@/src/components/footer/Footer"
import PageHero from "@/src/shared/ui/page-hero/PageHero"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>

      <PageHero title="Add Reminder" breadcrumb={["Home", "Reminder", "Add"]} />
      {children}
      <Footer />
    </Providers>
  )
}
