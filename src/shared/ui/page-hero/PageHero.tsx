type PageHeroProps = {
  title: string
  breadcrumb?: string[]
}

const PageHero = ({ title, breadcrumb }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden rounded-2xl hero-gradient p-9">

      {/* Texture Image */}
<div
  className="absolute inset-0 opacity-20"
  style={{
    backgroundImage: "url('/noise.svg')",
    opacity: 0.04,   
    mixBlendMode: "overlay",
  }}
/>



      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 main-text-color text-6xl">
          {title}
        </h1>
     {breadcrumb && (
  <p className="text-lg mt-5 font-bold ">
    {breadcrumb.map((item, index) => {
      const isLast = index === breadcrumb.length - 1

      return (
        <span
          key={index}
          className={isLast ? "main-text-color font-medium" : "text-gray-600"}
        >
          {item}
          {!isLast && " • "}
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
