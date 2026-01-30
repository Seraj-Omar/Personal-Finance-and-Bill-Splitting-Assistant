import PageHero from "../../shared/ui/page-hero/PageHero"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PageHero title="Services" breadcrumb={["Home", "Service"]} />
      {children}
    </>
  )
}