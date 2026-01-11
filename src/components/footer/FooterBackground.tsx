const FooterBackground = () => {
  return (
    <>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/footer-bg.jpg')",
        }}
      />

      {/* Strong Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-blue-900/95" />
    </>
  )
}

export default FooterBackground
