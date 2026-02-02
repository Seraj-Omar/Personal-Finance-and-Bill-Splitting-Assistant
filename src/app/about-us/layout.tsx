

import PageHero from "../../shared/ui/page-hero/PageHero";
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PageHero
        title="About Us"
        breadcrumb={["Home","About Us"]}
      />
      {children}
    </>
  )
}
