type PageHeroProps = {
  title: string
  breadcrumb?: string[]
  bgImage?: string
}

const PageHero = ({ title, breadcrumb, bgImage = "/hero-image.jpg" }: PageHeroProps) => {
  return (
    <section
      className="relative overflow-hidden rounded-b-[60px] w-full py-12
"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom right", //
      }}
    >
      <div className="absolute inset-0 bg-[#0B1D5B]/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 text-center">
        <h1 className="text-6xl font-bold text-white mb-2">{title}</h1>

        {breadcrumb && (
          <p className="text-base mt-5 font-semibold text-[#5792FF]">
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1
              return (
                <span
                  key={index}
                  className={
                    isLast
                      ? "text-white font-bold"
                      : "text-[#5792FF] hover:text-white transition"
                  }
                >
                  {item}
                  {!isLast && " . "}
                </span>
              )
            })}
          </p>
        )}
      </div>
    </section>
  )
}

export default PageHero
