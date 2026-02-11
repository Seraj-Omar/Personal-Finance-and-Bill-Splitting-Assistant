import Image from "next/image"

type PageHeroProps = {
  title: string
  breadcrumb?: string[]
  bgImage?: string
}

const PageHero = ({ title, breadcrumb, bgImage = "/hero-image.jpg" }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden rounded-b-[60px] w-full py-12">

      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="hero background"
          fill
          priority
          quality={75}
          className="object-cover scale-[1.15]"
          style={{
            objectPosition: "85% 75%",
          }}
        />
      </div>



      {/*  Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 text-center">
        <h1 className="text-6xl font-bold text-white mb-2">{title}</h1>

        {breadcrumb && (
          <p className="text-base mt-5 font-semibold text-[#5792FF]">
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1
              return (
                <span
                  key={index}
                  className={isLast ? "text-white font-bold" : "text-[#5792FF]  transition"}
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
