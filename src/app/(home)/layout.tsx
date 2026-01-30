import HomeHero from "@/src/components/home/HomeHero"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HomeHero />
      {children}
    </>
  )
}